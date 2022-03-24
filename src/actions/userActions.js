import {
  LOGIN,
  BUSINESS_INFO_ARRAY,
  BUSINESS_EMAIL,
  GET_BUSINESS_APPOINTMENT,
  GET_CUSTOMER_APPOINTMENT,
} from "./types";
import axios from "axios";

export const customerSignUp = (object) => async (dispatch) => {
  const result = await axios
    .post("http://localhost:3001/customer/signUp", {
      object,
    })
    .catch((err) => {
      return err.response;
    });
  return result;
};

export const businessSignUp = (object) => async (dispatch) => {
  const result = await axios
    .post("http://localhost:3001/business/signUp", {
      object,
    })
    .catch((err) => {
      return err.response;
    });
  return result;
};

export const customerLogin = (object) => async (dispatch) => {
  const result = await axios
    .post("http://localhost:3001/customer/login", {
      object,
    })
    .catch((err) => {
      return err.response;
    });
  dispatch({
    type: LOGIN,
    payload: result.data,
  });
  localStorage.setItem("userInfo", JSON.stringify(result.data));
  return result;
};

export const businessLogin = (object) => async (dispatch) => {
  const result = await axios
    .post("http://localhost:3001/business/login", {
      object,
    })
    .catch((err) => {
      return err.response;
    });
  dispatch({
    type: LOGIN,
    payload: result.data,
  });
  localStorage.setItem("userInfo", JSON.stringify(result.data));
  return result;
};

export const getBusinessInfoArray = () => async (dispatch) => {
  const result = await axios
    .get("http://localhost:3001/business/", {
      headers: { authorization: JSON.parse(localStorage.getItem("userInfo")).token },
    })
    .catch((err) => {
      return err.response;
    });
  dispatch({
    type: BUSINESS_INFO_ARRAY,
    payload: result.data,
  });
  return result;
};

export const setBusinessEmail = (email) => (dispatch) => {
  dispatch({
    type: BUSINESS_EMAIL,
    payload: email,
  });
};

export const postAppointments = (object) => async (dispatch) => {
  const result = await axios
    .post("http://localhost:3001/appointment/", { object }, {
      headers: { authorization: JSON.parse(localStorage.getItem("userInfo")).token },
    })
    .catch((err) => {
      return err.response;
    });
  return result;
};

export const getBusinessAppointment = (id) => async (dispatch) => {
  const result = await axios
    .get(`http://localhost:3001/business/${id}`, {
      headers: { authorization: JSON.parse(localStorage.getItem("userInfo")).token },
    })
    .catch((err) => {
      return err.response;
    });
  const data = result.data.appointment;
  const appointmentArray = [];
  data.forEach((value) => {
    var newObject = {
      startDate: value.starttime,
      endDate: value.endtime,
      location: "Room 1",
      //title:value.title,
      //classNames:'disabled',
      disabled: true,
    };
    appointmentArray.push(newObject);
  });
  dispatch({
    type: GET_BUSINESS_APPOINTMENT,
    payload: appointmentArray,
  });
  return result;
};

export const getCustomerAppointment = (id) => async (dispatch) => {
  const result = await axios
    .get(`http://localhost:3001/customer/${id}`, {
      headers: { authorization: JSON.parse(localStorage.getItem("userInfo")).token }
    })
    .catch((err) => {
      return err.response;
    });
  const data = result.data.appointment;
  const appointmentArray = [];
  data.forEach((value) => {
    var location = "Room 1";
    if (value.status === -1) return;
    switch (value.status) {
      case 1:
        location = "Room 2";
        break;
      case 2:
        location = "Room 3";
        break;
      default:
        break;
    }
    var newObject = {
      id: value.id,
      startDate: value.starttime,
      endDate: value.endtime,
      location: location,
      position: value.location,
      title: value.title,
      classNames: "disabled",
    };
    appointmentArray.push(newObject);
  });

  dispatch({
    type: GET_CUSTOMER_APPOINTMENT,
    payload: appointmentArray,
  });
  return appointmentArray;
};

export const updateCustomerAppointment = (object) => async (dispatch) => {
  const result = await axios
    .put("http://localhost:3001/appointment/", { object }, {
      headers: { authorization: JSON.parse(localStorage.getItem("userInfo")).token },
    })
    .catch((err) => {
      return err.response;
    });
  return result;
};

export const deleteAppointment = (id) => async (dispatch) => {
  const result = await axios
    .delete(`http://localhost:3001/appointment/${id}`, {
      headers: { authorization: JSON.parse(localStorage.getItem("userInfo")).token },
    })
    .catch((err) => {
      return err.response;
    });
  return result;
};

export const getBusinessAppointmentById = (id) => async (dispatch) => {
  const result = await axios
    .get(`http://localhost:3001/business/${id}`, {
      headers: { authorization: JSON.parse(localStorage.getItem("userInfo")).token },
    })
    .catch((err) => {
      return err.response;
    });
  const data = result.data.appointment;
  const appointmentArray = [];
  data.forEach((value) => {
    var location = "Room 1";
    switch (value.status) {
      case 1:
        location = "Room 2";
        break;
      case 2:
        location = "Room 3";
        break;
      case -1:
        location = "Room 4";
        break;
      default:
        break;
    }
    var newObject = {
      id: value.id,
      startDate: value.starttime,
      endDate: value.endtime,
      location: location,
      position: value.location,
      title: value.title,
    };
    appointmentArray.push(newObject);
  });

  dispatch({
    type: GET_BUSINESS_APPOINTMENT,
    payload: appointmentArray,
  });
  return result;
};

export const removeAppointment = (id) => async (dispatch) => {
  const result = await axios
    .put(`http://localhost:3001/appointment/${id}`)
    .catch((err) => {
      return err.response;
    });
  return result;
};

export const changeAppointment = (id) => async (dispatch) => {
  const result = await axios
    .post(`http://localhost:3001/appointment/${id}`)
    .catch((err) => {
      return err.response;
    });
  return result;
};
