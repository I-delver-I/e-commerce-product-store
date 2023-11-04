import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import Card from "@mui/material/Card";
import ProductCharacteristicsCard from "@/components/product/details/ProductCharacteristicsCard";

export default function ProductCharacteristics
({characteristics}: { characteristics: ProductDetailsPageData }) {
    return <Box sx={{width: "100%", maxWidth: 1100}}>
        <Typography variant="h5">Characteristics</Typography>

        <ProductCharacteristicsCard characteristic={characteristics.title} title="Title"
                                    backgroundColor="lightblue"/>
        <ProductCharacteristicsCard characteristic={characteristics.brand} title="Brand"/>
        <ProductCharacteristicsCard characteristic={characteristics.category} title="Category"
                                    backgroundColor="lightblue"/>
        <ProductCharacteristicsCard characteristic={characteristics.description}
                                    title="Description"/>
        <ProductCharacteristicsCard characteristic={characteristics.stock} title="Available quantity"
                                    backgroundColor="lightblue"/>
    </Box>
}
