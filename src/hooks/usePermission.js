import { useAuth } from '../contentApi/authProvider';

export const usePermission = () => {
  const { hasPermission } = useAuth();
  
  return { hasPermission };
};