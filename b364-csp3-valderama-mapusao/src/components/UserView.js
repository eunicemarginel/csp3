import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';

export default function UserView() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/')
            .then(response => response.json())
            .then(data => {
                // Filter out only the active products
                const activeProducts = data.filter(product => product.isActive);
                // Update the products state with active products
                setProducts(activeProducts);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <>
            <ProductSearch />
            {products.map(product => (
                <ProductCard productProp={product} key={product._id} />
            ))}
        </>
    );
}
