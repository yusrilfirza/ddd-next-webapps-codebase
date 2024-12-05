import {
	InvalidateQueryFilters,
	MutationFunction,
	QueryFunction,
	QueryKey,
	UseMutationOptions,
	UseQueryOptions,
} from '@tanstack/react-query';

import { ParsedParamsType, RequestParamsType } from './params';

/**
 * @deprecated use from `shared/interfaces` folder
 */
export type UseCommonOptions = {
	baseUrl?: string;
	queryKey?: QueryKey;
	params?: Partial<RequestParamsType>;
	invalidateQueryKeys?: QueryKey[];
	invalidateQueryFilters?: InvalidateQueryFilters;
	redirectOnSuccess?: string;
	redirectOnError?: string;
};

/**
 * @deprecated use from `shared/interfaces` folder
 */
declare type UseFetchControllerProps<TResponse, TError = Error> = {
	resource: ResourceQuery<TResponse>;
	options?: Pick<UseCommonOptions, 'baseUrl' | 'params'>;
	queryOptions?: UseQueryOptions<TResponse, TError>;
};

/**
 * @deprecated use from `shared/interfaces` folder
 */
declare type UseListControllerProps<TResponse> =
	UseFetchControllerProps<TResponse>;

/**
 * @deprecated use from `shared/interfaces` folder
 */
declare type UseShowControllerProps<TResponse> = Omit<
	UseFetchControllerProps<TResponse>,
	'options'
> & {
	options?: Pick<UseCommonOptions, 'baseUrl' | 'queryKey'> & {
		params?: any;
	};
};

/**
 * @deprecated use from `shared/interfaces` folder
 */
declare type UseMutationControllerProps<TPayload, TResponse, TError> = {
	resource: ResourceMutation<TPayload, TResponse>;
	options?: UseCommonOptions;
	mutationOptions?: UseMutationOptions<TResponse, TError, TPayload>;
};

/**
 * @deprecated use from `shared/interfaces` folder
 */
declare type ResourceMutation<TPayload, TResponse> =
	| string
	| MutationFunction<TResponse, TPayload>;

/**
 * @deprecated use from `shared/interfaces` folder
 */
declare type ResourceQuery<TResponse> =
	| string
	| ((parsedParams?: Partial<ParsedParamsType>) => Promise<TResponse>);
