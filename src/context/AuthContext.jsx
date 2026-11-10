
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

// Safely read data from localStorage
const getStoredData = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return fallback;
  }
};

export function AuthProvider({ children }) {
  // Logged-in user
  const [user, setUser] = useState(() =>
    getStoredData("drivenow_user", null)
  );

  // Registered users
  const [users, setUsers] = useState(() =>
    getStoredData("drivenow_users", [])
  );

  // All bookings
  const [bookings, setBookings] = useState(() =>
    getStoredData("drivenow_bookings", [])
  );

  // Save user whenever login status changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "drivenow_user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("drivenow_user");
    }
  }, [user]);

  // Save registered users
  useEffect(() => {
    localStorage.setItem(
      "drivenow_users",
      JSON.stringify(users)
    );
  }, [users]);

  // Save bookings
  useEffect(() => {
    localStorage.setItem(
      "drivenow_bookings",
      JSON.stringify(bookings)
    );
  }, [bookings]);

  // LOGIN
  const login = (email, password) => {
    const foundUser = users.find(
      (item) =>
        item.email?.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    setUser({
      name: foundUser.name,
      email: foundUser.email,
    });

    return { success: true };
  };

  // REGISTER
  const register = (name, email, password) => {
    const exists = users.some(
      (item) =>
        item.email?.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      return {
        success: false,
        message: "Email already registered.",
      };
    }

    const newUser = {
      name,
      email,
      password,
    };

    setUsers((previousUsers) => [
      ...previousUsers,
      newUser,
    ]);

    setUser({
      name,
      email,
    });

    return { success: true };
  };

  // ADD BOOKING
  const addBooking = (booking) => {
    if (!user) {
      throw new Error(
        "Please login before saving your booking."
      );
    }

    if (!booking) {
      throw new Error("Booking details are missing.");
    }

    const newBooking = {
      ...booking,
      id: Date.now(),
      userEmail: user.email,
      status: "Confirmed",
    };

    setBookings((previousBookings) => [
      ...previousBookings,
      newBooking,
    ]);

    return newBooking;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
  };

  // CURRENT USER BOOKINGS
  const userBookings = bookings.filter(
    (booking) =>
      booking.userEmail?.toLowerCase() ===
      user?.email?.toLowerCase()
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        bookings: userBookings,
        login,
        register,
        logout,
        addBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM AUTH HOOK
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
}
