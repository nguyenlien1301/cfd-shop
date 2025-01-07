import Button from "@/components/Button";
import ComponentLoading from "@/components/ComponentLoading";
import { Input } from "@/components/Input";
import Textarea from "@/components/Textarea";
import { SEND_CONTACT } from "@/constants/message";
import { PATHS } from "@/constants/paths";
import { MESSAGE, REGEX } from "@/constants/validate";
import useDebounce from "@/hooks/useDebounce";
import useMutation from "@/hooks/useMutation";
import { subscribeService } from "@/services/subscribeService";
import { message } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data) {
      const { name, email, title, phone, content } = data || {};
      const payload = {
        name: name || "",
        title: title || "",
        email: email || "",
        description: content || "",
        phone: phone || "",
      };

      try {
        const res = await subscribeService.subscribe(payload);
        if (res?.data?.data) {
          message.success(SEND_CONTACT.success);
          navigate(PATHS.HOME);
        }
      } catch (error) {
        console.log("error", error);
        message.error(SEND_CONTACT.Fail);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form mb-3">
      <div className="row">
        <div className="col-sm-6">
          <Input
            label="Name"
            name="cname"
            placeholder="Name *"
            required
            {...register("name", {
              required: MESSAGE.required,
            })}
            error={errors?.name?.message || ""}
          />
        </div>
        <div className="col-sm-6">
          <Input
            label="Email"
            name="cemail"
            placeholder="Email *"
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
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <Input
            label="Phone"
            name="cphone"
            placeholder="Phone *"
            required
            {...register("phone", {
              required: MESSAGE.required,
              pattern: {
                value: REGEX.phone,
                message: MESSAGE.phone,
              },
            })}
            error={errors?.phone?.message || ""}
          />
        </div>
        <div className="col-sm-6">
          <Input
            label="Subject"
            name="csubject"
            placeholder="Subject"
            required
            {...register("title")}
          />
        </div>
      </div>
      <Input
        label="Nội dung"
        name="cmessage"
        placeholder="Message"
        {...register("content")}
        renderInput={(inputProps) => {
          return <Textarea {...inputProps} />;
        }}
      />
      <Button type="submit" variant="outline" className="btn-minwidth-sm">
        <span>SUBMIT</span>
        <i className="icon-long-arrow-right" />
      </Button>
    </form>
  );
};

export default ContactForm;
