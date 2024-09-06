import { useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

export const useSupabase = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) console.error('Error fetching users:', error);
    else setUsers(data);
  };

  const createUser = async (userData) => {
    const { data, error } = await supabase.from('users').insert([userData]);
    if (error) console.error('Error creating user:', error);
    else getUsers(data); // Refresh the user list
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, createUser };
};
