/* eslint-disable */
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export const URL = "https://rickandmortyapi.com/api";

const _axiosConfigs = {
  PUBLIC: {
    _buildGetAxiosConfig: function (
      endpoint: string = "",
      params: string = "",
      data: any = {}
    ): AxiosRequestConfig {
      const config: AxiosRequestConfig = {
        method: "get",
        url: URL + endpoint + params,
        data: data,
      };
      return config;
    },
    _buildGetAxiosConfigWithUrl: function (
      url: string,
      data: any = {}
    ): AxiosRequestConfig {
      const config: AxiosRequestConfig = {
        method: "get",
        url: url,
        data: data,
      };
      return config;
    },
  },
};

export const AXIOS_UTILS = {
  CHARACTERS: {
    GET_LIST: (page: number = 1, params: string = ""): AxiosPromise<any> => {
      //delete first character of params
      if (params.length > 0 && page !== 0 && page !== 1) {
        params = params.substring(1);
      }
      return axios(
        _axiosConfigs.PUBLIC._buildGetAxiosConfig(
          !(page !== 0 && page !== 1)
            ? "/character/"
            : `/character/?page=${page.toString()}&`,
          params,
          {}
        )
      );
    },
    GET_CHARACTER: (id: number): AxiosPromise<any> =>
      axios(
        _axiosConfigs.PUBLIC._buildGetAxiosConfig(
          "/character/" + id.toString(),
          "",
          {}
        )
      ),
  },
  EPISODES: {
    GET_EPISODE: (url: string): AxiosPromise<any> => {
      return axios(_axiosConfigs.PUBLIC._buildGetAxiosConfigWithUrl(url, {}));
    },
  },
};
