import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCart } from '../components/Cart';

export default function ProductView() {
    const { productId } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, [productId]);

    const order = async () => {
        const success = await addToCart(product);
        if (success) {
            Swal.fire({
                title: 'Success!',
                icon: 'success',
                text: 'Product added to cart'
            });
        } else {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to add product to cart'
            });
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {product.price}</Card.Text>
                            <Button variant="success" onClick={order}>Add to Cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
