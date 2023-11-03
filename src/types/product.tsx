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

type ProductDetailsPageData = {
    title: string;
    category: string;
    price: number;
    brand: string;
    discountPercentage: number;
    rating: number;
    description: string;
    stock: number;
    images: string[];
};

type ProductCardData = {
    title: string;
    photo: string;
    category: string;
    brand: string;
    price: number;
    discountPercentage: number;
    rating: number;
};

type ProductApiDetails = {
    total: number;
    skip: number;
    limit: number;
}
