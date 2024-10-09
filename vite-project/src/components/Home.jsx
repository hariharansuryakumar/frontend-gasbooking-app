import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";

function Home() {
  const baseUrl = "https://backend-gasbooking-app.onrender.com/api";
  const navigate = useNavigate();

  // State to store the fetched data and loading state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Define the function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/gas-provider/get`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header
          },
        }); // Replace with your API URL
        setData(response?.data?.providers); // Update state with the fetched data
        setLoading(false); // Update loading state
      } catch (err) {
        setError("Failed to fetch data"); // Set error message
        setLoading(false); // Update loading state
      }
    };

    fetchData(); // Call the function
  }, []); // Empty dependency array means this effect runs once on mount

  const goToBooking = (bookingData) => {
    navigate("/booking", { state: { bookingData } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Container>
      <div
        className="mt-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "300px",
          }}
        />
      </div>

      <div className="row g-3 p-2">
        {data.map((item) => (
          <Card className="col-md-3 m-3 bs">
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.category}
              </Card.Subtitle>
              <Card.Text>
                <LocationOnIcon />
                {item.location}
              </Card.Text>
              <Card.Text>
                <CallIcon />
                {item.contact}
              </Card.Text>

              <button
                className="mr-auto btn btn-dark"
                onClick={() => goToBooking(item)}
              >
                Book
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default Home;
