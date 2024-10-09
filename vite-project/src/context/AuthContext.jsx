import React, { createContext, useState, useEffect, Children } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const baseUrl = "http://localhost:3000/api";

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${baseUrl}/user/sign-in`, {
        user: credentials,
      });
      const data = response.data.data;

      localStorage.setItem("token", data.token);
      console.log(data.token)
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (userDetails) => {
    try {
      const response = await axios.post(`${baseUrl}/user/sign-up`, {
        ...userDetails,
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const bookSlot = async (body) => {
    try {
      const response = await axios.post(
        `${baseUrl}/booking/create`,
        {
          ...body,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const BookingList = async (queryParams) => {
    try {
      const response = await axios.get(
        `${baseUrl}/booking/get?page=${queryParams?.page}&limit=${queryParams?.limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const cancelBooking = async (body) => {
    try {
      const response = await axios.post(
        `${baseUrl}/booking/cancel`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        registerUser,
        bookSlot,
        BookingList,
        cancelBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
