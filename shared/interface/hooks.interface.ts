import type { ParsedParams, RequestParamsType } from './params.interface';

import {
	InvalidateQueryFilters,
	MutationFunction,
	QueryKey,
	UseMutationOptions,
	UseQueryOptions,
} from 'react-query';

export type UseCommonOptions = {
	baseUrl?: string;
	queryKey?: QueryKey;
	params?: Partial<RequestParamsType>;
	invalidateQueryKeys?: QueryKey[];
	invalidateQueryFilters?: InvalidateQueryFilters;
	redirectOnSuccess?: string;
	redirectOnError?: string;
};

export type UseFetchControllerProps<TResponse, TError = Error> = {
	resource: ResourceQuery<TResponse>;
	options?: Pick<UseCommonOptions, 'baseUrl' | 'params'>;
	queryOptions?: UseQueryOptions<TResponse, TError>;
};

export type UseListControllerProps<TResponse> =
	UseFetchControllerProps<TResponse>;

export type UseShowControllerProps<TResponse> = Omit<
	UseFetchControllerProps<TResponse>,
	'options'
> & {
	options?: Pick<UseCommonOptions, 'baseUrl' | 'queryKey'> & {
		params?: unknown;
	};
};

export type UseMutationControllerProps<TPayload, TResponse, TError> = {
	resource: ResourceMutation<TPayload, TResponse>;
	options?: UseCommonOptions;
	mutationOptions?: UseMutationOptions<TResponse, TError, TPayload>;
};

export type ResourceMutation<TPayload, TResponse> =
	| string
	| MutationFunction<TResponse, TPayload>;

export type ResourceQuery<
	TResponse,
	TParams extends Record<string, unknown> = ParsedParams,
> = string | ((parsedParams?: Partial<TParams>) => Promise<TResponse>);
