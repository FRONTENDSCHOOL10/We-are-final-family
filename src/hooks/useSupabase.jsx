import { useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

export const useSupabase = () => {
  const [users, setUsers] = useState([]);
  const [interest, setinterest] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const getUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) console.error('Error fetching users:', error);
    else setUsers(data);
  };

  const createUser = async (userData) => {
    const { data, error } = await supabase.from('users').insert([userData]);
    if (error) console.error('Error creating user:', error);
    else getUsers(); // Refresh the user list
  };

  const getinterest = async () => {
    const { data, error } = await supabase.from('interest').select('*');
    if (error) console.error('Error fetching interest:', error);
    else setinterest(data);
  };

  const getSubCategory = async () => {
    const { data, error } = await supabase.from('sub_category').select(`
      id,
      name,
      Category:category_id (name)
    `);
    if (error) console.error('Error fetching sub_category:', error);
    else setSubCategory(data);
  };

  useEffect(() => {
    getUsers();
    getinterest();
    getSubCategory();
  }, []);

  return {
    users,
    interest,
    subCategory,
  };
};
