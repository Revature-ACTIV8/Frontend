import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function CartsPage() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const customerId = user?.id;

    useEffect(() => {
        async function fetchCart() {
            try {
            const response = await fetch(`http://localhost:8080/carts/customer/${customerId}`);

            if (response.status === 404) {
                setCart(null);
                console.warn("No cart found for this customer");
                return;
            }

            if (!response.ok) throw new Error("Failed to fetch cart");

            const data = await response.json();

            if (!data.cartItems) {
                data.cartItems = [];
            }

            setCart(data);
            } catch (err) {
            console.error("Error fetching cart:", err);
            setCart(null);
            } finally {
            setLoading(false);
            }
        }

    if (customerId) fetchCart();
    }, [customerId]);

    const total = cart?.cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

    const createEmptyOrder = async () => {
        const response = await fetch(`http://localhost:8080/orders/createEmpty/${customerId}`, {
            method: "POST",
        });

        if (response.ok) {
            const newOrder = await response.json();
            console.log("Created empty order:", newOrder);
            return newOrder.orderId;
        } else {
            throw new Error("Failed to create order");
        }
    };

    return (
        <div className="App carts-page">
        <nav className="navbar">
            <div className="nav-left">
            <div className="logo">
                <img
                src="https://res.cloudinary.com/dz8avfbml/image/upload/v1760469987/LogoTransparent2_lvh03b.png"
                alt="ACTIV8 Logo"
                />
            </div>
            <div className="nav-links">
                <a href="#new">New In</a>
                <a href="#women">Women</a>
                <a href="#men">Men</a>
            </div>
            </div>
            <div className="nav-right">
            <button
                className="profile-button"
                onClick={() => {
                const user = sessionStorage.getItem("user");
                if (user) navigate("/profile");
                else navigate("/auth");
                }}
                title="profile / login"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </button>
            <button className="icon-button cart-button" 
            onClick={() => {
                const user = sessionStorage.getItem("user");
                if (user) navigate("/cart");
                else navigate("/auth");
                }}
                title="cart / login"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </button>
            </div>
        </nav>

        <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>
            {loading ? (
                <p>Loading your cart...</p>
            ) : !cart || cart.cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-table">
                <table className="cart-table-inner">
                    <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.cartItems.map((item) => (
                        <tr key={item.cartItemId}>
                        <td>{item.productId}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="cart-footer">
                    <h3>Total: ${total.toFixed(2)}</h3>
                    <button onClick={createEmptyOrder} className="checkout-btn">
                    Proceed to Checkout
                    </button>
                </div>
                </div>
            )}
            </div>


        <footer className="footer">
            <div className="footer-container">
            <div className="footer-left">
                <h3>ACTIV8</h3>
                <p>by FYK</p>
            </div>
            <div className="footer-center">
                <ul className="footer-links">
                <li><a onClick={() => {navigate("/");}}>Home</a></li>
                <li><a href="#">Search</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                </ul>
            </div>
            <div className="footer-right">
                <p>&copy; 2025 Min, Chris, and Hasan, No rights reserved.</p>
            </div>
            </div>
        </footer>
        </div>
    );
}

export default CartsPage;