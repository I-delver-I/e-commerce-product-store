import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from "@/components/ui/TabPanel";

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function ImageVerticalTabs({imageUrls, title}: { imageUrls: string[], title: string }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ bgcolor: 'background.paper', display: 'flex',
                 width: "100%%", height: 350 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider', height: "100%", width: "10%", minWidth: 80}}
            >
                {imageUrls.map((imageUrl, index) => {
                        return <Tab key={index}
                                    label={<img style={{height: "100%", width: "100%",
                                        objectFit: "contain"}} src={imageUrl}  alt={title}/>}
                                    {...a11yProps(index)} />
                    }
                )}
            </Tabs>

            <Box sx={{width: "90%", height: "100%"}}>
                {imageUrls.map((imageUrl, index) => {
                    return <TabPanel value={value} index={index} key={index}>
                        <Box sx={{height: "100%", width: "100%"}}>
                            <img style={{height: "100%", width: "100%", objectFit: "contain"}} src={imageUrl}  alt={title}/>
                        </Box>
                    </TabPanel>;
                })}
            </Box>
        </Box>
    );
}
