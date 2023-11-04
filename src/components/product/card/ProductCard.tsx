import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import ProductCardContent from "@/components/product/card/ProductCardContent";
import Link from 'next/link';
import {JSX} from "react";
import Router from "next/router";


export default function ProductCard({photo, ...product}: Product & { photo: string }) {
    return (
        <Card sx={{
            width: 330, height: 450, margin: "20px", transition: "transform 0.2s ease",
            "&:hover": {
                transform: "scale(1.05)",
                borderColor: "green",
            }
        }}>
            <Link href={`/${product.id}`}>
                <CardActionArea sx={{
                    height: "100%", width: "100%",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
                }}>
                    <CardMedia
                        sx={{
                            height: "50%", width: "100%", objectFit: "contain", border: "2px solid green",
                            transition: "border-color 0.6s",
                            "&:hover": {
                                borderColor: "green",
                                boxShadow: "0 0 10px rgba(0, 128, 0, 0.5)"
                            }
                        }}
                        component="img"
                        src={photo}
                        alt={product.title}
                    />
                    <ProductCardContent
                        content={product}
                    />
                </CardActionArea>
            </Link>
        </Card>
    );
}
