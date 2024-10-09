import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

const Booking = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location?.state?.bookingData || {};
  const { bookSlot } = useContext(AuthContext);
  const [amt] = useState(750);

  const onToken = async () => {
    try {
      if (!selectedSlot) return;
      const bodyData = {
        providerId: bookingDetails._id,
        slotTime: selectedSlot.time,
      };
      await bookSlot(bodyData);
      alert("Payment & Booking were Successful!");
      navigate("/booking-list");
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const setSelectedSlotDetails = (slotId) => {
    const slotDetails = bookingDetails?.availableSlots?.find(
      (f) => f._id == slotId
    );

    setSelectedSlot(slotDetails);
  };

  return (
    <div className="container mt-5">
      <h1>{bookingDetails?.name}</h1>
      <br />
      <h1>Hi Gasuser, please select your slot to book a gas</h1>
      <br/>
      <select
        className="w-50"
        onChange={(e) => setSelectedSlotDetails(e.target.value)}
      >
        <option value="">Select a Slot</option>
        {bookingDetails?.availableSlots.map((slot) => (
          <option key={slot._id} value={slot._id}>
            {slot.time}
          </option>
        ))}
      </select>
      {selectedSlot !== null &&
        (selectedSlot.slots ? (
          <div>
            <br />
            <h3>Available Slots : {selectedSlot.slots}</h3>
            <br />
            <StripeCheckout
              amount={amt * 100}
              token={onToken}
              currency="INR"
              stripeKey="pk_test_51Q5XoaJAO64dY8660Tbny4qouPYQh1MLaRgizoQCoG52Ej9G66757tIYsz1J6IG5HITByjxNpedr9sD7H236l1rm00k2hBCsJI"
            >
              <button className="mr-auto btn btn-dark">Pay Now</button>
            </StripeCheckout>
          </div>
        ) : (
          <h3>No Slots available</h3>
        ))}
    </div>
  );
};

export default Booking;
