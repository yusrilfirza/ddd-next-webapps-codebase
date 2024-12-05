/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession } from 'next-auth/react';

import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

type BaseRequestArgs = {
	url: string;
	config?: AxiosRequestConfig;
	useOTALibrary?: boolean;
};

type GetRequestArgs<TData extends Record<string, any>> = {
	params?: TData;
} & BaseRequestArgs;

type PostRequestArgs<TData extends Record<string, any>> = {
	data?: TData;
} & BaseRequestArgs;

type PutRequestArgs<TData extends Record<string, any>> = {
	data?: TData;
} & BaseRequestArgs;

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
	timeout: 10000,
	timeoutErrorMessage: 'Request timed out',
	headers: {
		'Content-type': 'application/json',
	},
});

instance.interceptors.request.use(
	async (config) => {
		const token = await getSession();

		if (token?.accessToken && !config.headers?.Authorization) {
			config.headers!.Authorization = `Bearer ${token?.accessToken}`;
		}

		config.headers['X-Api-Type'] = process.env.NEXT_PUBLIC_X_API_TYPE;

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			if (
				error.response.status === 401 ||
				error.response.status === 403
			) {
				// signOut({
				// 	callbackUrl: `/login?error=${error.response.data.message}`,
				// });
			}
		}

		throw error;
	}
);

export const deleteRequest = async <
	TData extends Record<string, any> = Record<string, any>,
	TResponse = any,
>({
	url,
	data,
	config,
}: PostRequestArgs<TData>): Promise<TResponse> => {
	try {
		const response = await instance.delete(url, {
			data,
			...config,
		});

		return response.data;
	} catch (error: any) {
		throw error;
	}
};

export const getRequest = async <
	TData extends Record<string, any> = Record<string, any>,
	TResponse = any,
>({
	url,
	params,
	config,
}: GetRequestArgs<TData>): Promise<TResponse> => {
	try {
		const response = await instance.get(url, {
			params,
			...config,
		});

		return response.data;
	} catch (error: any) {
		throw error;
	}
};

export const postRequest = async <
	TData extends Record<string, any> = Record<string, any>,
	TResponse = any,
>({
	url,
	data,
	config,
}: PostRequestArgs<TData>): Promise<TResponse> => {
	try {
		const response = await instance.post(url, data, {
			...config,
		});
		return response.data;
	} catch (error: any) {
		throw error;
	}
};

export const putRequest = async <
	TData extends Record<string, any> = Record<string, any>,
	TResponse = any,
>({
	url,
	data,
	config,
}: PutRequestArgs<TData>): Promise<TResponse> => {
	try {
		const response = await instance.put(url, data, {
			...config,
		});
		return response.data;
	} catch (error: any) {
		throw error;
	}
};

export const http = {
	deleteRequest,
	getRequest,
	postRequest,
	putRequest,
	config: instance.defaults,
} as const;

export type HttpInstance = typeof http;