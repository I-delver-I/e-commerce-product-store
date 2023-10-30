type ProductCardType = {
    title: string;
    photo: string;
    category: string;
    brand: string;
    price: number;
    discount: number;
    rating: number;
};

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

type ProductApiOutline = {
    total: number;
    skip: number;
    limit: number;
}
