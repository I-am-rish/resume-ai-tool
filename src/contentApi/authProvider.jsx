import React, { createContext, useState, useEffect, useContext } from "react";

// Create the Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (token, userData) => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  // Permission checking function
  const hasPermission = (permission) => {
    if (!user) return false;
    return user[permission] === 1;
  };

  // Permission checking for menu items
  const canAccessMenuItem = (menuItemName) => {
    // Map menu names to required permissions
    const permissionMap = {
      'users': 'can_manage_users',
      'students': 'can_manage_students',
      'schools': 'can_manage_schools',
      'contents': 'can_access_site_map',
      'products': 'can_manage_products',
      'packages': 'can_manage_packages',
      'categories': 'can_manage_categories',
      'orders': 'can_manage_orders',
      'payments': 'can_manage_payments',
      'reports': 'can_use_report_builder'
    };
    
    const requiredPermission = permissionMap[menuItemName.toLowerCase()];
    if (!requiredPermission) return true; // If no permission mapping, allow access
    
    return hasPermission(requiredPermission);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasPermission,
    canAccessMenuItem
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;