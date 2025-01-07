import { PATHS } from "@/constants/paths";
import { authService } from "@/services/authServices";
import tokenMethod from "@/utils/token";
import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showedModal, setShowedModal] = useState("");
  const [profile, setProfile] = useState()

  useEffect(() => {
    if (tokenMethod.get()) {
      // call api get profile
      handleGetProfile();
    }
  }, []);

  const handleShowModal = (modalType) => {
    if (!!!tokenMethod.get()) {
      setShowedModal(modalType || "");
    }
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowedModal("");
  };

  const handleLogin = async (loginData, callback) => {
    // call API
    try {
      const res = await authService.login(loginData);
      const { token: accessToken, refreshToken } = res?.data?.data || {};

      // Lưu vào local storage
      tokenMethod.set({
        accessToken,
        refreshToken,
      });

      if (!!tokenMethod) {
        // Lấy thông tin profile
        handleGetProfile();
        // Thông báo
        message.success("Đăng nhập thành công");

        // Đóng modal
        handleCloseModal();
      }
    } catch (error) {
      console.log("error", error);
      message.error("Đăng nhập thất bại");
    } finally {
      callback?.();
    }
  };

  const handleRegister = async (registerData, callback) => {
    // call API
    try {
      const { name, email, password } = registerData;
      const payload = {
        firstName: name || "",
        lastName: "",
        email,
        password,
      };
      const res = await authService.register(payload);
      if (res?.data?.data?.id) {
        message.success("Đăng ký thành công");
        handleLogin({
          email,
          password,
        });
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 403) {
        message.error("Email đăng ký đã tồn tại");
      } else {
        message.error("Đăng ký thất bại");
      }
    } finally {
      callback?.();
    }
  };

  const handleLogout = () => {
    tokenMethod.remove();
    setProfile(undefined);
    navigate(PATHS.HOME);
  };

  const handleGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      if (profileRes?.data?.data) {
        setProfile(profileRes.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        showedModal,
        profile,
        handleShowModal,
        handleCloseModal,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
