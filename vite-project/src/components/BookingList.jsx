import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Table, Pagination, Spinner, Button, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BookingList = () => {
  const [bookingList, setBookingList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false); // For managing cancel button state
  const itemsPerPage = 10; // Define items per page here, or you can set it from context or props
  const { BookingList, cancelBooking } = useContext(AuthContext); // Assume cancelBooking function is provided by context

  useEffect(() => {
    fetchBookingDetails(currentPage, itemsPerPage);
  }, [BookingList, currentPage, itemsPerPage]);

  const fetchBookingDetails = async (page, limit) => {
    setLoading(true);
    try {
      const response = await BookingList({ page, limit }); // Pass page and limit to the API call
      setBookingList(response.bookingList);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (error) {
      console.error("Failed to fetch booking details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCancel = async (providerId, slotTime, bookingId) => {
    setCanceling(true);

    try {
      await cancelBooking({ providerId, slotTime, bookingId });
      // Optionally refresh the list after cancellation
      await fetchBookingDetails(currentPage, itemsPerPage);
    } catch (error) {
    } finally {
      setCanceling(false);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  const statusStyle = (status) => {
    switch (status) {
      case "Cancelled":
        return { color: "red", fontWeight: "bold" }; // Style for Cancelled status
      case "Booked":
        return { color: "green", fontWeight: "bold" }; // Style for Booked status
      default:
        return { color: "black" }; // Default style
    }
  };

  return (
    <div className="container mt-4">
      <h1>Booking List</h1>

      {bookingList.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Gas Provider</th>
                <th>Category</th>
                <th>Slot Time</th>
                <th>Status</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((item) => (
                <tr key={item._id}>
                  <td>{item.gasProvider.name}</td>
                  <td>{item.gasProvider.category}</td>
                  <td>{item.slotTime}</td>
                  <td style={statusStyle(item.status)}>{item.status}</td>

                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleCancel(
                          item.gasProvider._id,
                          item.slotTime,
                          item._id
                        )
                      }
                      disabled={canceling | (item.status === "Cancelled")}
                    >
                      {canceling ? "Cancelling..." : "Cancel"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <Pagination.Item
                key={pageNumber + 1}
                active={pageNumber + 1 === currentPage}
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                {pageNumber + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      ) : (
        <p>No booking details available.</p>
      )}
    </div>
  );
};

export default BookingList;
