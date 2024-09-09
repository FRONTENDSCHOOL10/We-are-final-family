import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export const DataService = () => {
  const [users, setUsers] = useState([]);
  const [interest, setinterest] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const getUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) console.error('Error fetching users:', error);
    else setUsers(data);
  };

  const signUp = async (email, password, username) => {
    try {
      console.log('Starting sign up process for email:', email);

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      console.log('Auth signup successful, user data:', data);

      if (data.user && data.user.id) {
        console.log(
          'Attempting to insert user into public.users. User ID:',
          data.user.id
        );

        const { data: userData, error: insertError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email,
            username: username,
          })
          .select();

        if (insertError) {
          console.error('Error inserting user into public.users:', insertError);
          throw insertError;
        }

        console.log('User successfully inserted into public.users:', userData);
      } else {
        console.error('User data not available after sign up');
        throw new Error('User data not available after sign up');
      }

      return data.user;
    } catch (error) {
      console.error('Error in signUp process:', error);
      throw error;
    }
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
    getUsers,
  };
};
