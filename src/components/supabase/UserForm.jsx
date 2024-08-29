import { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';

export const UserForm = () => {
  const [name, setName] = useState('');
  const { createUser } = useSupabase();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({ name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
      />
      <button type="submit">Create User</button>
    </form>
  );
};
