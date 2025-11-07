import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceHolderImage from '../assets/images/common/Placeholder.png';
import { searchProducts, getProductById } from "../api/woocommerce";

const useQuery = () => new URLSearchParams(useLocation().search);

const Search = () => {
  const query = useQuery();
  const searchTerm = query.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        let data;
        if (!isNaN(searchTerm)) {
          const product = await getProductById(searchTerm);
          data = product ? [product] : [];
        } else {
          data = await searchProducts(searchTerm);
        }
        setResults(data || []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  const handleRedirect = (slug) => {
    navigate(`/product/${slug}`);
  };

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 20px", minHeight: "60vh" }}>
      <h2 style={{ marginBottom: "25px", fontSize: "22px", color: "#ff6804" }}>
        Search results for: <span style={{ fontWeight: "bold", color: "#064789" }}>"{searchTerm}"</span>
      </h2>

      {loading && <p style={{ fontStyle: "italic" }}>Loading...</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "20px",
      }}>
        {results.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
              borderRadius: "14px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
              overflow: "hidden",
            }}
            onClick={() => handleRedirect(item.slug)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
            }}
          >
            <div style={{
              width: "100%",
              height: "160px",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}>
              <img
                src={item.images?.[0]?.src || PlaceHolderImage}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: item.images?.[0]?.src ? "cover" : "contain",
                  opacity: item.images?.[0]?.src ? 1 : 0.7,
                  transition: "transform 0.3s",
                }}
              />
            </div>

            <div style={{ padding: "12px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <p style={{ fontSize: "14px", fontWeight: "500", color: "#333", margin: "5px 0" }}>
                {truncateText(item.name, 30)}
              </p>

              {item.price_html && (
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#28a745", // green price
                    margin: "5px 0",
                  }}
                  dangerouslySetInnerHTML={{ __html: item.price_html }}
                />
              )}

              <button
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#28a745", // green button
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "13px",
                  marginTop: "10px",
                  boxShadow: "0 4px 12px rgba(40,167,69,0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#45c466";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(40,167,69,0.5)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#28a745";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(40,167,69,0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
