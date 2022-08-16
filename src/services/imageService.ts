import useCookie from "../hooks/useCookie";
import { imageApiClient } from "./apiClient";
import { setImageApiClientHeaders } from "./axiosInterceptors";

export async function postImage(image: {}) {
    let [data, error] = [undefined, undefined] as any;
    const { getCookie } = useCookie();

    try {
        const form = new FormData();
        Object.keys(image).forEach((e) => {form.append(e, image[e]);})
        
        setImageApiClientHeaders(getCookie());
        const result = await imageApiClient.post('/convert', form);
        data = result?.data;
    } catch (err) {
        error = err?.response || err?.message;
    }

    return { data, error };
}
