import { useCallback, useState } from "react"
import { productService } from "../services/product";
import type { Product } from "../type/product";

export function useProducts() {
    const [products, setProducts] = useState ([]);
    const [loadings, setLoadings] = useState({
        loadingList: false,
        loadingProduct: false,
        addingProduct: false,
    });

    const getList = useCallback(async() =>{
        setLoadings((l) => ({ ...l, loadingList: true }));
        try{
            const products  = await productService.getAll();
            setProducts(products);
        } catch (error){
            console.log(error)
        } finally {
            setLoadings((l) => ({ ...l, loadingList: false }));
        }
    },[])

    const getProduct = useCallback(async(id: string) =>{
        setLoadings((l) => ({ ...l, loadingProduct: true }));
        try{
            const product  = await productService.getId(id);
            return product
        } catch (error){
            console.log(error)
        } finally {
            setLoadings((l) => ({ ...l, loadingProduct: false }));
        }
    },[])

    const addProduct = useCallback(async(data: Product) =>{
        setLoadings((l) => ({ ...l, addingProduct: true }));
        try{
            const product  = await productService.addProduct(data);
            return product
        } catch (error){
            console.log(error)
        } finally {
            setLoadings((l) => ({ ...l, addingProduct: false }));
        }
    },[])
    
    return {
        loadings,
        products,
        getProduct,
        getList,
        addProduct,
    }
}