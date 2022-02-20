import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import { END_POINT } from "../api/apiEndpoints";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(END_POINT + "/api/products/" + id);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    // put what in the state into localstorage
    localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
  } catch (err) {}
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
  } catch (err) {}
};

export const getItemFromCart = () => async (dispatch, _getState) => {
  try {
    dispatch({
      type: "GET_ITEM_FROM_CART",
      payload: JSON.parse(localStorage.getItem("cartItem")),
    });
  } catch (err) {}
};

export const saveShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  } catch (err) {}
};

export const savePaymentMethod = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
  } catch (err) {}
};
