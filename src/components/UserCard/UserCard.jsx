import S from './UserCard.module.css';
import { node, string, number, func } from 'prop-types';
import { ProfileTitle } from '../ProfileTitle/ProfileTitle';
import { ProfileImg } from '../ProfileImg/ProfileImg';
import OptionPopup from '../OptionPopup/OptionPopup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/stores/chatStore';

function UserCard({
  description,
  userId,
  states,
  onClick,
  cancelClick,
  image,
  username,
  postCount,
  writer,
  currentuser,
  showModal,

  ...props
}) {
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const {
    setSelectedUser,
    currentRoom,
    fetchChatRoom,
    fetchChatRoomById,
    currentUser,
  } = useStore();
  const handleShowModal = () => {
    showModal();
    setActive(!isActive);
  };

  switch (states) {
    case 'pending':
      return (
        <div className={S.wrapper} {...props} onClick={handleShowModal}>
          <div
            style={{
              position: 'absolute',
              zIndex: 1000,
              left: 235,
              top: -10,
              display: isActive ? 'block' : 'none',
            }}
          >
            <OptionPopup
              options={[
                {
                  label: '프로필 보기',
                  onClick: () => console.log('수정하기 클릭!'),
                },
                {
                  label: '채팅하기',
                  onClick: async () => {
                    try {
                      setSelectedUser(userId);
                      let room = currentRoom;

                      if (!room) {
                        room = await fetchChatRoom();
                        console.log('New room created:', room);
                      }
                      if (room === null || room === undefined) {
                        navigate(`/chat/room/new`);
                      }

                      const fetchedRoom = await fetchChatRoomById(room.id);
                      console.log('Fetched room details:', fetchedRoom);

                      // 상태 업데이트가 반영될 때까지 기다립니다
                      await new Promise((resolve) => setTimeout(resolve, 0));

                      console.log('Current user:', currentUser);
                      console.log('Selected user:', userId);
                      console.log('Current room:', fetchedRoom);

                      if (fetchedRoom && fetchedRoom.id) {
                        navigate(`/chat/room/${fetchedRoom.id}`);
                      } else {
                        console.error('Invalid room data');
                        // 에러 처리 로직 (예: 사용자에게 알림)
                      }
                    } catch (error) {
                      console.error('Error in chat room navigation:', error);
                      // 에러 처리 로직 (예: 사용자에게 알림)
                    }
                  },
                },
              ]}
            />
          </div>

          <ProfileImg></ProfileImg>
          <div className={S.component}>
            <ProfileTitle name={username} className={'lbl-md'}>
              {isWriter && (
                <div className={S.actions}>
                  <button
                    type="submit"
                    onClick={onClick}
                    className={`${S.agree} lbl-sm`}
                  >
                    승인
                  </button>
                  <button
                    onClick={cancelClick}
                    className={`${S.disagree} lbl-sm`}
                  >
                    거절
                  </button>
                </div>
              )}
            </ProfileTitle>
          </div>
        </div>
      );
    case 'join':
      return (
        <div className={S.wrapper} onClick={handleShowModal} {...props}>
          <div
            style={{
              position: 'absolute',
              zIndex: 1000,
              left: 235,
              top: -10,
              display: isActive ? 'block' : 'none',
            }}
          >
            <OptionPopup
              options={[
                {
                  label: '프로필 보기',
                  onClick: () => console.log('수정하기 클릭!'),
                },
                {
                  label: '채팅하기',
                  onClick: () => console.log('삭제하기 클릭!'),
                },
              ]}
            />
          </div>

          <ProfileImg></ProfileImg>

          <span className=""></span>
          <div className={S.component}>
            <ProfileTitle name={username} className={'lbl-md'}>
              {writer === userId ? (
                <div className={`${S.cert} para-sm`}>
                  <span className="i_certificate" />
                  파티장
                </div>
              ) : (
                ''
              )}
            </ProfileTitle>

            <p className={`${S.desc} para-sm`}>{description}</p>
          </div>

          <div></div>
        </div>
      );
    case 'profile':
      return (
        <div className={S.profile} {...props}>
          <ProfileImg
            width={'4.84375rem'}
            height={'4.84375rem'}
            display="block"
            onClick={onClick}
            image={image}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rrem',
            }}
          >
            <ProfileTitle name={username} className="lbl-lg" />
            <p className="para-sm" style={{ color: 'var(--gray-600)' }}>
              작성글 {postCount}
            </p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

UserCard.propTypes = {
  description: node || string,
  userId: string,
  cancelClick: func,
  states: string.isRequired,
  onClick: func,
  image: string,
  username: string,
  postCount: number,
  writer: string,
  currentuser: string,
  showModal: func,
};

export default UserCard;
