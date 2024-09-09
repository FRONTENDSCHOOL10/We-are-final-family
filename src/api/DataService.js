import { supabase } from './supabase';

/* ------- 수파베이스 데이터 가져오는 api ------- */

export const getData = async (form, select, setstate) => {
  const { data, error } = await supabase.from(form).select(select);
  if (error) console.error('Error fetching interest:', error);
  else setstate(data);
};
// Form = supabase 에 있는 필드이름
// select = 필드에 에 있는 어트리뷰트(속성) 이름
// setstate  해당값을 넣을 state

/* ---------------수파베이스 데이터 업데이트 api -------------- */

export const updateData = async ({
  table, // 테이블이름
  updateColumn, // 변경할 컬럼 ex)users
  updateValue, // 변경할값 새로 변경할값
  conditionColumn, // 변경할 컬럼 updateColum 과 동일한값
  conditionValue, // 기존에 있는 값 ex) username 에 들어있는값
}) => {
  const { data, error } = await supabase
    .from(table) // 테이블 이름을 인수로 받음
    .update({ [updateColumn]: updateValue }) // 업데이트할 컬럼과 값을 인수로 받음
    .eq(conditionColumn, conditionValue) // 조건 컬럼과 값을 인수로 받음
    .select(); // 업데이트 후 데이터를 반환

  if (error) {
    console.error('Error updating row:', error);
    return null; // 에러가 발생했을 때 null 반환
  }

  return data; // 성공적으로 업데이트
};

/* -----------------------------------------------*/
/*     예시사용법 곰영한 => 고명한 으로 바꾸는 코드     */
/* -----------------------------------------------*/
// const handleClick = () => {
//   updateData({
//     table: 'users',
//     updateColumn: 'username',
//     updateValue: '고명한',
//     conditionColumn: 'username',
//     conditionValue: '곰영한',
//   });
// };
/* -----------------------------------------------*/

/* -------- 수파베이스 데이터 지우는 api ------- */

export const deleteData = async (delateColumn, delateValue) => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq(delateColumn, delateValue);
  console.log('sucsses');
  if (error) {
    console.log(error);
  }
};
