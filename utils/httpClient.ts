import axios from 'axios';

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        Accept: 'application/ld+json',
    },
});

type ResponseType<T = any> = {
    isSuccessful: boolean;
    data: T;
    message: string;
};

export const httpGet = async (url: string, params?: Record<string, any>): Promise<ResponseType> => {
    let res;
    let data;
    let isSuccessful;
    let message;

    try {
        res = await client.get(url, { params });
        data = res.data.data;
        isSuccessful = true;
        message = res.data.message;
    } catch (e: any) {
        isSuccessful = false;
        message = e.response.data?.message ?? 'Something went wrong';
        data = {};
    }

    return {
        isSuccessful,
        message,
        data,
    };
};

export const httpPost = async (
    url: string,
    body?: any,
    params?: Record<string, any>,
): Promise<ResponseType> => {
    let res;
    let data;
    let isSuccessful;
    let message;

    try {
        res = await client.post(url, body, { params });
        data = res.data.data;
        isSuccessful = true;
        message = res.data.message;
    } catch (e: any) {
        isSuccessful = false;
        message = e?.response?.data?.message ?? 'Something went wrong';
        data = {};
    }

    return {
        isSuccessful,
        message,
        data,
    };
};
