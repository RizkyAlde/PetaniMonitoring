"use client";

import { NextUIProvider } from "@nextui-org/react";
import { createContext, useState, useEffect } from "react";

// Inisialisasi UserContext
const UserContext = createContext({});

// Fungsi Providers untuk membungkus aplikasi dengan context
export default function Providers({ children }) {
  const [loggedUser, setLoggedUser] = useState({
    name: "",
    greenHouse: "",
  });

  useEffect(() => {
    // Ambil data pengguna dari localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    // Pengecekan null atau undefined pada userData dan userData.farmer
    if (userData && Array.isArray(userData.farmer) && userData.farmer.length > 0) {
      const { id_gh, name } = userData.farmer[0];
      setLoggedUser({
        name: name,
        greenHouse: `Green House ${id_gh}`,
      });
    } else {
      console.warn("User data or farmer data is missing.");
    }
  }, []);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <NextUIProvider>{children}</NextUIProvider>
    </UserContext.Provider>
  );
}

export { UserContext };
