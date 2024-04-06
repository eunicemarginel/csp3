import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function EditProduct({ product, fetchData }) {
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (productId) => {
		fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/${productId}`)
			.then(res => {
				if (!res.ok) {
					throw new Error('Failed to fetch product data');
				}
				return res.json();
			})
			.then(data => {
				if (data && data._id) {
					console.log("Data: ", data);
					const { _id, name, description, price } = data;
					setProductId(_id);
					setName(name);
					setDescription(description);
					setPrice(price);
					setShowEdit(true);
				} else {
					console.error('Product data not found or invalid:', data);
				}
			})
			.catch(error => {
				console.error('Error fetching product data:', error);
				// Handle the error, such as displaying an error message to the user
			});
	};	
	
    const closeEdit = () => {
        setShowEdit(false);
        setName('');
        setDescription('');
        setPrice(0);
    };

    const editProduct = (e, productId) => {
        e.preventDefault();

        fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/${productId}/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
            .then(res => res.json())
            .then(data => {
				console.log(data)

                if(data.message === "Course updated successfully") {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Product updated successfully'
                    });
                    closeEdit();
                    fetchData(); 

                } else {
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        text: 'Failed to update product. Please try again'
                    });
                    closeEdit();
                }
            })
            .catch(error => {
                console.error('Error updating product:', error);
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Failed to update product. Please try again'
                });
                closeEdit();
				fetchData(); 
            });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => openEdit(product)}>Edit</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
