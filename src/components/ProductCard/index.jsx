import { PATHS } from "@/constants/paths";
import { handleAddCart } from "@/store/reducer/cartReducer";
import { handleAddProductWishlist } from "@/store/reducer/wishlistReducer";
import { formatCurrency } from "@/utils/format";
import { Empty } from "antd";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  const { id, slug, name, price, rating, images, discount, color } =
    product || {};
  const productPath = PATHS.PRODUCTS + `/${slug}`;

  // ---- CHECK ADDED WISHLIST ---- //
  const isAddedWishlist = useMemo(() => {
    return wishlist?.some((product) => product.id === id);
  }, [wishlist, id]);

  const _onAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    // ADD CART
    const addPayload = {
      addedId: id,
      addedColor: color?.[0] || "",
      addedQuantity: 1,
      addedPrice: price - discount,
    };

    dispatch(handleAddCart(addPayload));
  };

  const _onAddToWishlist = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    // ---- PAYLOAD ---- //
    const payload = {
      product: id,
    };
    dispatch(handleAddProductWishlist(payload));
  };

  const wishlistStyles = {
    backgroundColor: isAddedWishlist ? "#ef837b" : "#fcb941",
  };

  return (
    <div className="product product-2">
      <figure className="product-media">
        {discount > 0 && (
          <span className="product-label label-circle label-sale">Sale</span>
        )}
        <Link to={productPath} style={{ height: 275 }}>
          {images?.length > 0 ? (
            <img
              src={images[0]}
              alt="Product image"
              className="product-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <ImageWrapper>
              <Empty description="" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </ImageWrapper>
          )}
        </Link>
        <div className="product-action-vertical">
          <Link
            to="#"
            className="btn-product-icon btn-wishlist btn-expandable"
            onClick={_onAddToWishlist}
            style={wishlistStyles}
          >
            <span style={wishlistStyles}>
              {isAddedWishlist ? "Added" : "Add"} to wishlist
            </span>
          </Link>
        </div>
        <div className="product-action product-action-dark">
          <Link
            role="button"
            className="btn-product btn-cart"
            title="Add to cart"
            onClick={_onAddToCart}
            style={{ cursor: "pointer" }}
            to={"#"}
          >
            <span>add to cart</span>
          </Link>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={productPath}>{name || ""}</Link>
        </h3>
        <div className="product-price">
          {discount ? (
            <>
              <span className="new-price">
                ${formatCurrency(price - discount)}
              </span>
              <span className="old-price">Was ${formatCurrency(price)}</span>{" "}
            </>
          ) : (
            <>${formatCurrency(price || 0)}</>
          )}
        </div>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{
                width: `${(rating || 0) * 20}%`,
              }}
            />
          </div>
          <span className="ratings-text">( {rating} Reviews )</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
