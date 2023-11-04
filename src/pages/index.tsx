import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import axios from "axios";
import Head from "next/head";
import PaginationBar from "@/components/ui/PaginationBar";
import {Dispatch, SetStateAction, useState} from "react";
import ProductCards from "@/components/product/card/ProductCards";
import usePagination from "@/hooks/usePagination";
import Box from "@mui/material/Box";

const allProductsApiUrl = "https://dummyjson.com/products";

export async function getAllProductIds() {
    const products = await fetchAllProducts(allProductsApiUrl);

    return products.map(product => {
        return {
            params: {
                productId: product.id.toString(),
            }
        }
    });
}

const fetchAllProducts = async (apiUrl: string) => {
    let {skip} = await getProductApiDetails();

    let result: Product[] = [];
    let tempSkip = skip;

    while (true) {
        const fetchedProducts = await fetchProducts(apiUrl, tempSkip);

        if (fetchedProducts.length === 0) {
            break;
        }

        result = result.concat(fetchedProducts);
        tempSkip += fetchedProducts.length;
    }

    return result;
}

const fetchProducts = async (apiUrl: string, skip: number) => {
    let result: Product[] = [];

    try {
        const response =
            await axios.get<{ products: Product[] }>(`${apiUrl}?skip=${skip}`);
        result = response.data.products;
    } catch (err) {
        console.error("Error fetching products:", err);
    }

    return result;
};

const getProductApiDetails = async () => {
    let result: ProductApiDetails = {total: 0, skip: 0, limit: 0};

    try {
        result = (await axios.get<ProductApiDetails>(allProductsApiUrl)).data;
    } catch (err) {
        console.error("Error fetching api details:", err);
    }

    return {...result}
};

const productsCountPerPage = 10;

export const getStaticProps: GetStaticProps = async () => {
    const {total, limit, skip} = await getProductApiDetails();

    const products = await fetchProducts(allProductsApiUrl, 0);

    return {
        props: {
            skip: skip,
            total: total,
            limit: limit,
            products: products,
        }
    };
};

export async function getProductData(id: number) {
    let result: Product = {
        id: 0, title: '', description: '', price: 0,
        discountPercentage: 0, rating: 0, stock: 0, brand: '', category: '',
        thumbnail: '', images: [],
    };

    try {
        const response =
            await axios.get<Product>(`${allProductsApiUrl}/${id}`);
        result = response.data;
    } catch (err) {
        console.error("Error fetching products:", err);
    }

    return result;
}

const AllProducts: NextPage = ({skip: initialSkip, limit, total, products: initialProducts}:
                                   InferGetStaticPropsType<typeof getStaticProps>) => {
    const totalPagesCount = Math.ceil(total / productsCountPerPage);

    const [skip, setSkip] =
        useState<number>(initialSkip);

    async function handleProductFetch(onProductsFetch: Dispatch<SetStateAction<Product[]>>) {
        const newSkip = skip + limit;
        setSkip(prev => newSkip);

        const fetchedProducts = await fetchProducts(allProductsApiUrl, newSkip);
        onProductsFetch(prev => [...prev, ...fetchedProducts]);
    }

    const {
        currentPage,
        maxPage,
        next,
        prev,
        jump,
        currentData,
    } = usePagination<Product>(
        {
            initialData: initialProducts, pagesCount: totalPagesCount,
            itemsPerPage: productsCountPerPage, onDataFetch: handleProductFetch
        });

    return (<>
        <Head>
            <title>All Products</title>
        </Head>
        <main style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            <ProductCards products={currentData()}/>
        </main>
        <Box sx={{display: "flex", justifyContent: "center"}}>
            <PaginationBar
                currentPage={currentPage}
                maxPage={maxPage}
                onNext={next}
                onPrev={prev}
            />
        </Box>
    </>);
};

export default AllProducts;
