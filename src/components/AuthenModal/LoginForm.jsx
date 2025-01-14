import { MESSAGE, REGEX } from "@/constants/validate";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import ComponentLoading from "../ComponentLoading";
import { Input } from "../Input";
import { handleLogin } from "@/store/reducer/authReducer";
import { message } from "antd";
import useDebounce from "@/hooks/useDebounce";

const LoginForm = () => {
  const dispatch = useDispatch();
  // const { handleLogin, handleCloseModal } = useAuthContext();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    if (data && !loading.login) {
      // setLoading(true);
      // handleLogin?.(data, () => {
      // 	setTimeout(() => {
      // 		setLoading(false);
      // 	}, 300);
      // });
      try {
        const res = await dispatch(handleLogin(data)).unwrap();
        console.log("res", res);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const renderLoading = useDebounce(loading.login, 300);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
      {renderLoading && <ComponentLoading />}
      <Input
        label="Username or email address"
        required
        {...register("email", {
          required: MESSAGE.required,
          pattern: {
            value: REGEX.email,
            message: MESSAGE.email,
          },
        })}
        error={errors?.email?.message || ""}
      />
      <Input
        label="Password"
        required
        type="password"
        {...register("password", {
          required: MESSAGE.required,
        })}
        error={errors?.password?.message || ""}
      />
      <div className="form-footer">
        <Button type="submit" variant="outline">
          <span>LOG IN</span>
          <i className="icon-long-arrow-right" />
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
