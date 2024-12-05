import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
	QueryFunction,
	QueryKey,
	UseMutationOptions,
	UseQueryOptions,
	UseQueryResult,
} from '@tanstack/react-query';

export interface APIResponse<T> extends APIMeta {
	data: T;
}

/**
 * @description This type extends to AxiosResponse without APIMeta version
 */
export type HttpResponse<T extends unknown> = AxiosResponse<T>;

export type Response<T> = AxiosResponse<APIResponse<T>>;

export interface APIMeta {
	total?: number;
	limit?: number;
	offset?: number;
}

export interface TableFilterState extends BasicParams {
	q?: string | number;
	filter?: string;
	setQ?: (query: string | number) => void;
	setFilter?: (filter: any) => void;
	resetParams?: () => void;
}

export interface Hooks<T, B, R = any, E = any, V = R> {
	params?: T;
	body?: B;
	queryId?: string;
	queryKey?: QueryKey;
	queryOptions?: UseQueryOptions<R, E, V>;
	mutationOptions?: UseMutationOptions<R, E, B>;
	id?: string | number;
}

export interface QueryOptionsHook<
	T,
	R extends unknown = unknown,
	V extends unknown = unknown,
	E extends Error = Error,
> {
	params?: T;

	/**
	 * @deprecated use queryKey instead
	 */
	queryId?: string;
	queryKey?: QueryKey;
	queryOptions?: Omit<UseQueryOptions<R, E, V>, 'queryKey' | 'queryFn'>;
}

export interface BasicParams extends Pick<TableFilterState, 'q' | 'filter'> {
	limit?: number;
	skip?: number;
	sort?: string;
}

export interface GetRequest<T = {}> {
	path: string;
	params?: T;
	config?: AxiosRequestConfig;
}
export type RequestData = 'get' | 'put' | 'post' | 'delete';

export type PostDataType = Exclude<RequestData, 'get'>;
export type PostRequest<T> = Omit<GetRequest, 'params'> & {
	body: T;
	type: PostDataType;
	baseUrl?: string;
};
