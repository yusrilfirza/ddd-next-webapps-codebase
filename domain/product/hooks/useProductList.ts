import { useEffect, useMemo } from "react";
import { useProductListQuery } from "./query/product.query";
import { useProductListState } from "../state/product.state";

export const useProductList = () => {
    const { data, status } = useProductListQuery({
        queryKey: 'useProductList',
    });

    const { productDataList, setProductDataList, setTotalData, totalData } = useProductListState();

    useEffect(() => {
        if (data?.results && data?.count) {
            setProductDataList(data.results);
            setTotalData(data.count);
        }
    }, [data]); // eslint-disable-line

    return useMemo(() => ({
        totalData,
        productDataList,
        status,
    }), [productDataList, status, totalData])
}