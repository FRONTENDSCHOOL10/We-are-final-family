import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import S from './BoardWrite.module.css';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';
import ListSelect from '@/components/ListSelect/ListSelect';
import { supabase } from '@/api/supabase';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

function BoardWrite() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const editId = query.get('edit');
    if (editId) {
      setIsEditMode(true);
      fetchBoardData(atob(editId));
    } else {
      const savedData = localStorage.getItem('boardWriteTemp');
      if (savedData) {
        const { category, title, content, imagePreview } =
          JSON.parse(savedData);
        setSelectedCategory(category);
        setTitle(title);
        setContent(content);
        setImagePreview(imagePreview);
      }
    }

    return () => {
      if (!isEditMode) {
        localStorage.removeItem('boardWriteTemp');
      }
    };
  }, [location]);

  useEffect(() => {
    if (!isEditMode) {
      const tempData = JSON.stringify({
        category: selectedCategory,
        title,
        content,
        imagePreview,
      });
      localStorage.setItem('boardWriteTemp', tempData);
    }
  }, [selectedCategory, title, content, imagePreview, isEditMode]);

  const fetchBoardData = async (id) => {
    const { data, error } = await supabase
      .from('board')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching board data:', error);
      toast.error('게시글을 불러오는데 실패했습니다.');
      return;
    }

    setSelectedCategory(data.category);
    setTitle(data.title);
    setContent(data.content);
    if (data.board_img) {
      setImagePreview(data.board_img);
    }
  };

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
    let error = null;
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
      } else if (imagePreview && isEditMode) {
        boardImg = imagePreview;
      }

      const boardData = {
        category: selectedCategory,
        title,
        content,
        user_id: user.id,
        username: userData.username,
        board_img: boardImg,
      };

      let result;
      if (isEditMode) {
        const editId = atob(new URLSearchParams(location.search).get('edit'));
        result = await supabase
          .from('board')
          .update(boardData)
          .eq('id', editId)
          .select()
          .single();
      } else {
        result = await supabase
          .from('board')
          .insert(boardData)
          .select()
          .single();
      }

      const { data: boardResult, error: boardError } = result;

      if (boardError) throw boardError;

      if (boardResult) {
        toast.success(
          `게시글 "${boardResult.title}"이(가) 성공적으로 ${
            isEditMode ? '수정' : '작성'
          }되었습니다. (ID: ${boardResult.id})`
        );
        localStorage.removeItem('boardWriteTemp');

        // 작성된 게시글의 ID를 state에 저장 (필요시 사용)
        // 예: setLatestPostId(boardData.id);

        navigate('/board/');
      }
    } catch (err) {
      console.error('Error submitting board post:', err);
      error = err;
    }

    if (error) {
      toast.error(
        `게시글 
        ${isEditMode ? '수정' : '작성'} 중 오류가 발생했습니다: ${error.message}
        `
      );
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Toaster />
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
            className={`${S.titleInput} hdg-lg`}
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
            className={`${S.textArea} para-md`}
            placeholder="내용을 입력하세요"
            value={content}
            onChange={handleContentChange}
          ></textarea>
          {imagePreview && (
            <div className={S.imagePreview}>
              <img src={imagePreview} alt="Preview" />
              <button className={S.removeImageBtn} onClick={handleRemoveImage}>
                <span className="i_close" />
              </button>
            </div>
          )}
        </div>
        <footer>
          <Button color="black" onClick={handleSubmit}>
            {isEditMode ? '수정 완료' : '작성 완료'}
          </Button>
        </footer>
      </main>
    </>
  );
}

BoardWrite.propTypes = {
  selectedCategory: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  imageFile: PropTypes.object,
  imagePreview: PropTypes.string,
  isEditMode: PropTypes.bool,
};

export default BoardWrite;
