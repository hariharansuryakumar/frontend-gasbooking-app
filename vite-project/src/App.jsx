import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menubar from "./components/Menubar";
import { AuthProvider } from "./context/AuthContext";
import Booking from "./components/Booking";
import BookingList from "./components/BookingList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route path="/home" exact Component={Home} />
          <Route path="/" exact Component={Login} />
          <Route path="/Register" exact Component={Register} />{" "}
          <Route path="/booking" exact Component={Booking} />
          <Route path="/booking-list" exact Component={BookingList} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
