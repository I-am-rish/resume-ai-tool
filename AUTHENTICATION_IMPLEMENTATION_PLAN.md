# Authentication and Permission Implementation Plan

## Overview
This document outlines the implementation plan for adding a complete authentication and permission system to the Duralux Admin Dashboard. The system will store user data with permissions in localStorage after login and use this data to control access to pages and components throughout the application.

## Current State Analysis
1. Login form exists but only stores the JWT token
2. User management components show extensive permission fields
3. No authentication context or provider exists
4. No route protection or permission checking is implemented

## Implementation Steps

### 1. Create Authentication Provider
Create `src/contentApi/authProvider.jsx` with:
- AuthContext for managing authentication state
- User state to store user data with permissions
- Login function that stores both token and user data
- Logout function that clears authentication data
- isAuthenticated state
- hasPermission function to check user permissions

### 2. Modify Login Process
Update `src/components/authentication/LoginForm.jsx` to:
- Store user data along with the token in localStorage
- Call auth context login function

### 3. Update App Structure
Modify `src/App.jsx` to:
- Include AuthProvider in the component tree
- Place it above RouterProvider

### 4. Create Protected Route Component
Create `src/components/ProtectedRoute.jsx` with:
- Permission checking logic
- Redirect for unauthorized access

### 5. Update Router Configuration
Modify `src/route/router.jsx` to:
- Wrap protected routes with ProtectedRoute component
- Specify required permissions for each route

### 6. Update Menu System
Modify `src/components/shared/navigationMenu/Menus.jsx` to:
- Filter menu items based on user permissions

### 7. Add Component-Level Permission Checks
Create `src/hooks/usePermission.js` with:
- Hook for checking permissions in components
- Utility functions for permission checking

## Detailed Implementation

### 1. Authentication Provider (src/contentApi/authProvider.jsx)

```jsx
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
    return user[permission] === true;
  };

  // Permission checking for menu items
  const canAccessMenuItem = (menuItem) => {
    // Map menu items to required permissions
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
    
    const requiredPermission = permissionMap[menuItem];
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
```

### 2. Update Login Form (src/components/authentication/LoginForm.jsx)

```jsx
// In the handleLogin function, after successful login:
.then((res) => {
  console.log(res);
  localStorage.setItem("token", JSON.stringify(res.data.data.token));
  localStorage.setItem("user", JSON.stringify(res.data.data.user)); // Store user data
  // Call auth context login function
  // enqueueSnackbar("Login success", { variant: "success" });
})
```

### 3. Update App Structure (src/App.jsx)

```jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/router";
import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import NavigationProvider from "./contentApi/navigationProvider";
import SideBarToggleProvider from "./contentApi/sideBarToggleProvider";
import AuthProvider from "./contentApi/authProvider"; // Add this import
import ThemeCustomizer from "./components/shared/ThemeCustomizer";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <AuthProvider> {/* Wrap with AuthProvider */}
          <NavigationProvider>
            <SideBarToggleProvider>
              <RouterProvider router={router} />
            </SideBarToggleProvider>
          </NavigationProvider>
        </AuthProvider>
        {/* <ThemeCustomizer /> */}
      </SnackbarProvider>
    </>
  );
};

export default App;
```

### 4. Create Protected Route Component (src/components/ProtectedRoute.jsx)

```jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contentApi/authProvider';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { isAuthenticated, hasPermission, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/authentication/login" replace />;
  }
  
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
```

### 5. Update Router Configuration (src/route/router.jsx)

```jsx
// Add import
import ProtectedRoute from '../components/ProtectedRoute';

// Wrap protected routes:
{
  path: "/users/manage-users",
  element: (
    <ProtectedRoute requiredPermission="can_manage_users">
      <UserList />
    </ProtectedRoute>
  ),
},
{
  path: "/students/manage-students",
  element: (
    <ProtectedRoute requiredPermission="can_manage_students">
      <StudentList />
    </ProtectedRoute>
  ),
},
// ... and so on for all protected routes
```

### 6. Update Menu System (src/components/shared/navigationMenu/Menus.jsx)

```jsx
// Add import
import { useAuth } from '../../../contentApi/authProvider';

const Menus = () => {
  const { canAccessMenuItem } = useAuth();
  
  // Filter menu items based on permissions
  const filteredMenuList = menuList.filter(menuItem => {
    return canAccessMenuItem(menuItem.name.toLowerCase());
  });
  
  // Use filteredMenuList instead of menuList in the render
  // ...
};
```

### 7. Create Permission Hook (src/hooks/usePermission.js)

```jsx
import { useAuth } from '../contentApi/authProvider';

export const usePermission = () => {
  const { hasPermission } = useAuth();
  
  return { hasPermission };
};
```

## Usage Examples

### In Components
```jsx
import { usePermission } from '../hooks/usePermission';

const MyComponent = () => {
  const { hasPermission } = usePermission();
  
  if (!hasPermission('can_manage_users')) {
    return <div>You don't have permission to view this content</div>;
  }
  
  return <div>Protected content</div>;
};
```

### In Routes
```jsx
{
  path: "/users/manage-users",
  element: (
    <ProtectedRoute requiredPermission="can_manage_users">
      <UserList />
    </ProtectedRoute>
  ),
}
```

## Benefits of This Implementation

1. **Centralized Authentication**: All auth logic is in one place
2. **Persistent Login**: User stays logged in after page refresh
3. **Granular Permissions**: Fine-grained control over access
4. **Easy to Extend**: Simple to add new permissions
5. **Secure**: Both frontend and backend should validate permissions
6. **User Experience**: Menu items and routes are filtered based on permissions

## Security Considerations

1. **Backend Validation**: Always validate permissions on the server side as well
2. **Token Expiration**: Handle token expiration and refresh
3. **Sensitive Data**: Never store sensitive data in localStorage
4. **HTTPS**: Ensure all communication is over HTTPS