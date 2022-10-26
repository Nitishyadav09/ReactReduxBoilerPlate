// react
import React from "react";

// vendors
import Axios, { AxiosInstance, CancelToken } from "axios";

// --------------------------------------------------------------------------------

// const apiBase = "https://api.xcpep.com/";
const apiBase = "https://api.spacexdata.com/v3/";
// --------------------------------------------------------------PEs------------------

// --------------------------------------------------------------PEs------------------

class api {
  fetch(arg0: string, data: FormData, arg2: number) {
    throw new Error("Method not implemented.");
  }
  private _apiBase: string;
  private axios: AxiosInstance;
  private timeout: number = 10000;

  constructor(apiBase: string) {
    this._apiBase = apiBase;
    this.axios = Axios.create({
      baseURL: this.apiBase,
      timeout: this.timeout,
    });
  }

  get apiBase() {
    return this._apiBase;
  }

  private upload =
    (method: "post" | "put") =>
    (url: string, data: any = {}, params: any = {}) => {
      let toastId: number | string | undefined;
      const source = Axios.CancelToken.source();

      return this.axios({
        method,
        url,
        data,
        params,
        timeout: 0,
        cancelToken: source.token,
        onUploadProgress: (e: ProgressEvent) => {
          const progress = e.loaded / e.total;

          // check if we already displayed a toast
        
        },
      })
    };

  get = (
    url: string,
    params: any = {},
    timeout?: number,
    cancelToken?: CancelToken
  ) => {
    return this.axios({
      method: "get",
      url,
      params,
      timeout: timeout ?? this.timeout,
      cancelToken,
    });
  };

  post = (url: string, data: any = {}, params: any = {}, timeout?: number) => {
    return this.axios({
      method: "post",
      url,
      data,
      params,
      timeout: timeout ?? this.timeout,
    });
  };

  uploadPost = this.upload("post");

  put = (url: string, data: any, params: any = {}, timeout?: number) => {
    return this.axios({
      method: "put",
      url,
      data,
      params,
      timeout: timeout ?? this.timeout,
    });
  };
  patch = (url: string, data: any, params: any = {}, timeout?: number) => {
    return this.axios({
      method: "patch",
      url,
      data,
      params,
      timeout: timeout ?? this.timeout,
    });
  };

  uploadPut = this.upload("put");

  delete = (url: string, data?: any, timeout?: number) => {
    return this.axios({
      method: "delete",
      url,
      data,
      timeout: timeout ?? this.timeout,
    });
  };

}

const API = new api(apiBase);

export { API };
