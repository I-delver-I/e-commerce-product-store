import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import { calculateDiscountedPrice } from "@/utils/pricingUtils";
import Rating from "@mui/material/Rating";

export default function ProductCardContent({content}: { content: Omit<ProductCardData, "photo"> }) {
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
        <Typography gutterBottom variant="body1" component="div" sx={{fontWeight: 'bold'}}>
            {content.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{fontSize: '1rem'}}>
            <strong>Brand:</strong> <br/> {content.brand}
        </Typography>

        <Typography variant="body1" color="orange" sx={{fontSize: '1rem'}}>
            <strong>Discount:</strong> {content.discountPercentage}%
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{fontSize: '1rem'}}>
            <strong>Category:</strong> {content.category}
        </Typography>

        <Typography variant="body1" display="inline" sx={{fontSize: '1rem'}}>
            <strong>Price:</strong><br/> <s>${content.price} </s>
            <span style={{color: "red"}}>
                ${calculateDiscountedPrice(content.price, content.discountPercentage)}
            </span>
        </Typography>

        <Rating value={content.rating} precision={0.1} readOnly
                sx={{fontSize: '1.3rem', alignSelf: "flex-start"}} />
    </CardContent>;
}
