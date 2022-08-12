import useCookie from "../hooks/useCookie";
import { imageApiClient } from "./apiClient";
import { setImageApiClientHeaders } from "./axiosInterceptors";

export async function postImage(image: any) {
    let [data, error] = [undefined, undefined] as any;
    const { getCookie } = useCookie();

    try {
        setImageApiClientHeaders(getCookie());
        const result = await imageApiClient.post('/convert', image);
        data = result?.data;
    } catch (err) {
        error = err?.response || err?.message;
    }

    return { data, error };
}
