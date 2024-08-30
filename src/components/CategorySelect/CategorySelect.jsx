import { useState } from 'react';
import S from './CategorySelect.module.css';

export default function CategorySelect() {
  const [selectedOption, setSelectedOption] = useState('');

  // 옵션 데이터 배열
  const options = [
    { value: '', label: '카테고리를 선택해주세요.', disabled: true },
    { value: 'frontend', label: '프론트엔드' },
    { value: 'backend', label: '백엔드' },
    { value: 'fullstack', label: '풀스택' },
    { value: 'algorithm', label: '알고리즘' },
    { value: 'basics', label: '기초지식' },
    { value: 'react', label: '리액트' },
    { value: 'uidesign', label: 'UI 디자인' },
    { value: 'uxdesign', label: 'UX 디자인' },
    { value: 'uiux', label: 'UI/UX' },
    { value: 'dataanalysis', label: '데이터분석' },
    { value: 'statistics', label: '통계분석' },
    { value: 'visualization', label: '시각화' },
  ];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={S.con}>
      <select value={selectedOption} onChange={handleChange} className={S.sel}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={S.opt}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
