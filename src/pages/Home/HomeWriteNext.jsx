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
    image,
    reset,
  } = useHomeWriteStore();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', desc: '' });
  const [region2depthName, setRegion2depthName] = useState('');

  useEffect(() => {
    const region2 = localStorage.getItem('region2depthName');

    if (region2) setRegion2depthName(region2);
  }, []);

  const uploadImage = async (userId, partyId) => {
    if (!image) return null;

    const imageData = image.split(',')[1]; // Base64 데이터 추출
    const byteCharacters = atob(imageData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    const fileName = `${partyId}.jpg`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('party_img')
      .upload(filePath, blob);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('party_img').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('username')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      const username = userData.username;

      const dateTime = new Date(date);
      const [hours, minutes] = time.split(' ')[1].split(':');
      dateTime.setHours(
        parseInt(hours) + (time.includes('오후') ? 12 : 0),
        parseInt(minutes)
      );

      const { data: partyData, error: partyError } = await supabase
        .from('party')
        .insert({
          user_id: user.id,
          username,
          title,
          interest,
          category,
          description,
          people: personnel,
          meet_date: dateTime.toISOString(),
          location_1: region2depthName,
          location_2: location,

          age,
          gender,
          update_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (partyError) throw partyError;

      // party_detail 테이블에 데이터 삽입
      const { error: detailError } = await supabase
        .from('party_detail')
        .insert({
          id: partyData.id,
          join_1: user.id,
        });

      if (detailError) throw detailError;

      const imageUrl = await uploadImage(user.id, partyData.id);

      if (imageUrl) {
        const { error: updateError } = await supabase
          .from('party')
          .update({ party_img: imageUrl })
          .eq('id', partyData.id);

        if (updateError) throw updateError;
      }

      localStorage.removeItem('region2depthName');
      localStorage.removeItem('home-write-storage');

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
