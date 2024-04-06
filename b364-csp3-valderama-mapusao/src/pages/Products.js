import { useEffect, useState, useContext, useCallback } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';
import ProductCard from '../components/ProductCard';

export default function Products() {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);

    const fetchData = useCallback(() => {
        let fetchUrl = user.isAdmin
            ? "http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/all"
            : "http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/"

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (typeof data.message !== "string") {
                setProducts(data.products);
            } else {
                setProducts([]);
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    }, [user.isAdmin]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {user.isAdmin ? (
                <AdminView products={products} fetchData={fetchData} />
            ) : (
                <UserView products={products} />
            )}

        </>
    );
}
