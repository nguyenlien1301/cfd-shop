import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/productServices";
import { handleAddCart } from "@/store/reducer/cartReducer";
import { handleAddProductWishlist } from "@/store/reducer/wishlistReducer";
import { message } from "antd";
import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const useProductDetailPage = () => {
  // Initial Hooks
  const dispatch = useDispatch();
  const { slug } = useParams();
  const colorRef = useRef();
  const quantityRef = useRef();
  const { wishlist } = useSelector((state) => state.wishlist);

  // Fetching API
  const { data: productDetailData } = useQuery(
    () => productService.getProductDetail(slug),
    [slug]
  );
  const { id, name, description, shippingReturn, price, discount } =
    productDetailData || {};

  const { data: productDetailReviews } = useQuery(
    () => id && productService.getProductReview(id),
    [id]
  );

  // ---- CHECK ADDED WISHLIST ---- //
  const isAddedWishlist = useMemo(() => {
    return wishlist?.some((product) => product.id === id);
  }, [wishlist, id]);

  const handleAddToCart = async () => {
    const { value: color, reset: colorReset } = colorRef.current || {};
    const { value: quantity, reset: quantityReset } = quantityRef.current || {};

    // VALIDATE
    if (!color) {
      message.error("Please select color");
      return;
    } else if (isNaN(quantity) && quantity < 1) {
      message.error("Quantity must be greater than 1");
      return;
    }

    // ADD CART
    const addPayload = {
      addedId: id,
      addedColor: color,
      addedQuantity: quantity,
      addedPrice: price - discount,
    };

    try {
      const res = dispatch(handleAddCart(addPayload)).unwrap();
      if (res) {
        colorReset?.();
        quantityReset?.();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddToWishlist = async () => {
    const payload = {
      product: id,
    };
    dispatch(handleAddProductWishlist(payload));
  };

  const productDetailTopProps = {
    ...productDetailData,
    colorRef,
    quantityRef,
    handleAddToCart,
    handleAddToWishlist,
    isAddedWishlist,
  };

  const productDetailTabProps = {
    description,
    shippingReturn,
    reviews: productDetailReviews,
  };

  return {
    productName: name,
    productDetailTopProps,
    productDetailTabProps,
  };
};

export default useProductDetailPage;
