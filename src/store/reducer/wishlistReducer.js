import { productService } from "@/services/productServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { handleGetProfile, handleShowModal } from "./authReducer";
import tokenMethod from "@/utils/token";
import { MODAL_TYPES } from "@/constants/general";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  initialState,
  name: "wishlist",
  reducers: {
    updateWishlist: (state, action) => {
      state.wishlist = action.payload || state.wishlist;
    },
  },
  extraReducers: (builder) => {},
});

// Extract the action creators object and the reducer
const { actions, reducer: wishlistReducer } = wishlistSlice;
// Extract and export each action creator by name
export const { updateWishlist } = actions;
// Export the reducer, either as a default or named export
export default wishlistReducer;

export const handleDeleteProductWishlist = createAsyncThunk(
  "cart/delete",
  async (actionPayload, thunkApi) => {
    try {
      await productService.removeProductInWishlist(actionPayload);
      thunkApi.dispatch(handleGetProfile());
      message.success("Remove from wishlist successfully!");
      return true;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const handleAddProductWishlist = createAsyncThunk(
  "wishlist/add",
  async (actionPayload, thunkApi) => {
    // ----- GET STATE AUTH AND CHECK ADDED WISHLIST ----- //
    const { wishlist } = thunkApi.getState()?.wishlist || {};
    const isAddedWishlist = wishlist?.some(
      (item) => item?.id === actionPayload?.product
    );
    if (!tokenMethod.get())
      return thunkApi.dispatch(handleShowModal(MODAL_TYPES.login));
    if (isAddedWishlist)
      return message.warning("The product already exists in the wishlist!");
    try {
      await productService.addProductToWishlist(actionPayload);
      thunkApi.dispatch(handleGetProfile());
      message.success("Add to wishlist successfully");
      return true;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      message.error("Add to cart failed");
    }
  }
);
