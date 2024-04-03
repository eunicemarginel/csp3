import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import ProductCard from './ProductCard'; // Import ProductCard component

export default function AdminView({ products, fetchData }) {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>
            {toggle === false ? (
                <Table striped bordered hover responsive>
                    <thead className="bg-secondary text-white">
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
                        {products.map(product => (
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
                                <td><ProductCard productProp={product} /></td> {/* Render ProductCard component here */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : null}
        </>
    );
}
