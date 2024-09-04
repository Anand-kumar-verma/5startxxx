import axios from "axios";

export const apiConnectorGet = async (endpoint, params) => {
  try {
    const response = await axios?.get(
      endpoint,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      {
        params: params,
      }
    );
    return response;
  } catch (e) {
    return {
      msg: e?.message,
    };
  }
};
export const apiConnectorPost = async (endpoint, reqBody) => {
  try {
    const response = await axios?.post(endpoint, reqBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (e) {
    return {
      msg: e?.message,
    };
  }
};
