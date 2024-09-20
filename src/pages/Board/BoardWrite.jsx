import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './BoardWrite.module.css';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';
import ListSelect from '@/components/ListSelect/ListSelect';
import { supabase } from '@/api/supabase';
import { toast } from 'react-hot-toast';

function BoardWrite() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handlePictureClick = () => {
    console.log('이미지 업로드 버튼 클릭');
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error('로그인이 필요합니다.');
        return;
      }

      if (!selectedCategory || !title || !content) {
        toast.error('모든 필드를 입력해주세요.');
        return;
      }

      // users 테이블에서 username 가져오기
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('username')
        .eq('id', user.id)
        .single();

      if (userError) {
        throw userError;
      }

      const { error } = await supabase.from('board').insert({
        category: selectedCategory,
        title,
        content,
        user_id: user.id,
        username: userData.username, // users 테이블에서 가져온 username
      });

      if (error) throw error;

      toast.success('게시글이 성공적으로 작성되었습니다.');
      navigate('/board');
    } catch (error) {
      console.error('Error submitting board post:', error);
      toast.error('게시글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Header
        back={true}
        actions={[{ icon: 'i_picture_line', onClick: handlePictureClick }]}
      />
      <main className={S.boardWrite}>
        <div className={S.writeWrap}>
          <input
            type="text"
            placeholder="글 제목 입력"
            value={title}
            onChange={handleTitleChange}
          />
          <ListSelect
            title="카테고리 선택"
            type="C"
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
          <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={handleContentChange}
          ></textarea>
        </div>
        <footer>
          <Button color="black" onClick={handleSubmit}>
            작성 완료
          </Button>
        </footer>
      </main>
    </>
  );
}

export default BoardWrite;
