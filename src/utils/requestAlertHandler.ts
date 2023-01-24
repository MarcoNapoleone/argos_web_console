import {AxiosError, AxiosResponse} from "axios";
import {AlertEvent} from "../Components/Providers/Alert/Alert.provider";

export const getResponseAlert = (response: AxiosResponse): AlertEvent => {
  if ([200, 201, 204].includes(response?.status)) {
    return {
      message: 'Success!',
      severity: "success"
    }
  } else {
    return {
      message: "Mhh! Something's wrong",
      severity: "warning"
    }
  }
};

export const getReasonAlert = (reason: AxiosError): AlertEvent => {
  if ([400, 401, 403, 404, 409].includes(reason.response?.status)) {
    return {
      message: `${reason?.response?.data['message']}`,
      severity: "error"
    }
  } else if ([500, 502, 503, 504].includes(reason.response?.status)){
    return {
      message: `${reason?.response?.data['message']}`,
      severity: "warning"
    }
  }
};


