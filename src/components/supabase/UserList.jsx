import { useSupabase } from '../../hooks/useSupabase';

export const UserList = () => {
  const { users } = useSupabase();

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
