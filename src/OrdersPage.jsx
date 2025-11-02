// src/pages/OrderHistoryPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const customerId = user?.userId;

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`http://localhost:8080/order/customer/${customerId}`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [customerId]);

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading order history...</p>;

  return (
    <div className="App orders-page">
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

        <div className="orders-container">
            <h1 className="orders-title">Order History</h1>
            {orders.length === 0 ? (
                <p className="orders-empty">No orders found.</p>
            ) : (
                <div className="orders-list">
                {orders.map((order) => (
                    <div key={order.orderId} className="order-card">
                    <div className="order-header">
                        <div>
                        <h2 className="order-id">Order #{order.orderId}</h2>
                        <p className="order-detail">
                            Date: {new Date(order.orderDate).toLocaleString()}
                        </p>
                        <p className="order-detail">Status: {order.orderStatus}</p>
                        </div>
                        <h3 className="order-amount">${order.orderAmount.toFixed(2)}</h3>
                    </div>

                    <div className="order-items">
                        <h4 className="order-items-title">
                        Items ({order.orderItems.length})
                        </h4>
                        <table className="order-items-table">
                        <thead>
                            <tr>
                            <th>Product ID</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItems.map((item) => (
                            <tr key={item.orderItemId}>
                                <td>{item.productId}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price.toFixed(2)}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    </div>  

  );
}
