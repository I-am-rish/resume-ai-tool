# User Permissions Implementation Guide

## Overview
This guide explains how to implement a complete user permissions system for the Duralux Admin Dashboard. The system will use user data retrieved during login to control access to pages, components, and menu items throughout the application.

## Current Implementation Status
The application currently has:
1. User management components with extensive permission fields
2. Login form that retrieves a token but doesn't store user permission data
3. No authentication context or permission checking system

## Implementation Plan

### 1. Authentication Provider
Create an authentication context provider to manage user state and permissions:

**File: src/contentApi/authProvider.jsx**

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

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasPermission
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

### 2. Update Login Process
Modify the login form to store user data along with the token:

**File: src/components/authentication/LoginForm.jsx**

```jsx
// In the handleLogin function:
const handleLogin = () => {
  console.log("login data => ", formData);
  setLoading(true); // start loader
  httpClient
    .post("auth/login", formData)
    .then((res) => {
      console.log(res);
      // Store both token and user data
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.data.user || res.data.data.userData));
      // If using auth context, you would call login function here
      enqueueSnackbar("Login success", { variant: "success" });
    })
    .catch((err) => {
      console.log(err);
      enqueueSnackbar("Login failed", { variant: "error" });
    })
    .finally(() => {
      setLoading(false); // stop loader
    });
};
```

### 3. Update App Structure
Wrap the application with the AuthProvider:

**File: src/App.jsx**

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
      </SnackbarProvider>
    </>
  );
};

export default App;
```

### 4. Create Protected Route Component
Create a component to protect routes based on permissions:

**File: src/components/ProtectedRoute.jsx**

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

### 5. Update Router Configuration
Protect routes with permissions:

**File: src/route/router.jsx**

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
{
  path: "/schools/manage-schools",
  element: (
    <ProtectedRoute requiredPermission="can_manage_schools">
      <SchoolsList />
    </ProtectedRoute>
  ),
},
{
  path: "/products/manage-products",
  element: (
    <ProtectedRoute requiredPermission="can_manage_products">
      <ProductList />
    </ProtectedRoute>
  ),
},
{
  path: "/categories/manage-categories",
  element: (
    <ProtectedRoute requiredPermission="can_manage_categories">
      <CategoryList />
    </ProtectedRoute>
  ),
},
{
  path: "/packages/manage-packages",
  element: (
    <ProtectedRoute requiredPermission="can_manage_packages">
      <PackageList />
    </ProtectedRoute>
  ),
},
{
  path: "/orders/manage-orders",
  element: (
    <ProtectedRoute requiredPermission="can_manage_orders">
      <OrdersList />
    </ProtectedRoute>
  ),
},
{
  path: "/payments/manage-payments",
  element: (
    <ProtectedRoute requiredPermission="can_manage_payments">
      <PaymentsList />
    </ProtectedRoute>
  ),
},
// ... and so on for all protected routes
```

### 6. Update Menu System
Filter menu items based on user permissions:

**File: src/components/shared/navigationMenu/Menus.jsx**

```jsx
// Add import
import { useAuth } from '../../../contentApi/authProvider';

const Menus = () => {
  const { hasPermission } = useAuth();
  
  // Function to check if user can access a menu item
  const canAccessMenu = (menuName) => {
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
    
    const requiredPermission = permissionMap[menuName.toLowerCase()];
    if (!requiredPermission) return true; // If no permission mapping, allow access
    
    return hasPermission(requiredPermission);
  };
  
  // Filter menu items based on permissions
  const filteredMenuList = menuList.filter(menuItem => {
    return canAccessMenu(menuItem.name);
  });
  
  // Use filteredMenuList instead of menuList in the render
  // ...
};
```

### 7. Create Permission Hook
Create a hook for checking permissions in components:

**File: src/hooks/usePermission.js**

```jsx
import { useAuth } from '../contentApi/authProvider';

export const usePermission = () => {
  const { hasPermission } = useAuth();
  
  return { hasPermission };
};
```

### 8. Component-Level Permission Checks
Use the permission hook in components:

```jsx
import React from "react";
import { usePermission } from "../hooks/usePermission";

const MyComponent = () => {
  const { hasPermission } = usePermission();
  
  // Only show delete button if user has permission
  const showDeleteButton = hasPermission('can_delete');
  
  return (
    <div>
      <h1>My Component</h1>
      {showDeleteButton && (
        <button>Delete Item</button>
      )}
    </div>
  );
};

export default MyComponent;
```

## Permission Mapping
Map menu items and routes to user permission fields:

| Menu Item | Required Permission |
|-----------|---------------------|
| Users | can_manage_users |
| Students | can_manage_students |
| Schools | can_manage_schools |
| Contents | can_access_site_map |
| Products | can_manage_products |
| Packages | can_manage_packages |
| Categories | can_manage_categories |
| Orders | can_manage_orders |
| Payments | can_manage_payments |
| Reports | can_use_report_builder |

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

## Testing the Implementation

1. Create test users with different permission combinations
2. Verify that users can only access permitted routes
3. Check that menu items are properly filtered
4. Ensure component-level permissions work correctly
5. Test logout and login flows
6. Verify persistence across page refreshes

This implementation will provide a robust, secure permissions system that ensures users only see and can access the pages and data they are authorized to use.