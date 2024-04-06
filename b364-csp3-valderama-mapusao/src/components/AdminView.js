import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';

export default function AdminView({ fetchData }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
		// Fetch product data from the server
		fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/all`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in local storage
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to fetch product data');
				}
				return response.json();
			})
			.then(data => {
				console.log("Data: ", data);
				// Check if data is an object with a 'products' property containing an array
				if (data.products && Array.isArray(data.products)) {
					const productsArr = data.products.map(product => (
						<tr key={product._id}>
							<td>{product._id}</td>
							<td>{product.name}</td>
							<td>{product.description}</td>
							<td>{product.price}</td>
							<td className={product.isActive ? "text-success" : "text-danger"}>
								{product.isActive ? "Available" : "Unavailable"}
							</td>
							<td><EditProduct product={product._id} /></td>
							<td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData} /></td>
						</tr>
					));
					setProducts(productsArr);
				} else {
					console.error('Data does not contain a products array:', data);
				}
			})
			.catch(error => {
				console.error('Error fetching product data:', error);
				// Handle the error, such as showing an error message to the user
			});
	}, [fetchData]);		
	

    return (
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
            </Table>
        </>
    );
}
