# User Permissions Implementation Summary

## Overview
This document summarizes the implementation of user permissions in the Duralux Admin Dashboard. The implementation includes:

1. Authentication provider for managing user state
2. Protected routes that check user permissions
3. Menu filtering based on user permissions
4. Component-level permission checking
5. Unauthorized access handling

## Key Components

### 1. Authentication Provider (`src/contentApi/authProvider.jsx`)
- Manages authentication state (user data, token, permissions)
- Provides login/logout functionality
- Stores user data and token in localStorage
- Exposes `userPermissions` for other components
- Provides `hasPermission` function to check specific permissions

### 2. Protected Route Component (`src/components/ProtectedRoute.jsx`)
- Wraps routes that require specific permissions
- Redirects to unauthorized page if user lacks required permission
- Uses the `hasPermission` function from auth context

### 3. Menu Component (`src/components/shared/navigationMenu/Menus.jsx`)
- Filters menu items based on user permissions
- Uses a permission mapping to determine access
- Shows all menu items to unauthenticated users
- Hides restricted menu items from users without proper permissions

### 4. Permission Hook (`src/hooks/usePermission.js`)
- Provides `hasPermission` function for component-level checks
- Can be used in any component to conditionally render content
- Returns boolean indicating if user has specific permission

### 5. Permission Wrapper Component (`src/components/shared/PermissionWrapper.jsx`)
- Wrapper component that conditionally renders children based on permissions
- Provides a fallback UI when user lacks permissions
- Simplifies permission checking in JSX

### 6. Unauthorized Page (`src/pages/Unauthorized.jsx`)
- Simple page shown when users access restricted content
- Provides a button to return to the home page

### 7. Router Configuration (`src/route/router.jsx`)
- All application routes wrapped with ProtectedRoute components
- Each route specifies the required permission
- Unauthorized route added for handling access violations

## Implementation Details

### Permission Fields
The system uses the following permission fields from the user data:
- `can_manage_users`
- `can_manage_students`
- `can_manage_schools`
- `can_access_site_map`
- `can_manage_products`
- `can_manage_categories`
- `can_manage_packages`
- `can_manage_orders`
- `can_manage_payments`
- `can_use_report_builder`
- `can_access_standard_report`
- `can_view_report_by_school`
- `can_view_report_by_item`
- `can_access_all_offices`

### Menu Permission Mapping
Menu items are mapped to permission fields:
- Users → `can_manage_users`
- Students → `can_manage_students`
- Schools → `can_manage_schools`
- Contents → `can_access_site_map`
- Products → `can_manage_products`
- Packages → `can_manage_packages`
- Categories → `can_manage_categories`
- Orders → `can_manage_orders`
- Payments → `can_manage_payments`
- Reports → `can_use_report_builder`

## Usage Examples

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

### In Components
```jsx
import { usePermission } from '../../hooks/usePermission';

const MyComponent = () => {
  const { hasPermission } = usePermission();
  
  if (!hasPermission('can_manage_users')) {
    return <div>You don't have permission to view this content</div>;
  }
  
  return <div>Protected content</div>;
};
```

### With Permission Wrapper
```jsx
<PermissionWrapper 
  permission="can_manage_users" 
  fallback={<div>Access denied</div>}
>
  <ProtectedContent />
</PermissionWrapper>
```

## Benefits

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