// src/context/MenuContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenus = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/core/v1/me/menus`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenus(data.data);
      localStorage.setItem('cachedMenus', JSON.stringify(data.data));
    } catch (err) {
      setError(err.message);
      // Fallback to cached data if available
      const cached = localStorage.getItem('cachedMenus');
      if (cached) setMenus(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <MenuContext.Provider value={{ menus, loading, error, refreshMenus: fetchMenus }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);