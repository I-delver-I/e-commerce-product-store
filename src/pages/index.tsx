import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import axios from "axios";
import Head from "next/head";
import PaginationBar from "@/components/ui/PaginationBar";
import {ReactNode, useCallback, useState} from "react";
import ProductCards from "@/components/product/card/ProductCards";
import {lime} from "@mui/material/colors";
import productId from "@/pages/[productId]";
import {number} from "prop-types";

const apiUrl = "https://dummyjson.com/products";

export async function getAllProductIds() {
    // try {
    //     const apiUrl = "/api/product";
    //     const response = await axios.get<number[]>(apiUrl);
    //
    //     if (response.status !== 200) {
    //         throw new Error('Failed to fetch product data');
    //     }
    //
    //     const productIds = response.data;
    //
    //     return productIds.map(productId => {
    //         return {
    //             params: {
    //                 productId: productId.toString(),
    //             },
    //         };
    //     });
    // }
    // catch (err) {
    //     console.error('Error fetching product IDs:', err);
    //     return [];
    // }

    const products = await fetchAllProducts(apiUrl);

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
        result = (await axios.get<ProductApiDetails>(apiUrl)).data;
    } catch (err) {
        console.error("Error fetching api details:", err);
    }

    return {...result}
};

const productsCountPerPage = 10;

export const getStaticProps: GetStaticProps = async () => {
    const {total, limit} = await getProductApiDetails();

    const products = await fetchProducts(apiUrl, 0);
    // const products = await fetchAllProducts(apiUrl);

    return {
        props: {
            limit: limit,
            total: total,
            products: products.slice(0, productsCountPerPage),
        }
    };
};

export async function getProductData(id: number) {
    const products = await fetchAllProducts(apiUrl);
    const result = products.find(product =>
        product.id === id);

    if (!result) {
        throw new Error(`Product with id ${id} not found`);
    }

    return result;
}

const AllProducts: NextPage = ({limit, total, products}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const totalPagesCount = Math.ceil(total / productsCountPerPage);
    const [skip] = useState(0);

    console.log("All products render")

    return (<>
        <Head>
            <title>All Products</title>
        </Head>
        <main style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            <ProductCards products={products}/>
        </main>
        <PaginationBar data={products} totalPagesCount={totalPagesCount}/>
    </>);
};

export default AllProducts;
