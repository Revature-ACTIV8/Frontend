import { useState } from "react";
import "./AccountInfo.css";
import axios from "axios";

function AccountInfo() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({ ...user });

  const [message, setMessage] = useState("");

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.patch('http://localhost:8080/user', editData);

      sessionStorage.setItem("user", JSON.stringify(response.data));

      setMessage("User updated successfully!");
      setUser({ ...editData });
      setIsEditing(false);
    }
    catch (error) {
      if (error.response) {
        console.log("Error Response " + error);
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

  const handleCancelEdit = () => {
    setEditData({ ...user });
    setIsEditing(false);
  };

  return (
    <>
      <section className="profile-section">
        <div className="section-header">
          <h2>Account Information</h2>
          {!isEditing ? (
              <button className="primary-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <div className="action-buttons">
                <button className="save-btn" onClick={handleSaveProfile}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            )
          }
        </div>
        <div className="info-grid"> {
          ["username", "email"].map((field) => (
            <div key={field} className="info-field">
              <label>
                {field === "username"
                ? "Username"
                : "Email"}
              </label>
              {isEditing ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  value={editData[field]}
                  onChange={(e) =>
                  setEditData({
                  ...editData,
                  [field]: e.target.value,
                  })}
                />
                ) : (
                <p>{user[field]}</p>
              )}
            </div>
          ))
        }
        </div>
        {message && <p>{message}</p>}
      </section>
    </>
  );
}

export default AccountInfo;