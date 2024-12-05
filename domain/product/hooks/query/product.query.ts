import { useQuery } from 'react-query';
import { getPokemonList } from '../../service/product.service';
import { UseCommonOptions } from '@/shared/interface/hooks.interface';

export const useProductListQuery = (config: UseCommonOptions) => {
	return useQuery({
		queryKey: [config.queryKey],
		queryFn: async () => await getPokemonList(),
		...config
	});
};