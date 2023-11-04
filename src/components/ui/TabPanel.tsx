import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {TabPanelProps} from "@/types/tabPanel";

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{width: "100%", height: "100%"}}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, width: "100%", height: "100%" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
