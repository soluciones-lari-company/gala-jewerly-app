import axios, { AxiosInstance } from "axios";
import { useCookies } from "react-cookie";
import { Client, RefreshRequest } from "./GalaJewerlyClient";
import { UserAuthStorage } from "../../contexts/UserAuthStorage";

const InstanceAxios = () => {
  const [cookies, setCookies] = useCookies();

  const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_HOST_API_JEWERLY,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${UserAuthStorage.info().token?.accessToken}`,
    },
    responseType: "json",
  });
instance.defaults.withCredentials = true
  const createAxiosResponseInterceptor = async (axiosInstance: AxiosInstance) => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {return Promise.resolve(response)},
      (error) => {
        // Reject promise if usual error
        if (error.status !== 401) {
          return Promise.reject(error);
        }
        /*
         * When response code is 401, try to refresh the token.
         * Eject the interceptor so it doesn't loop in case
         * token refresh causes the 401 response
         */
        axiosInstance.interceptors.response.eject(interceptor);

        const client = new Client();
        const request  = {
            refreshToken:  cookies["refreshToken"]
          } as RefreshRequest
          client.postApiIdentityRefresh(request).then((result) => {
            setCookies("accessToken", result.accessToken); // your token
            setCookies("refreshToken", result.refreshToken); // your token
            setCookies("expiresIn", result.expiresIn); // your token
            error.response.config.headers['Authorization'] = 'Bearer ' + result.accessToken;
            return axiosInstance(error.response.config);
          })
          .catch((error) => {
            return Promise.reject(error);
          }).finally(()=> {createAxiosResponseInterceptor(axiosInstance)});

        // return axiosInstance.post('/api/refresh_token', {
        //     'refresh_token': this._getToken('refresh_token')
        // }).then(response => {
        //     saveToken();
        //     error.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
        //     return axiosInstance(error.response.config);
        // }).catch(error => {
        //     destroyToken();
        //     this.router.push('/login');
        //     return Promise.reject(error);
        // }).finally(createAxiosResponseInterceptor);

        return error;
      }
    );
  };
  createAxiosResponseInterceptor(instance);
  return instance;
};

export default InstanceAxios;
