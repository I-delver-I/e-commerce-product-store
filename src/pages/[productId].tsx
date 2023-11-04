import Head from "next/head";
import React from "react";
import {InferGetStaticPropsType, NextPage} from "next";
import {getAllProductIds, getProductData} from "@/pages/index";
import ImageVerticalTabs from "@/components/product/details/ImageVerticalTabs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProductCharacteristics from "@/components/product/details/ProductCharacteristics";
import {calculateDiscountedPrice} from "@/utils/pricingUtils";
import Rating from "@mui/material/Rating";

export async function getStaticPaths() {
    const paths = await getAllProductIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}: { params: { productId: string } }) {
    const productId = parseInt(params.productId);
    const productData = await getProductData(productId);

    const productCharacteristics: ProductDetailsPageData = {
        title: productData.title,
        category: productData.category,
        price: productData.price,
        brand: productData.brand,
        discountPercentage: productData.discountPercentage,
        rating: productData.rating,
        description: productData.description,
        stock: productData.stock,
        images: productData.images,
    };

    return {
        props: {
            productCharacteristics,
        }
    }
}

const ProductDetailsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
    ({productCharacteristics}) => {
        console.log("Product render");

        const pageTitle = `${productCharacteristics.title} - Product Details`;

        return (
            <>
                <Head>
                    <title>{pageTitle}</title>
                </Head>
                <main className="product-details">
                    <Box sx={{width: "100%", display: "flex", justifyContent: "center"}}>
                        <Box sx={{
                            display: "flex", flexDirection: "column", flexWrap: "wrap",
                            alignItems: "center", padding: "15px", width: 1100
                        }}>
                            <Box sx={{maxWidth: 1000, width: "100%"}}>
                                <Typography variant="h5">{productCharacteristics.title}</Typography>
                                <ImageVerticalTabs imageUrls={productCharacteristics.images}
                                                   title={productCharacteristics.title}/>
                            </Box>

                            <Rating value={productCharacteristics.rating} precision={0.1}
                                    readOnly sx={{fontSize: '1.3rem', alignSelf: "flex-end"}} />

                            <Typography variant="body1" display="inline" sx={{fontSize: '1.5rem'}}>
                                <s>${productCharacteristics.price} </s>
                                <span style={{color: "red"}}>
                                ${calculateDiscountedPrice(productCharacteristics.price,
                                    productCharacteristics.discountPercentage)}
                            </span>
                            </Typography>

                            <ProductCharacteristics characteristics={productCharacteristics}/>
                        </Box>
                    </Box>
                </main>
            </>
        );
    };

export default ProductDetailsPage;
