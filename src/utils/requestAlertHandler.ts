import {AxiosError, AxiosResponse} from "axios";
import {AlertEvent} from "../App/Alert/Alert";

export const getResponseAlert = (response: AxiosResponse): AlertEvent => {
  if (response?.status === 200 || response?.status === 201) {
    return {message: 'Successo!', severity: "success"}
  } else {
    return {message: 'Mhh!', severity: "warning"}
  }
};

export const getReasonAlert = (reason: AxiosError): AlertEvent => {
  if (reason.response?.status === 400 || reason.response?.status === 404) {
    return {message: `Errore! ${reason?.message}`, severity: "error"}
  } else {
    return {message: `Mhh! ${reason?.message}`, severity: "warning"}
  }
};


