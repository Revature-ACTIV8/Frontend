import { useState } from "react";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const [editData, setEditData] = useState({ ...user });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "John Doe",
      street: "456 Business Ave",
      city: "Brooklyn",
      state: "NY",
      zip: "11201",
      isDefault: false,
    },
  ]);

  const handleSaveProfile = () => {
    setUser({ ...editData });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...user });
    setIsEditing(false);
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <div className="profile-header-inner">
          <h1>My Account</h1>
          <button className="back-button" onClick={() => navigate("/")}>← Back to Shop</button>
        </div>
      </header>

      <div className="profile-container">
        <div className="profile-grid">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-avatar">{user.avatar}</div>
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p className="email">{user.email}</p>

            {/* Add Order History Button to Nav to past orders page? */}
            <nav className="profile-nav">
              {["account", "addresses", "security"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${
                    activeTab === tab ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "account"
                    ? "Account Info"
                    : tab === "addresses"
                    ? "Addresses"
                    : "Security"}
                </button>
              ))}
            </nav>

            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </aside>

          {/* Main Content */}
          <div className="profile-main">
            {/* Account Info Tab */}
            {activeTab === "account" && (
              <section className="profile-section">
                <div className="section-header">
                  <h2>Account Information</h2>
                  {!isEditing ? (
                    <button
                      className="primary-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="action-buttons">
                      <button className="save-btn" onClick={handleSaveProfile}>
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="info-grid">
                  {["username", "email"].map((field) => (
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
                            })
                          }
                        />
                      ) : (
                        <p>{user[field]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <section className="profile-section">
                <div className="section-header">
                  <h2>Saved Addresses</h2>
                  <button className="primary-btn">+ Add New Address</button>
                </div>
                <div className="address-grid">
                  {addresses.map((address) => (
                    <div key={address.id} className="address-card">
                      {address.isDefault && (
                        <span className="default-badge">Default</span>
                      )}
                      <h3>{address.type}</h3>
                      <p>{address.name}</p>
                      <p>{address.street}</p>
                      <p>
                        {address.city}, {address.state} {address.zip}
                      </p>
                      <div className="address-actions">
                        <button>Edit</button>
                        {!address.isDefault && (
                          <button
                            onClick={() =>
                              handleSetDefaultAddress(address.id)
                            }
                          >
                            Set as Default
                          </button>
                        )}
                        <button className="delete-btn">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <section className="profile-section">
                <h2>Security Settings</h2>

                <div className="security-group">
                  <h3>Change Password</h3>
                  <label>Current Password</label>
                  <input type="password" placeholder="Current password" />
                  <label>New Password</label>
                  <input type="password" placeholder="New password" />
                  <label>Comfirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                  <button className="primary-btn">Update Password</button>
                </div>

                <div className="security-group">
                  <h3>Two-Factor Authentication</h3>
                  <div className="twofa-box">
                    <div>
                      <p>Enable 2FA</p>
                      <span>
                        Add an extra layer of security to your account
                      </span>
                    </div>
                    <button className="success-btn">Enable</button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;