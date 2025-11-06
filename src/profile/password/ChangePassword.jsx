import { useState } from "react";
import "./ChangePassword.css"
import axios from "axios";

function ChangePassword() {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

    const [passwords, setPasswords] = useState({
        user: user,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            await axios.patch('http://localhost:8080/user/password', passwords);

            setMessage("Password updated successfully!");
            setPasswords({
                user: user,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
             });
        }
        catch (error) {
            if (error.response) {
                console.log("Error Response " + error);
                console.log("Error Response Data " + error.response.data);

                if (error.response.data)
                {
                    setMessage(error.response.data);
                }
            }
            else if (error.request) {
                console.log(error.request);
                setMessage(error.request);
            }
            else {
                setMessage(error.message);
            }
        }
    };

    return (
        <>
            <form className="password-group" onSubmit={handleSumbit}>
                <h3>Change Password</h3>
                <label>Current Password</label>
                <input
                    type="password"
                    name="currentPassword"
                    onChange={handleChange}
                    placeholder="Current password"
                    value={passwords.currentPassword}
                    required
                />
                <label>New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                    placeholder="New password"
                    value={passwords.newPassword}
                    required
                />
                <label>Comfirm New Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    value={passwords.confirmPassword}
                    required
                />
                <button type="submit">Update Password</button>
                {message && <p>{message}</p> }
            </form>
        </>
    );
}

export default ChangePassword;