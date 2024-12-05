import { create } from 'zustand';

export interface UseProductListState {
    productDataList: object[] | unknown;
    totalData: number;
    setProductDataList: (data: object[] | unknown) => void;
    setTotalData: (data: number) => void;
}

export const useProductListState = create<UseProductListState>(
	(set) => ({
		productDataList: [],
        totalData: 0,
		setProductDataList(data: object[] | unknown) {
			set(() => ({
                productDataList: data,
            }));
		},
        setTotalData(totalData: number) {
			set(() => ({ totalData }));
		},
	})
);