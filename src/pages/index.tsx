import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import axios from "axios";
import ProductCard from "@/components/product/ProductCard";
import Head from "next/head";
import PaginationBar from "@/components/PaginationBar";
import {useCallback, useState} from "react";
import Link from "next/link";

const apiUrl = "https://dummyjson.com/products";
const productsCountPerPage = 10;

let total: number;
let limit: number;

const fetchProducts = async (apiUrl: string, skip: number, count: number = productsCountPerPage) => {
    let result: Product[] = [];

    try {
        const response =
            await axios.get<{ products: Product[] }>(`${apiUrl}?skip=${skip}`);
        result = response.data.products;
    } catch (err) {
        console.error("Error fetching products:", err);
    }

    return result.slice(0, count);
};

export const getStaticProps: GetStaticProps = async () => {
    const productApiOutline = await axios.get<ProductApiOutline>(apiUrl);
    limit = productApiOutline.data.limit;
    total = productApiOutline.data.total;

    const products = await fetchProducts(apiUrl, 0);

    return {
        props: {
            products: products
        }
    };
};

const AllProducts: NextPage = ({products}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const totalPagesCount = Math.ceil(total / productsCountPerPage);
    const [skip] = useState(0);
    useCallback(() =>
        fetchProducts(apiUrl, skip), []);
    return (<>
        <Head>
            <title>All Products</title>
        </Head>
        <main style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {products.map((product: Product) => {
                return <Link key={product.title} href="./product/product-details/">
                    <ProductCard
                        title={product.title}
                        key={product.id}
                        photo={product.images[0]}
                        brand={product.brand}
                        category={product.category}
                        discount={product.discountPercentage}
                        price={product.price}
                        rating={product.rating}
                    />
                </Link>;
            })}
        </main>
        <PaginationBar data={products} totalPagesCount={totalPagesCount}/>
    </>);
};

export default AllProducts;
