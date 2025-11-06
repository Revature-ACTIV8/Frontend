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
                    console.log("Error Response " + err);
                    setMessage(err.response.data.join("\n"))
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
                <a href="/">Home</a>
                <a href="/search">Search</a>
                <a href="#men">Men</a>
                <a href="#women">Women</a>
            </div>
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
                <li><a href="/">Home</a></li>
                <li><a href="/search">Search</a></li>
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
