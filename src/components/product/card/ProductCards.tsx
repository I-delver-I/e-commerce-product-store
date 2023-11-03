import ProductCard from "@/components/product/card/ProductCard";

export default function ProductCards({products}: { products: Product[] }) {
    return <>
        {
            products.map((product: Product) => {
                return <ProductCard
                    photo={product.images[0]}
                    {...product}
                    key={product.id}
                />
            })
        }
    </>;
}
