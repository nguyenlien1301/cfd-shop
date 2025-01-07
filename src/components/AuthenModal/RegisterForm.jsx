import { PATHS } from "@/constants/paths";
import { MESSAGE, REGEX } from "@/constants/validate";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../Button";
import ComponentLoading from "../ComponentLoading";
import { Input } from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "@/store/reducer/authReducer";
import useDebounce from "@/hooks/useDebounce";

const RegisterForm = () => {
	// const { handleRegister } = useAuthContext();
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.auth);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	// const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		if (data && !loading.register) {
			// setLoading(true);
			// handleRegister?.(data, () => {
			// 	setTimeout(() => {
			// 		setLoading(false);
			// 	}, 300);
			// });
			try {
				const { name, email, password } = data;
				const payload = {
					firstName: name || "",
					lastName: "",
					email,
					password,
				};
				console.log("payload", payload);
				dispatch(handleRegister(payload));
			} catch (error) {
				console.log("error", error);
			}
		}
	};

	const renderLoading = useDebounce(loading.register, 300);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{ position: "relative" }}
		>
			{renderLoading && <ComponentLoading />}
			<Input
				label="Your email address"
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
					<span>SIGN UP</span>
					<i className="icon-long-arrow-right" />
				</Button>
				<div>
					<div className="custom-control custom-checkbox">
						<input
							type="checkbox"
							className="custom-control-input"
							id="register-policy"
							{...register("isAgree", {
								required: "Please agree with our policy",
							})}
						/>
						<label
							className="custom-control-label"
							htmlFor="register-policy"
						>
							I agree to the{" "}
							<Link to={PATHS.PRIVATE_POLICY}>
								privacy policy
							</Link>{" "}
							*
						</label>
					</div>
					{errors?.isAgree?.message && (
						<p className="form-error">{errors.isAgree.message}</p>
					)}
				</div>
			</div>
		</form>
	);
};

export default RegisterForm;
