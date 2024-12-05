import { getRequest } from '@/shared/libs/http';
import { PokemonResponse } from '../interface/product.interface';

export interface PokemonErrorResponse {
	data?: {
		errors: {
			message: string
		}[];
	}
}

export const getPokemonList = async (): Promise<PokemonResponse> => {
	try {
		return await getRequest({
			url: `/pokemon`,
		});
	} catch (error) {
		throw new Error((error as PokemonErrorResponse)?.data?.errors[0].message);
	}
};
