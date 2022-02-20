import axios from "axios";
import { END_POINT } from "../api/apiEndpoints";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    // destructure user from getState
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token, // this is we use as a kinda of id
      },
    };

    // profile as id
    const { data } = await axios.post(END_POINT + "/api/orders", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    // destructure user from getState
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token, // this is we use as a kinda of id
      },
    };

    // profile as id
    const { data } = await axios.get(END_POINT + "/api/orders/" + id, config);
    console.log("data", data);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      // destructure user from getState
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInfo.token, // this is we use as a kinda of id
        },
      };

      console.log(userInfo);
      console.log("orderid : ", orderId);

      // profile as id
      const { data } = await axios.put(
        END_POINT + "/api/orders/" + orderId + "/pay",
        paymentResult,
        config
      );

      console.log("data : ", data);
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    // destructure user from getState
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token, // this is we use as a kinda of id
      },
    };

    // profile as id
    const { data } = await axios.put(
      END_POINT + "/api/orders/" + order._id + "/deliver",
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    // destructure user from getState
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token, // this is we use as a kinda of id
      },
    };

    // profile as id
    const { data } = await axios.get(
      END_POINT + "/api/orders/myorders",
      config
    );

    console.log("data : ", data);
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    // destructure user from getState
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token, // this is we use as a kinda of id
      },
    };

    // profile as id
    const { data } = await axios.get(END_POINT + "/api/orders", config);

    console.log("data : ", data);
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};