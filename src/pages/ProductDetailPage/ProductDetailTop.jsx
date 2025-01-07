import ProductColor from "@/components/ProductColor";
import ProductImageZoom from "@/components/ProductImageZoom";
import QuantityInput from "@/components/QuantityInput";
import ShareLink from "@/components/ShareLink/ShareLink";
import { PATHS } from "@/constants/paths";
import { formatCurrency, transformNumberToPercent } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";

const ProductDetailTop = ({
  images,
  name,
  rating,
  reviews,
  price,
  description,
  color,
  category,
  stock,
  colorRef,
  quantityRef,
  handleAddToCart,
  handleAddToWishlist,
  isAddedWishlist,
}) => {
  const pathUrl = window.location.href;
  const categoryPath =
    category?.id && PATHS.PRODUCTS + `?category=${category?.id}`;

  const _onAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddToCart?.();
  };

  const _onAddToWishlist = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddToWishlist?.();
  };

  const wishlistStyles = {
    color: isAddedWishlist ? "#ef837b" : "#fcb941",
  };

  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <ProductImageZoom images={images} />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{name}</h1>
            <div className="ratings-container">
              <div className="ratings">
                <div
                  className="ratings-val"
                  style={{
                    width: `${transformNumberToPercent(rating)}%`,
                  }}
                />
              </div>
              <Link
                className="ratings-text"
                to={"#product-review-link"}
                id="review-link"
              >
                ( {reviews?.length} Reviews )
              </Link>
            </div>
            <div className="product-price"> ${formatCurrency(price)}</div>
            <div
              className="product-content"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />

            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <ProductColor ref={colorRef} colors={color} />
            </div>
            <div className="details-filter-row details-row-size">
              <label htmlFor="qty">Qty:</label>
              <div className="product-details-quantity">
                <QuantityInput max={stock} ref={quantityRef} />
              </div>
            </div>
            <div className="product-details-action">
              <Link
                to={"#"}
                className="btn-product btn-cart"
                onClick={_onAddToCart}
              >
                <span>add to cart</span>
              </Link>
              <div className="details-action-wrapper">
                <Link
                  to={"#"}
                  className="btn-product btn-wishlist"
                  title="Wishlist"
                  style={wishlistStyles}
                  onClick={_onAddToWishlist}
                >
                  <span
                    style={{
                      ...wishlistStyles,
                      boxShadow: isAddedWishlist
                        ? "0 1px 0 0 #ef837b"
                        : "0 1px 0 0 #fcb941",
                    }}
                  >
                    {isAddedWishlist ? "Added" : "Add"} to Wishlist
                  </span>
                </Link>
              </div>
            </div>
            <div className="product-details-footer">
              <div className="product-cat">
                <span>Category:</span>
                <Link to={categoryPath}>{category?.name}</Link>
              </div>
              <div
                style={{ gap: "0 5px" }}
                className="social-icons social-icons-sm"
              >
                <span className="social-label">Share:</span>
                <ShareLink title={"Facebook"} path={pathUrl}>
                  <i className="icon-facebook-f" />
                </ShareLink>
                <ShareLink type="twitter" title={"Twitter"} path={pathUrl}>
                  <i className="icon-twitter" />
                </ShareLink>
                <ShareLink type="instagram" title={"Instagram"} path={pathUrl}>
                  <i className="icon-instagram" />
                </ShareLink>
                <ShareLink type="pinterest" title={"Pinterest"} path={pathUrl}>
                  <i className="icon-pinterest" />
                </ShareLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTop;
