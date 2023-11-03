import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";

const getAllProductIds = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const apiUrl = 'https://dummyjson.com/products';
        const response = await axios.get<{ products: Product[] }>(apiUrl);

        if (response.status !== 200) {
            throw new Error('Failed to fetch product data');
        }

        const products = response.data.products;
        const productIds = products.map((product) => product.id);

        res.status(200).json({productIds});
    }
    catch (err) {
        console.error('Error fetching product IDs:', err);
        res.status(500).json({ error: 'Failed to fetch product IDs' });
    }
}

export default getAllProductIds;
