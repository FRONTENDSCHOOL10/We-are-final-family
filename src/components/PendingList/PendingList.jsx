import UserCard from '../UserCard/UserCard';
import S from './PendingList.module.css';
import { number } from 'prop-types';
import { useEffect } from 'react';
import useListStore from '@/stores/useListStore';
import { usePartyStore } from '@/stores/usePartyStore';
import { useStore } from '@/stores/chatStore';

PendingList.propTypes = {
  join: number,
};

export function PendingList({ join = 1 }) {
  const { singleData } = useListStore();

  const {
    updatePendingUsers,
    fetchAndSetPartyData,
    pendingUsers,
    moveTopending,
    cancelData,
  } = usePartyStore();
  const { setCurrentUser, currentUser } = useStore();

  useEffect(() => {
    const fatch = async () => {
      await fetchAndSetPartyData(singleData.id);
    };
    fatch();
  }, [singleData.id, fetchAndSetPartyData, updatePendingUsers, moveTopending]);

  useEffect(() => {
    return () => {
      updatePendingUsers(null);
    };
  }, [updatePendingUsers]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user.id);
  }, [setCurrentUser]);

  join = pendingUsers.length;

  const handleClick = (singleDataId, id) => {
    moveTopending(singleDataId, id);
    const fatch = async () => {
      await fetchAndSetPartyData(singleData.id);
    };

    setTimeout(() => {
      fatch();
    }, 500);
    console.log(id);
  };

  const cancelClick = (singleDataId, id) => {
    cancelData(singleDataId, id);
    const fatch = async () => {
      await fetchAndSetPartyData(singleData.id);
    };
    setTimeout(() => {
      fatch();
    }, 500);
    console.log(id);
  };

  return (
    <div className={`${S.component}`}>
      <h3 className="lbl-md">
        대기 중인 파티원 <span>{join}</span>
      </h3>

      {pendingUsers.map((item) => {
        console.log(item);
        return (
          <UserCard
            states={'pending'}
            key={item.id}
            username={item.username}
            userId={item.id}
            currentuser={currentUser}
            writer={singleData.user_id}
            onClick={() => {
              handleClick(singleData.id, item.id);
            }}
            cancelClick={() => {
              cancelClick(singleData.id, item.id);
            }}
          />
        );
      })}
    </div>
  );
}
