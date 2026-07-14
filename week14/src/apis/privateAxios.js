import { getAccessToken } from "../auth/tokenStorage";
import { BASE_URL, publicAxios } from "./publicAxios";

export const privateAxios = publicAxios.create({
    baseURL: BASE_URL,
})

privateAxios.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

privateAxios.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        return Promise.reject(error);
    },
);