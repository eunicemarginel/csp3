import { CardGroup } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';
import { useState, useEffect } from 'react';

export default function FeaturedProducts(){

    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            const shuffledProducts = shuffleArray(data.products);

            const featuredPreviews = shuffledProducts.map(product => (
                <PreviewProducts data={product} key={product._id} breakPoint={2} />
            ));

            setPreviews(featuredPreviews);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <>
            <h2 className="text-center">Featured Products</h2>
            <CardGroup className="justify-content-center">
                {previews}
            </CardGroup>	
        </>
    );
}