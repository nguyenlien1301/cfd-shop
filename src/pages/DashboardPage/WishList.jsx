import { PATHS } from "@/constants/paths";
import { handleDeleteProductWishlist } from "@/store/reducer/wishlistReducer";
import { Modal } from "antd";
import { formatCurrency, getImageURL } from "@/utils/format";
import { Empty } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@/components/Button";

const EmptyWrapper = styled.td`
  border-bottom: none !important;
`;

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state.wishlist);

  const _onAddToCart = (product) => {
    // ---- Redirect to product detail to add to cart  ---- //
    navigate(PATHS.PRODUCTS + "/" + product.slug);

    // ----  Add to cart ---- //
    // const { id, color, price } = product;
    // const addPayload = {
    // 	addedId: id,
    // 	addedColor: color[0], // Get first item color,
    // 	addedQuantity: 1,
    // 	addedPrice: price,
    // };
    // dispatch(handleAddCart(addPayload));
  };

  const _onConfirmRemoveFromWishlist = async (productId) => {
    const payload = {
      product: productId,
    };
    dispatch(handleDeleteProductWishlist(payload));
  };

  // ---- Remove product from wishlist ---- //
  const _onRemoveFromWishlist = (product) => {
    const { confirm } = Modal;
    const { name, id } = product;
    confirm({
      title: "Do you want remove this item from wishlist?",
      content: <p>{name}</p>,
      onOk() {
        _onConfirmRemoveFromWishlist(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className="tab-pane fade show active">
      <table table className="table table-wishlist table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Stock Status</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {!!!wishlist?.length && (
            <tr>
              <EmptyWrapper colSpan={3}>
                <Empty
                  description="There are no products in your wishlist!"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </EmptyWrapper>
            </tr>
          )}
          {!!wishlist?.length &&
            wishlist.map((item, index) => {
              const { id, name, images, price, stock } = item || {};
              return (
                <tr key={id || index}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <Link to={"#"}>
                          <img
                            src={getImageURL(images[0])}
                            alt="Product image"
                          />
                        </Link>
                      </figure>
                      <h3 className="product-title">
                        <a href="#">{name}</a>
                      </h3>
                    </div>
                  </td>
                  <td className="price-col text-center">
                    ${formatCurrency(price)}
                  </td>
                  <td className="stock-col text-center">
                    {stock > 0 ? (
                      <span className="in-stock">In stock</span>
                    ) : (
                      <span className="out-of-stock">Out stock</span>
                    )}
                  </td>
                  <td className="action-col">
                    {stock > 0 ? (
                      <Button
                        onClick={() => _onAddToCart(item)}
                        className="btn btn-block"
                        variant="outline"
                      >
                        Add to cart
                      </Button>
                    ) : (
                      <button
                        className={
                          "btn btn-block btn-outline-primary-2 disabled"
                        }
                      >
                        Out of stock
                      </button>
                    )}
                  </td>
                  <td className="remove-col">
                    <button
                      onClick={() => _onRemoveFromWishlist(item)}
                      className="btn-remove"
                    >
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default WishList;
