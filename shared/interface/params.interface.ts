import { SortingState } from '@tanstack/react-table';

export type RequestParamsType = {
	page: number;
	perPage: number;
	filters: RequestFilterType[];
	sort: SortingState;
	keyword: string;
	[key: string]: any;
};

export type RequestParams = {
	page: number;
	perPage: number;
	filters: string;
	sort: string;
	keyword: string;
	[key: string]: any;
};

export type RequestFilterType = {
	name: string;
	operator: string;
	value: any;
};

export type ParsedParams = {
	limit?: number;
	offset?: number;
	sort?: string;
	filter?: string;
	keyword?: string;
	[key: string]: any;
};
