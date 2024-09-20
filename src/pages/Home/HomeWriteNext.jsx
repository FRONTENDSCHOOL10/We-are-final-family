import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';
import ButtonSelector from '@/components/WriteForm/ButtonSelector/ButtonSelector';
import { GenderData } from '@/components/WriteForm/ButtonSelector/data/GenderData';
import { AgeData } from '@/components/WriteForm/ButtonSelector/data/AgeDate';
import S from './HomeWriteNext.module.css';
import useHomeWriteStore from '@/stores/homeWriteStore';
import { supabase } from '@/api/supabase';
import Modal from '@/components/Modal/Modal';

function HomeWriteNext() {
  const navigate = useNavigate();
  const {
    gender,
    age,
    setGender,
    setAge,
    title,
    interest,
    category,
    description,
    personnel,
    date,
    time,
    location,
    reset,
  } = useHomeWriteStore();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', desc: '' });
  const [region2depthName, setRegion2depthName] = useState('');
  const [region3depthName, setRegion3depthName] = useState('');

  useEffect(() => {
    const region2 = localStorage.getItem('region2depthName');
    const region3 = localStorage.getItem('region3depthName');
    if (region2) setRegion2depthName(region2);
    if (region3) setRegion3depthName(region3);
  }, []);

  const handleSubmit = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('username')
        .eq('id', user.id);

      if (userError || !userData.length) {
        throw new Error('Failed to fetch username');
      }

      const username = userData[0].username;

      const dateTime = new Date(date);
      const [hours, minutes] = time.split(' ')[1].split(':');
      dateTime.setHours(
        parseInt(hours) + (time.includes('오후') ? 12 : 0),
        parseInt(minutes)
      );

      const { error } = await supabase.from('party').insert({
        user_id: user.id,
        username,
        title,
        interest,
        category,
        description,
        people: personnel,
        meet_date: dateTime.toISOString(),
        place: location,
        age,
        gender,
        update_at: new Date().toISOString(),
        location_1: region2depthName,
        location_2: region3depthName,
      });

      if (error) throw error;

      localStorage.removeItem('region2depthName');
      localStorage.removeItem('region3depthName');

      setModalContent({
        title: '성공',
        desc: '파티가 성공적으로 생성되었습니다.',
      });
      setShowModal(true);

      reset();
    } catch (error) {
      console.error('Error creating party:', error);
      setModalContent({
        title: '오류',
        desc: `파티 생성 중 오류가 발생했습니다: ${error.message}`,
      });
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/home');
  };

  return (
    <>
      <Header back={true} />
      <main className={S.homeWrite}>
        <div className={S.writeWrap}>
          <h2 className="hdg-lg">어떤 파티원과 함께 할까요?</h2>
          {/* <div className="imgBox"></div> */}

          <ButtonSelector
            data={GenderData}
            label="성별"
            title="on"
            btnValue={gender}
            onChange={setGender}
          />
          <ButtonSelector
            data={AgeData}
            label="연령"
            title="on"
            btnValue={age}
            onChange={setAge}
          />
        </div>
        <footer>
          <Button color="black" onClick={handleSubmit}>
            파티원 모집
          </Button>
        </footer>
      </main>
      {showModal && (
        <Modal
          title={modalContent.title}
          desc={modalContent.desc}
          buttons={[
            {
              type: 'button',
              color: 'black',
              label: '확인',
              action: 'confirm',
            },
          ]}
          onConfirm={handleModalClose}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}

export default HomeWriteNext;
