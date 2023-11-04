import Card from "@mui/material/Card";
import React, {ReactNode} from "react";
import Typography from "@mui/material/Typography";

interface ProductCharacteristicsCardProps {
    title: string,
    characteristic: any,
    backgroundColor?: string
}

const ProductCharacteristicsCard: React.FC<ProductCharacteristicsCardProps> =
    ({title, characteristic, backgroundColor}) => {
        return <Card sx={{
            width: "100%", backgroundColor, borderRadius: "1px",
            padding: "5px"
        }}>
            <Typography color={"grey"}>{title}</Typography>
            <Typography width="100%">{characteristic}</Typography>
        </Card>
    }

export default ProductCharacteristicsCard;
