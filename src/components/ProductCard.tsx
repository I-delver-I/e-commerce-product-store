import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import ProductCardContent from "@/components/ProductCardContent";

export default function ProductCard({photo, ...props}: ProductCardType) {
    return (
        <Card sx={{
            width: 330, height: 450, margin: "20px", transition: "transform 0.2s ease",
            "&:hover": {
                transform: "scale(1.05)",
                borderColor: "green",
                backgroundColor: "#e0e0e0",
            }
        }}>
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
                    alt="green iguana"
                />
                <ProductCardContent title={props.title}
                                    brand={props.brand}
                                    category={props.category}
                                    discount={props.discount}
                                    price={props.price}
                                    rating={props.rating}/>
            </CardActionArea>
        </Card>
    );
}
