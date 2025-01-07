import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { authService } from "@/services/authServices";
import { message } from "antd";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const ChangePass = () => {
  const { profile } = useSelector((store) => store.auth);
  const newPassword = useRef({});
  const password = useRef({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  newPassword.current = watch("newPassword", "");
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const res = await authService.updateProfile({ ...profile, ...data });
      if (res.status == 200) {
        message.success("Update success");
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="tab-pane fade active show">
      <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="password"
          label="Current password (leave blank to leave unchanged)"
          defaultValue={null}
          {...register("password", { required: "Vui lòng nhập mật khẩu cũ" })}
          error={errors?.password?.message || ""}
        />

        <Input
          type="password"
          label="New password (leave blank to leave unchanged)"
          error={errors?.newPassword?.message || ""}
          {...register("newPassword", {
            validate: (value) =>
              value !== password.current || "Không được trùng với mật khẩu cũ",
          })}
        />

        <Input
          type="password"
          label="Confirm new password"
          error={errors?.cpassword?.message || ""}
          {...register("cpassword", {
            validate: (value) =>
              value === newPassword.current || "Xác nhận mật khẩu không khớp",
          })}
        />

        <Button variant="outline">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </Button>
      </form>
    </div>
  );
};

export default ChangePass;
