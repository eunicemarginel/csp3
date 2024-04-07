import React, { createContext, useContext, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

// Creating a context for managing cart items
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// CartProvider component to manage cart state and provide context
export const CartProvider = ({ children }) => {
    // State to manage cart items
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch cart items from the database
    useEffect(() => {
        const fetchCartItems = () => {
            fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/carts/user-cart', {
                method: 'GET', // Adding the GET method
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                return response.json();
            })
            .then(data => {
                setCartItems(data.cartItems);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
        };
    
        fetchCartItems();
    }, []);

    // Function to add a product to the cart
    // Function to add a product to the cart
    const addToCart = async (product) => {
        try {
            // Make a POST request to add the product to the cart in the database
            const response = await fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/carts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                bbody: JSON.stringify(product)
            });
            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }
            // Fetch updated cart items from the server using GET method
            const updatedCartResponse = await fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/carts/user-cart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!updatedCartResponse.ok) {
                throw new Error('Failed to fetch updated cart items');
            }
            const updatedCartData = await updatedCartResponse.json();
            console.log('Updated cart items:', updatedCartData.cartItems); // Log the updated cart items
            // Update the cart items state with the updated data
            setCartItems(updatedCartData.cartItems);
            return true; // Return true to indicate successful addition to cart
        } catch (error) {
            console.error('Error adding product to cart:', error);
            return false; // Return false to indicate failure to add to cart
        }
    };


    // Function to remove a product from the cart
    const removeFromCart = (productId) => {
        return fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/carts/${productId}/remove-from-cart`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to remove product from cart');
            }
            setCartItems(cartItems.filter(item => item.id !== productId));
        })
        .catch(error => {
            console.error('Error removing product from cart:', error);
        });
    };

    // Function to clear all items from the cart
    const clearCart = () => {
        return fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/carts/clear-cart', {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }
            setCartItems([]);
        })
        .catch(error => {
            console.error('Error clearing cart:', error);
        });
    };

    // Provide the cart state and functions to the context
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {loading ? <p>Loading...</p> : children}
        </CartContext.Provider>
    );
};

// Cart component to display the cart items
const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    const handleClearCart = () => {
        clearCart();
    };

    return (
        <>
            <h1 className="text-center my-4">Shopping Cart</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="text-center">
                <Button variant="danger" onClick={handleClearCart}>Clear Cart</Button>
            </div>
        </>
    );
};

export default Cart;