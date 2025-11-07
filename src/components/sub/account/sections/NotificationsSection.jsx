import React, { useEffect, useState } from "react";
import axios from "axios";

const notificationTitles = {
  promotions: "Promotions",
  order_updates: "Order updates",
  chat_messages: "Chat messages",
  customers_activity: "Customers' activity",
  avatar_username_sharing: "Avatar and username sharing",
};

const notificationDescriptions = {
  promotions:
    "Be the first to learn about promotions, daily deals, and other exclusive savings.",
  order_updates: "Receive notifications about order confirmations and shipment updates.",
  chat_messages: "Never miss important messages from merchandise partners.",
  customers_activity: "Keep up with the latest shopping trends.",
  avatar_username_sharing:
    "Share your user profile avatar and username with other users when you add a product to cart, purchase a product, or participate in a promotion and event, but it won’t affect your reviews for product.",
};

const NotificationsSection = ({ userId, token }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch current settings
  useEffect(() => {
    if (!userId || !token) return;
    setLoading(true);
    setError(null);

    axios
      .get(`https://db.store1920.com/wp-json/custom/v1/notifications/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSettings(res.data);
      })
      .catch(() => {
        setError("Failed to load notification settings");
        setSettings(null);
      })
      .finally(() => setLoading(false));
  }, [userId, token]);

  const startEditing = (key) => {
    setEditingKey(key);
    setEditValue(settings[key] === "On" || settings[key] === true);
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setEditValue(false);
  };

  const saveEdit = async () => {
    if (!editingKey) return;
    setSaving(true);
    setError(null);

    try {
      const updatedValue = editValue ? "On" : "Off";
      const payload = { ...settings, [editingKey]: updatedValue };

      await axios.put(
        `https://db.store1920.com/wp-json/custom/v1/notifications/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSettings(payload);
      setEditingKey(null);
    } catch (err) {
      setError("Failed to save notification settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
        Loading notifications...
      </div>
    );
  if (error)
    return (
      <div
        style={{
          padding: 20,
          fontFamily: "Arial, sans-serif",
          color: "red",
          fontWeight: "bold",
        }}
      >
        {error}
      </div>
    );
  if (!settings) return null;

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "20px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "0 1rem",
      }}
    >
      {/* Info banner */}
      <div
        style={{
          backgroundColor: "#e6f4ea",
          border: "1px solid #b5d6b6",
          borderRadius: 6,
          padding: "12px 16px",
          color: "#2f6627",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          fontWeight: "600",
          fontSize: 14,
          userSelect: "none",
        }}
      >
        <span
          style={{
            marginRight: 8,
            fontWeight: "bold",
            fontSize: 18,
            lineHeight: 1,
            color: "#2f6627",
          }}
          aria-hidden="true"
        >
          ✔
        </span>
        Store1920 does not ask customers for additional fees via SMS or email.
      </div>

      {/* Notification items */}
      {Object.keys(notificationTitles).map((key) => (
        <div
          key={key}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 20,
            marginBottom: 20,
            boxShadow: "0 2px 6px rgb(0 0 0 / 0.07)",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: "70%" }}>
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: 18,
                fontWeight: "700",
                color: "#222",
              }}
            >
              {notificationTitles[key]}
            </h3>
            <p style={{ margin: "0 0 12px", color: "#555", fontSize: 14 }}>
              {notificationDescriptions[key]}
            </p>

            {!editingKey || editingKey !== key ? (
              <p
                style={{
                  margin: 0,
                  fontWeight: "600",
                  color: settings[key] === "On" ? "#2f6627" : "#666",
                  userSelect: "none",
                }}
              >
                Status: {settings[key] || "Off"}
              </p>
            ) : (
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: 14,
                  userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={editValue}
                  onChange={(e) => setEditValue(e.target.checked)}
                  style={{ marginRight: 10, width: 18, height: 18, cursor: "pointer" }}
                  aria-label={`Toggle ${notificationTitles[key]}`}
                />
                {editValue ? "On" : "Off"}
              </label>
            )}
          </div>

          <div style={{ minWidth: 120, textAlign: "right" }}>
            {!editingKey || editingKey !== key ? (
              <button
                onClick={() => startEditing(key)}
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 14px",
                  fontSize: 14,
                  fontWeight: "600",
                  color: "white",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                aria-label={`Edit ${notificationTitles[key]}`}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={saveEdit}
                  disabled={saving}
                  style={{
                    backgroundColor: "#28a745",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 14px",
                    fontSize: 14,
                    fontWeight: "600",
                    color: "white",
                    cursor: saving ? "wait" : "pointer",
                    userSelect: "none",
                    marginRight: 10,
                  }}
                  aria-label={`Save ${notificationTitles[key]}`}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={cancelEditing}
                  disabled={saving}
                  style={{
                    backgroundColor: "#6c757d",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 14px",
                    fontSize: 14,
                    fontWeight: "600",
                    color: "white",
                    cursor: saving ? "wait" : "pointer",
                    userSelect: "none",
                  }}
                  aria-label={`Cancel editing ${notificationTitles[key]}`}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsSection;
