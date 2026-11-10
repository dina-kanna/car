
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

// Safely read localStorage
const getStoredData = (key, fallback) => {
  try {
    if (typeof window === "undefined") return fallback;

    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return fallback;
  }
};

// Safely save localStorage
const saveStoredData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

export function AuthProvider({ children }) {
  // Current logged-in user
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

  // Save logged-in user
  useEffect(() => {
    if (user) {
      saveStoredData("drivenow_user", user);
    } else {
      localStorage.removeItem("drivenow_user");
    }
  }, [user]);

  // Save registered users
  useEffect(() => {
    saveStoredData("drivenow_users", users);
  }, [users]);

  // Save bookings
  useEffect(() => {
    saveStoredData("drivenow_bookings", bookings);
  }, [bookings]);

  // LOGIN
  const login = (email, password) => {
    const foundUser = users.find(
      (item) =>
        item.email?.toLowerCase() === email.trim().toLowerCase() &&
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

    return {
      success: true,
      message: "Login successful!",
    };
  };

  // REGISTER
  const register = (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    const exists = users.some(
      (item) =>
        item.email?.toLowerCase() === normalizedEmail
    );

    if (exists) {
      return {
        success: false,
        message: "Email already registered.",
      };
    }

    const newUser = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    setUsers((previousUsers) => [
      ...previousUsers,
      newUser,
    ]);

    setUser({
      name: newUser.name,
      email: newUser.email,
    });

    return {
      success: true,
      message: "Registration successful!",
    };
  };

  // ADD BOOKING
  const addBooking = (booking) => {
    if (!user) {
      return {
        success: false,
        message: "Please login before booking.",
      };
    }

    if (!booking) {
      return {
        success: false,
        message: "Booking details are missing.",
      };
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

    return {
      success: true,
      booking: newBooking,
    };
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

  if (context === null) {
    throw new Error(
      "useAuth must be used inside an AuthProvider. Wrap your App with AuthProvider."
    );
  }

  return context;
}
