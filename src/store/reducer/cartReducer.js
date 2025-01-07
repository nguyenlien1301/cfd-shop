import { cartServices } from "@/services/cartServices";
import tokenMethod from "@/utils/token";
import { sumArrayNumber } from "@/utils/calculate";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { handleShowModal } from "./authReducer";
import { MODAL_TYPES } from "@/constants/general";

const initialState = {
  cartInfo: {},
  cartLoading: false,
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    updateCacheCart: (state, action) => {
      state.cartInfo = action.payload || state.cartInfo;
    },
    clearCart: (state) => {
      state.cartInfo = {};
    },
  },
  extraReducers: (builder) => {
    // GET CART
    builder.addCase(handleGetCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleGetCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartInfo = action.payload;
    });
    builder.addCase(handleGetCart.rejected, (state) => {
      state.cartLoading = false;
      state.cartInfo = {};
    });

    // ADD CART
    builder.addCase(handleAddCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleAddCart.fulfilled, (state) => {
      state.cartLoading = false;
    });
    builder.addCase(handleAddCart.rejected, (state) => {
      state.cartLoading = false;
    });

    // REMOVE CART
    builder.addCase(handleRemoveFromCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleRemoveFromCart.fulfilled, (state) => {
      state.cartLoading = false;
    });
    builder.addCase(handleRemoveFromCart.rejected, (state) => {
      state.cartLoading = false;
    });

    // UPDATE CART
    builder.addCase(handleUpdateCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleUpdateCart.fulfilled, (state) => {
      state.cartLoading = false;
    });
    builder.addCase(handleUpdateCart.rejected, (state) => {
      state.cartLoading = false;
    });
  },
});

// Extract the action creators object and the reducer
const { actions, reducer: cartReducer } = cartSlice;
// Extract and export each action creator by name
export const { updateCacheCart, clearCart } = actions;
// Export the reducer, either as a default or named export
export default cartReducer;

export const handleGetCart = createAsyncThunk(
  "cart/get",
  async (_, thunkApi) => {
    try {
      const cartRes = await cartServices.getCart();

      return cartRes.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const handleAddCart = createAsyncThunk(
  "cart/add",
  async (actionPayload, thunkApi) => {
    if (!tokenMethod.get())
      return thunkApi.dispatch(handleShowModal(MODAL_TYPES.login));
    try {
      const { addedId, addedColor, addedQuantity, addedPrice } = actionPayload;
      const { cartInfo } = thunkApi.getState()?.cart || {};

      let addPayload = {};
      if (cartInfo.id) {
        const matchIndex = cartInfo.product?.findIndex(
          (product, index) =>
            product.id === addedId && cartInfo.variant?.[index] === addedColor
        );
        const newProduct = cartInfo.product?.map((product) => {
          return product.id;
        });
        const newQuantity = [...(cartInfo.quantity ?? [])];
        const newVariant = [...(cartInfo.variant ?? [])];
        const newTotalProduct = [...(cartInfo.totalProduct ?? [])];

        if (matchIndex > -1) {
          newQuantity[matchIndex] =
            Number(newQuantity[matchIndex]) + Number(addedQuantity);
          newTotalProduct[matchIndex] =
            Number(newTotalProduct[matchIndex]) + addedPrice * addedQuantity;
        } else {
          newProduct.push(addedId);
          newQuantity.push(addedQuantity);
          newVariant.push(addedColor);
          newTotalProduct.push(addedPrice * addedQuantity);
        }

        const newSubtotal =
          newTotalProduct.reduce(
            (curr, next) => Number(curr) + Number(next),
            0
          ) || 0;

        const newTotal = newSubtotal - cartInfo.discount;
        addPayload = {
          ...cartInfo,
          product: newProduct,
          quantity: newQuantity,
          variant: newVariant,
          subTotal: newSubtotal,
          total: newTotal,
          totalProduct: newTotalProduct,
        };
      } else {
        addPayload = {
          product: [addedId],
          quantity: [addedQuantity],
          variant: [addedColor],
          totalProduct: [addedPrice * addedQuantity],
          subTotal: addedPrice * addedQuantity,
          total: addedPrice * addedQuantity,
          discount: 0,
          paymentMethod: "",
        };
      }

      const cartRes = await cartServices.updateCart(addPayload);
      thunkApi.dispatch(handleGetCart());
      message.success("Add to cart successfully");
      return cartRes?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      message.error("Add to cart failed");
    }
  }
);

export const handleRemoveFromCart = createAsyncThunk(
  "cart/removeProduct",
  async (actionPayload, thunkApi) => {
    const { removedIndex } = actionPayload || {};
    const { getState, dispatch, rejectWithValue } = thunkApi;
    const { cartInfo } = getState()?.cart || {};

    if (removedIndex < 0) return false;

    try {
      const newProduct = cartInfo.product
        ?.filter((_, index) => index !== removedIndex)
        .map((item) => item.id);
      const newQuantity = cartInfo.quantity?.filter(
        (_, index) => index !== removedIndex
      );
      const newVariant = cartInfo.variant?.filter(
        (_, index) => index !== removedIndex
      );
      const newTotalProduct = cartInfo.totalProduct?.filter(
        (_, index) => index !== removedIndex
      );
      const newSubtotal = sumArrayNumber(newTotalProduct);
      const newTotal =
        newSubtotal -
        (cartInfo.discount ?? 0) +
        (cartInfo.shipping?.price ?? 0);

      const updatePayload = {
        ...cartInfo,
        product: newProduct,
        quantity: newQuantity,
        variant: newVariant,
        totalProduct: newTotalProduct,
        subTotal: newSubtotal,
        total: newTotal,
        shipping: newProduct?.length > 0 ? cartInfo.shipping : {},
        discount: newProduct?.length > 0 ? cartInfo.discount : 0,
      };
      const cartRes = await cartServices.updateCart(updatePayload);
      dispatch(handleGetCart());
      message.success("Remove from cart successfully");
      return cartRes?.data?.data;
    } catch (error) {
      rejectWithValue(error);
      message.error("Remove from cart failed");
    }
  }
);

export const handleUpdateCart = createAsyncThunk(
  "cart/update",
  async (actionPayload, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    try {
      const cartRes = await cartServices.updateCart(actionPayload);
      dispatch(handleGetCart());
      message.success("Update cart successfully");
      return cartRes?.data?.data;
    } catch (error) {
      rejectWithValue(error);
      message.error("Update cart failed");
      throw error;
    }
  }
);
