import { CardGroup, Spinner } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';
import { useState, useEffect } from 'react';

export default function FeaturedProducts(){

    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            const shuffledProducts = shuffleArray(data.products);
            const featuredPreviews = shuffledProducts.map(product => (
                <PreviewProducts data={product} key={product._id} breakPoint={2} />
            ));
            setPreviews(featuredPreviews);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            setError(error);
            setLoading(false);
        });
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <h2 className="text-center">Featured Products</h2>
            <CardGroup className="justify-content-center">
                {previews}
            </CardGroup>	
        </>
    );
}


// import { CardGroup } from 'react-bootstrap';
// import PreviewProducts from './PreviewProducts';
// import { useState, useEffect } from 'react';

// export default function FeaturedProducts(){

//     const [previews, setPreviews] = useState([]);

//     useEffect(() => {
//         fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);

//             const shuffledProducts = shuffleArray(data.products);

//             const featuredPreviews = shuffledProducts.map(product => (
//                 <PreviewProducts data={product} key={product._id} breakPoint={2} />
//             ));

//             setPreviews(featuredPreviews);
//         })
//         .catch(error => {
//             console.error('Error fetching products:', error);
//         });
//     }, []);

//     const shuffleArray = (array) => {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//         return array;
//     };

//     return (
//         <>
//             <h2 className="text-center">Featured Products</h2>
//             <CardGroup className="justify-content-center">
//                 {previews}
//             </CardGroup>	
//         </>
//     );
// }