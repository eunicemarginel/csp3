import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';

export default function UserView({ products }) {
    const [renderedProducts, setRenderedProducts] = useState([]);

    useEffect(() => {
        if (products && Array.isArray(products)) {
            const activeProducts = products.filter(product => product.isActive);
            const productCards = activeProducts.map(product => (
                <ProductCard productProp={product} key={product._id} />
            ));
            setRenderedProducts(productCards);
        }
    }, [products]);

    return (
        <>
            <ProductSearch />
            {renderedProducts}
        </>
    );
}
