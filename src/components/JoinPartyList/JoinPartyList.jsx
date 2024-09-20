import { number } from 'prop-types';
import S from './JoinPartyList.module.css';
import UserCard from '../UserCard/UserCard';
import { useStore } from '@/stores/chatStore';
import useListStore from '@/stores/useListStore';
import { usePartyStore } from '@/stores/usePartyStore';
import { useEffect } from 'react';

JoinPartyList.propTypes = {
  join: number,
  maxparty: number,
};

export function JoinPartyList({ join = 1, maxparty = 4 }) {
  const { currentUser } = useStore();
  const { singleData } = useListStore();
  const {
    updateJoinArray,
    joinArray,
    joinUsers,

    // updatePendingArray,
    // movePendingToJoin,
    fetchAndSetPartyData,
  } = usePartyStore();

  console.log(joinArray);
  useEffect(() => {
    const fatch = async () => {
      await fetchAndSetPartyData(singleData.id);
    };
    fatch();
  }, [singleData.id, fetchAndSetPartyData, updateJoinArray]);

  useEffect(() => {
    return () => {
      updateJoinArray(null);
    };
  }, [updateJoinArray]);
  console.log(joinUsers);

  return (
    <div className={`${S.component}`}>
      <h3 className="lbl-md">
        참여 중인 파티원 <span>{join}/</span>
        {maxparty}
      </h3>

      {joinUsers.map((item) => {
        console.log(item);

        return (
          <UserCard
            states={'join'}
            currentuser={currentUser}
            writer={singleData.user_id}
            key={item.id}
            userId={item.id}
            username={item.username}
          />
        );
      })}
    </div>
  );
}
