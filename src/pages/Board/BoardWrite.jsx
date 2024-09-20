import { useState, useRef, useEffect } from 'react';
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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedData = localStorage.getItem('boardWriteTemp');
    if (savedData) {
      const { category, title, content, imagePreview } = JSON.parse(savedData);
      setSelectedCategory(category);
      setTitle(title);
      setContent(content);
      setImagePreview(imagePreview);
    }

    return () => {
      localStorage.removeItem('boardWriteTemp');
    };
  }, []);

  useEffect(() => {
    const tempData = JSON.stringify({
      category: selectedCategory,
      title,
      content,
      imagePreview,
    });
    localStorage.setItem('boardWriteTemp', tempData);
  }, [selectedCategory, title, content, imagePreview]);

  const handlePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('username')
        .eq('id', user.id)
        .single();

      if (userError) {
        throw userError;
      }

      let boardImg = '';
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('board_img')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('board_img')
          .getPublicUrl(filePath);

        boardImg = urlData.publicUrl;
      }

      const { data: boardData, error: boardError } = await supabase
        .from('board')
        .insert({
          category: selectedCategory,
          title,
          content,
          user_id: user.id,
          username: userData.username,
          board_img: boardImg, // 여기를 'board_img'로 변경
        })
        .select()
        .single();

      if (boardError) throw boardError;

      toast.success('게시글이 성공적으로 작성되었습니다.');
      localStorage.removeItem('boardWriteTemp');

      // 작성된 게시글의 상세 페이지로 이동
      navigate(`/board/${boardData.id}`);
    } catch (error) {
      console.error('Error submitting board post:', error);
      toast.error(`게시글 작성 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <>
      <Header
        back={true}
        actions={[{ icon: 'i_picture_line', onClick: handlePictureClick }]}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
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
          {imagePreview && (
            <div className={S.imagePreview}>
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
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
