import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { MESSAGE, REGEX } from "@/constants/validate";
import useAddress from "@/hooks/useAddress";
import { authService } from "@/services/authServices";
import { handleGetProfile } from "@/store/reducer/authReducer";
import { removeAccents } from "@/utils/format";
import { Select, message } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const FormAccount = () => {
  const { profile } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const {
    provinces,
    districts,
    wards,
    provinceId,
    districtId,
    wardId,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  } = useAddress();

  const {
    firstName,
    phone,
    email,
    province,
    district,
    ward,
    street,
    birthday,
  } = profile || {};

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const _onProvinceChange = (changedId) => {
    handleProvinceChange?.(changedId);
    reset({
      ...getValues(),
      province: changedId,
      district: undefined,
      ward: undefined,
    });
  };

  const _onDistrictChange = (changedId) => {
    handleDistrictChange?.(changedId);
    reset({
      ...getValues(),
      district: changedId,
      ward: undefined,
    });
  };

  const _onWardChange = (changedId) => {
    handleWardChange?.(changedId);
    reset({
      ...getValues(),
      ward: changedId,
    });
  };

  const onSubmit = async (data) => {
    const _payload = {
      ...data,
      lastName: profile?.lastName,
    };
    try {
      const res = await authService.updateProfile(_payload);
      if (res.status == 200) {
        message.success("Update success");
        dispatch(handleGetProfile());
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  /* <-------  Get data address default  -------> */
  useEffect(() => {
    if (!profile) return;
    reset?.({
      firstName,
      phone,
      email,
      province,
      district,
      ward,
      street,
      birthday: birthday
        ? dayjs(birthday).format("YYYY/MM/DD").replaceAll("/", "-")
        : "",
    });
    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);

  return (
    <div className="tab-pane fade active show">
      <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-sm-6">
            <Input
              type="text"
              required
              label="Name"
              {...register("firstName", {
                required: "Please enter your name",
              })}
              error={errors?.firstName?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              disabled
              required
              label="Email address"
              {...register("email", {
                required: "Please enter your email",
              })}
              error={errors?.email?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Input
              type="text"
              required
              label="Phone number"
              {...register("phone", {
                required: "Please enter your Phone",
                pattern: {
                  value: REGEX.phone,
                  message: "Please enter email with format phone",
                },
              })}
              error={errors?.phone?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              type="date"
              className="form-control"
              required
              label="Ngày sinh"
              {...register("birthday", {
                required: "Please enter your birthday",
              })}
              error={errors?.birthday?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <label>Province/City *</label>
            <Controller
              name="province"
              control={control}
              rules={{
                required: MESSAGE.required,
              }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="customSelect select-custom"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Please select Province/City"
                      options={provinces}
                      value={provinceId}
                      optionFilterProp="children"
                      onChange={_onProvinceChange}
                      filterOption={(input, option) =>
                        removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()))
                      }
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.province?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
          <div className="col-sm-4">
            <label>District/Town *</label>
            <Controller
              name="district"
              control={control}
              rules={{
                required: MESSAGE.required,
              }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="customSelect select-custom"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Please select District/Town"
                      options={districts}
                      value={districtId}
                      optionFilterProp="children"
                      onChange={_onDistrictChange}
                      filterOption={(input, option) =>
                        removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()))
                      }
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.district?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
          <div className="col-sm-4">
            <label>Ward *</label>
            <Controller
              name="ward"
              control={control}
              rules={{
                required: MESSAGE.required,
              }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="customSelect select-custom"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Please select Ward"
                      options={wards}
                      value={wardId}
                      optionFilterProp="children"
                      onChange={_onWardChange}
                      filterOption={(input, option) =>
                        removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()))
                      }
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.ward?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
        </div>
        <Input
          type="text"
          required
          {...register("street", {
            required: "Please enter your address",
          })}
          label="Street address"
          error={errors?.street?.message || ""}
        />
        <Button variant="outline">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </Button>
      </form>
    </div>
  );
};

export default FormAccount;
