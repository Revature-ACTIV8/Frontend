import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (isLogin) {
            //login
            try {
                const res = await fetch(`http://localhost:8080/user/email/${formData.email}`);

                if (!res.ok) {
                    // try to get plain text message if JSON fails
                    const text = await res.text();
                    throw new Error(text || "Login failed");
                }

                const user = await res.json(); // only parse JSON if OK

                if (user.password === formData.password) {
                    sessionStorage.setItem("user", JSON.stringify(user));
                    navigate("/");
                } else {
                    setMessage("Incorrect password.");
                }
            } catch (err) {
                
                console.error(err);
                setMessage(err.message || "Error logging in");
            }
        }
        else {
            //signup
            try {
                await axios.post("http://localhost:8080/user", formData);

                setMessage("Accout created sucessfully!");

                setIsLogin(true);
            }
            catch (err) {
                if (err.response) {
                    const data = err.response.data;
                    if (Array.isArray(data)) {
                        // unlikely, but safe
                        setMessage(data.join("\n"));
                    } else if (typeof data === "object") {
                        // Jakarta validation: multiple fields
                        setMessage(Object.values(data).join("\n"));
                    } else if (typeof data === "string") {
                        // Custom exceptions returning a plain string
                        setMessage(data);
                    } else {
                        setMessage("An unexpected error occurred.");
                    }

                    console.log("Error Response " + err);
                }
                else if (err.request) {
                    console.log(err);
                    setMessage(err.request);
                }
                else {
                    setMessage(err.message);
                }
            }
        }
    };

    return (
    <div className="App auth-page">
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
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
            <h2>{isLogin ? "Log In" : "Sign Up"}</h2>

            {!isLogin && (
                <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                />
            )}

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <button type="submit" className="auth-button">
                {isLogin ? "Log In" : "Sign Up"}
            </button>

            {message && <p className="auth-error-message">{message}</p>}

            <p className="auth-toggle">
                {isLogin ? (
                <>
                    Don’t have an account?{" "}
                    <span onClick={function click() { setIsLogin(false); setMessage("") }}>Sign Up</span>
                </>
                ) : (
                <>
                    Already have an account?{" "}
                    <span onClick={function click() { setIsLogin(true); setMessage("") }}>Log In</span>
                </>
                )}
            </p>
            </form>
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

export default AuthPage;
