import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { PAYMENT_METHOD } from "@/constants/general";
import { PATHS } from "@/constants/paths";
import { MESSAGE, REGEX } from "@/constants/validate";
import useAddress from "@/hooks/useAddress";
import cn from "@/utils/cn";
import { formatCurrency, removeAccents } from "@/utils/format";
import { regrexRule } from "@/utils/validate";
import { Select, message } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.form`
  .form-group {
    margin: 0;
  }
`;

const CheckoutForm = ({ handleCheckout }) => {
  const { profile } = useSelector((state) => state.auth);
  const { cartInfo } = useSelector((state) => state.cart);

  const { firstName, phone, email, province, district, ward, street } =
    profile || {};

  const {
    product,
    subTotal,
    shipping,
    total,
    quantity,
    variant,
    totalProduct,
    discount,
    discountCode,
  } = cartInfo || {};
  const renderProductInfo =
    product?.map((item, index) => ({
      ...item,
      quantity: quantity?.[index],
      variant: variant?.[index],
      totalProduct: totalProduct?.[index],
    })) || [];

  const [currenPaymentMethod, setCurrentPaymentMethod] = useState();
  const isCash = currenPaymentMethod === PAYMENT_METHOD.cash;
  const isCard = currenPaymentMethod === PAYMENT_METHOD.card;

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
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName,
      phone,
      email,
      province,
      district,
      ward,
      street,
    },
  });

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
    });
    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);

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

  const _onSubmit = (data) => {
    if (!shipping?.typeShip) {
      message.error("Please select shipping method");
      return;
    }
    if (!currenPaymentMethod) {
      message.error("Please select payment method");
      return;
    }

    handleCheckout?.({
      formInfo: {
        ...data,
        province: provinces?.find((item) => item.value === provinceId),
        district: districts?.find((item) => item.value === districtId),
        ward: wards?.find((item) => item.value === wardId),
        paymentMethod: currenPaymentMethod,
      },
      cartInfo,
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit(_onSubmit)} className="checkout-form">
      <div className="row">
        <div className="col-lg-9">
          <h2 className="checkout-title">Billing Details</h2>
          <div className="row">
            <div className="col-sm-4">
              <Input
                type="text"
                required
                label="Full Name"
                {...register("firstName", {
                  required: MESSAGE.required,
                })}
                error={errors?.firstName?.message || ""}
              />
            </div>
            <div className="col-sm-4">
              <Input
                type="text"
                required
                label="Phone number"
                {...register("phone", {
                  required: MESSAGE.required,
                  pattern: regrexRule(REGEX.phone),
                })}
                error={errors?.phone?.message || ""}
              />
            </div>
            <div className="col-sm-4">
              <Input
                label="Email address"
                required
                disabled
                {...register("email", {
                  required: MESSAGE.required,
                  pattern: regrexRule(REGEX.email),
                })}
                error={errors?.email?.message || ""}
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
                        className="customSelect"
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
                        className="customSelect"
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
                        className="customSelect"
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
            label="Street address"
            {...register("street", {
              required: MESSAGE.required,
            })}
            error={errors?.street?.message || ""}
          />
          <Input
            type="text"
            label="Notes"
            renderInput={(inputProps) => {
              return (
                <textarea
                  {...inputProps}
                  {...register("note")}
                  className="form-control"
                  cols={30}
                  rows={4}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                />
              );
            }}
            error={errors?.note?.message || ""}
          />
        </div>
        <aside className="col-lg-3">
          <div className="summary">
            <h3 className="summary-title">Your Order</h3>
            <table className="table table-summary">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {renderProductInfo?.map((product) => {
                  const { name, quantity, price, totalProduct } = product || {};
                  return (
                    <tr>
                      <td>
                        <a href="#">{name}</a>

                        <p>
                          {quantity} x ${price}
                        </p>
                      </td>
                      <td>${formatCurrency(totalProduct)}</td>
                    </tr>
                  );
                })}
                <tr className="summary-subtotal">
                  <td>Subtotal:</td>
                  <td>${formatCurrency(subTotal)}</td>
                </tr>
                {shipping ? (
                  <tr>
                    <td>Shipping:</td>
                    <td>
                      {shipping?.typeShip} - ${shipping?.price} -
                      <Link to={PATHS.CART}>Edit</Link>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>Shipping: </td>
                    <td>
                      <Link to={PATHS.CART}>Select Shipping</Link>
                    </td>
                  </tr>
                )}
                {discountCode && (
                  <tr>
                    <td>Discount:</td>
                    <td>
                      {discountCode} - ${discount}
                    </td>
                  </tr>
                )}
                <tr className="summary-total">
                  <td>Total:</td>
                  <td>${formatCurrency(total)}</td>
                </tr>
              </tbody>
            </table>
            <div className="accordion-summary" id="accordion-payment">
              <div className="card">
                <div
                  className="card-header"
                  id="heading-1"
                  onClick={() => setCurrentPaymentMethod(PAYMENT_METHOD.card)}
                  style={{ cursor: "pointer" }}
                >
                  <h2 className="card-title">
                    <a
                      className={cn({
                        collapsed: !isCard,
                      })}
                      role="button"
                    >
                      {" "}
                      Direct bank transfer{" "}
                    </a>
                  </h2>
                </div>
                <div
                  id="collapse-1"
                  className={cn("collapse", { show: isCard })}
                >
                  <div className="card-body">
                    {" "}
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.{" "}
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  className="card-header"
                  id="heading-3"
                  onClick={() => setCurrentPaymentMethod(PAYMENT_METHOD.cash)}
                  style={{ cursor: "pointer" }}
                >
                  <h2 className="card-title">
                    <a
                      className={cn({
                        collapsed: !isCash,
                      })}
                      role="button"
                    >
                      {" "}
                      Cash on delivery{" "}
                    </a>
                  </h2>
                </div>
                <div
                  id="collapse-3"
                  className={cn("collapse", { show: isCash })}
                >
                  <div className="card-body">
                    Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit. Donec odio. Quisque volutpat
                    mattis eros.{" "}
                  </div>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant="outline"
              className="btn-order btn-block"
            >
              <span className="btn-text">Place Order</span>
              <span className="btn-hover-text">Proceed to Checkout</span>
            </Button>
          </div>
        </aside>
      </div>
    </FormContainer>
  );
};

export default CheckoutForm;
