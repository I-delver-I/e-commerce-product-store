import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import * as React from "react";

const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price - (price * (discount / 100))).toFixed(2);
}

export default function ProductCardContent({title, brand, price, rating,
                                               discount, category}: Omit<ProductCardType, "photo">) {
    return <CardContent sx={{
        display: "grid",
        height: "50%",
        gridTemplateColumns: "2fr 1fr",
        gap: "3px 3px",
        gridTemplateRows: "1fr 1fr 1fr",
        alignItems: "_top",
        borderColor: "red",
        backgroundColor: "#f0f0f0",
        padding: "15px",
    }}>
        <Typography gutterBottom variant="body1" component="div" sx={{ fontWeight: 'bold'}}>
            {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
            <strong>Brand:</strong> {brand}
        </Typography>
        <Typography variant="body1" color="brown" sx={{ fontSize: '1rem' }}>
            <strong>Rating:</strong> {rating}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
            <strong>Category:</strong> {category}
        </Typography>
        <Typography variant="body1" display="inline" sx={{ fontSize: '1rem' }}>
            <strong>Price:</strong><br/> <s>${price} </s>
            <Typography color="red" display="inline">
                 ${calculateDiscountedPrice(price, discount)}
            </Typography>
        </Typography>
        <Typography variant="body1" color="orange" sx={{ fontSize: '1rem' }}>
            <strong>Discount:</strong> {discount}%
        </Typography>
    </CardContent>;
}
