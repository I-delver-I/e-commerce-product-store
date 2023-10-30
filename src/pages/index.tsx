import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

const apiUrl = "https://dummyjson.com/products";

const fetchProducts = async (apiUrl: string) => {
    let result: Product[] = [];

    const productApiOutline = await axios.get<ProductApiOutline>(apiUrl);
    const limit = productApiOutline.data.limit;
    const total = productApiOutline.data.total;
    let skip = productApiOutline.data.skip;

    try {
        while (true) {
            const response = await axios.get<{products: Product[] }>(`${apiUrl}?skip=${skip}`);

            const products = response.data.products;

            if (products.length === 0) {
                break;
            }

            result = result.concat(products);
            skip += limit;

            if (skip >= total) {
                break;
            }
        }
    } catch (err) {
        console.error("Error fetching products:", err);
    }

    return result;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const products = await fetchProducts(apiUrl);

    return {
        props: {
            products: products
        }
    };
};

const AllProducts: NextPage = ({products}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (<>
        <h1>All Products</h1>
        {products.map((product: Product) => {
            return <ProductCard
                title={product.title}
                key={product.id}
                photo={product.images[0]}
                brand={product.brand}
                category={product.category}
                discount={product.discountPercentage}
                price={product.price}
                rating={product.rating}
            />;
                /*<div key={product.id}>
                    <p>{product.title}</p>
                    <p>{product.brand}</p>
                    <p>{product.id}</p>
                </div>*/
        })}
    </>);
};

export default AllProducts;
