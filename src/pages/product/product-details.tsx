import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const ProductDetailsPage = ({}) => {
    const product = {
        id: 1,
        name: "Product Name",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla, urna vel.",
        price: 29.99,
        image: "product-image-url.jpg",
    };

    return (
        <>
            <Head>
                <title>{product.name} - Product Details</title>
            </Head>
            <div className="product-details">
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <button className="add-to-cart-button">Add to Cart</button>
                </div>
            </div>
            <style jsx>{`
        .product-details {
          display: flex;
          align-items: center;
          margin: 20px;
        }
        .product-image {
          flex: 1;
        }
        .product-info {
          flex: 2;
          padding: 20px;
        }
        .product-info h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .product-info p {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .product-price {
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }
        .add-to-cart-button {
          background-color: #0070f3;
          color: #fff;
          border: none;
          padding: 10px 20px;
          font-size: 18px;
          cursor: pointer;
        }
      `}</style>
        </>
    );
};

export default ProductDetailsPage;
