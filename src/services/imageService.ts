import { imageApiClient } from "../configs/apiClient";

export async function postImage(image: {}) {
    let [data, error] = [undefined, undefined] as any;
    try {
        const form = new FormData();
        Object.keys(image).forEach((e) => { form.append(e, image[e]); })

        const result = await imageApiClient.post('/convert', form);
        data = result?.data;
    } catch (err) {
        error = err?.response || err?.message;
    }

    return { data, error };
}
