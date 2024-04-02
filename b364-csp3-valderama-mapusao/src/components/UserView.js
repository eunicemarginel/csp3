import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';


export default function UserView({productsData}) {

	const [products, setProducts] = useState([])

	useEffect(() => {
		if (productsData) {
			console.log(productsData);
	
			const productsArr = productsData.map(product => {
				//only render the active products
				if (product.isActive === true) {
					return (
						<ProductCard productProp={product} key={product._id}/>
					);
				} else {
					return null;
				}
			});
	
			setProducts(productsArr);
		}
	}, [productsData]);

	return(
		<>
			<ProductSearch/>
			{ products }
		</>
		)
}