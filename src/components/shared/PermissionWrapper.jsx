import React from 'react';
import { usePermission } from '../../hooks/usePermission';

const PermissionWrapper = ({ permission, children, fallback = null }) => {
  const { hasPermission } = usePermission();
  
  // If user has the required permission, render children
  // Otherwise, render fallback (or nothing if no fallback provided)
  return hasPermission(permission) ? children : fallback;
};

export default PermissionWrapper;