import axios from "axios";

export const post = async (requestUrl: string, requestData: Object) => {
    try {
        console.log(requestData)
        return await axios.post(requestUrl, requestData, makeConfig());
    } catch (error: any) {
        return error.response ; // You can choose to handle or propagate the error as needed.
    }
}

export const get = async (requestUrl: string, requestParams?: Object) => {

    try {
        return await axios.get(requestUrl, makeConfig(requestParams));
    } catch (error: any) {
        return error.response ; // You can choose to handle or propagate the error as needed.
    }
}

export const patch = async (requestUrl: string, requestData: Object) => {

    try {
        return await axios.patch(requestUrl, requestData, makeConfig());
    } catch (error: any) {
        return error.response ; // You can choose to handle or propagate the error as needed.
    }
}

export const del = async (requestUrl: string, requestParams: Object) => {

    try {
        return await axios.delete(requestUrl, makeConfig(requestParams));
    } catch (error: any) {
        return error.response ; // You can choose to handle or propagate the error as needed.
    }
}

const makeConfig = (requestParams?: any) => {
    const authToken = localStorage.getItem("authToken");

    const config: {params: any, headers?: any} = {
        params: requestParams,
    };

    if (authToken) {
        config.headers = {
            Authorization: `Bearer ${authToken}`,
        };
    }

    return config;
};