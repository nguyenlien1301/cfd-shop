import ProductColor from "@/components/ProductColor";
import { PATHS } from "@/constants/paths";
import { formatCurrency } from "@/utils/format";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductTitle = styled.h3`
  display: flex !important;
  flex-direction: column;
  gap: 10px;

  .product-variant {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
  }
  .product-nav-dots {
    margin: 0;
  }
`;
const ListOrder = () => {
  const { cartInfo } = useSelector((state) => state.cart);
  const { product, quantity, totalProduct, variant } = cartInfo || {};
  const products =
    product?.map((item, index) => {
      return {
        ...item,
        quantity: quantity?.[index],
        totalProduct: totalProduct?.[index],
        variant: variant?.[index],
      };
    }) || [];
  return (
    <div className="tab-pane fade show active">
      <p>No order has been made yet.</p>
      <Link to={PATHS.PRODUCTS} className="btn btn-outline-primary-2">
        <span>GO SHOP</span>
        <i className="icon-long-arrow-right" />
      </Link>
      <br />
      <br />
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products.map((product, index) => {
              const {
                id,
                slug,
                images,
                name,
                price,
                quantity,
                totalProduct,
                variant,
              } = product || {};
              const detailPath = PATHS.PRODUCTS + `/${slug}`;
              let imagePath = images?.[0];
              if (imagePath?.split("https")?.length > 2) {
                imagePath = imagePath?.split("https");
                imagePath = "https" + imagePath[2];
              }
              return (
                <tr key={id + index}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <Link to={detailPath}>
                          <img src={imagePath} alt={name} />
                        </Link>
                      </figure>
                      <ProductTitle className="product-title">
                        <Link to={detailPath}>{name}</Link>
                        <div className="product-variant">
                          Color: <ProductColor colors={[variant]} />
                        </div>
                      </ProductTitle>
                    </div>
                  </td>
                  <td className="price-col text-center">
                    ${formatCurrency(price)}
                  </td>
                  <td className="quantity-col text-center">{quantity}</td>
                  <td className="total-col text-center">
                    {" "}
                    ${formatCurrency(totalProduct)}
                  </td>
                </tr>
              );
            })
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              There is no any product in cart
            </p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListOrder;
