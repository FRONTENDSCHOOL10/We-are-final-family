import { supabase } from './supabase';

/* -------- 수파베이스 데이터 만드는 api ------- */

export const createData = async ({ from, values }) => {
  try {
    if (!from || typeof from !== 'string') {
      throw new Error('값이 비어있거나,form에 문자값을 전달하세요');
    }
    if (!values || typeof values !== 'object') {
      throw new Error('값이 비어있거나,values는 문자 또는 객체 여야합니다.');
    }
    const { data, error } = await supabase.from(from).insert([values]).select();
    if (error) {
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    console.error('Error creating data:', error.message);
    return { success: false, error: error.message };
  }
};
//values에 해당 필드의 column:value 이런식으로 객체 형식으로 전달해주면 알아서 데이터 들어감

/* ----------- 데이터 생성 사용예시 ---------- */
// 1. 사용자 테이블에 데이터 삽입
// const createUser = async () => {
//   const result = await createData({
//     from: 'users',
//     values: {
//       name: 'John Doe',
//       email: 'john@example.com',
//       age: 30,
//       is_active: true
//     }
//   });

//   if (result.success) {
//     console.log('User created:', result.data);
//   } else {
//     console.error('Failed to create user:', result.error);
//   }
// };

/* ------- 수파베이스 데이터 가져오는 api ------- */

export const getData = async ({ form, select, setState }) => {
  try {
    if (!form || typeof form !== 'string') {
      throw new Error('값이 비어있거나,테이블 이름은 문자값을 전달해주세요');
    }
    if (!select || typeof select !== 'string') {
      throw new Error(
        '값이 비어있거나,찾으실 column을 문자값으로 전달해주세요'
      );
    }
    if (typeof setState !== 'function') {
      throw new Error('값이 비어있거나,setState는 함수여야합니다');
    }

    const { data, error } = await supabase.from(form).select(select);

    if (error) throw error;

    setState(data);
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { success: false, error: error.message };
  }
};
// Form = supabase 에 있는 필드이름
// select = 필드에 에 있는 어트리뷰트(속성) 이름
// setstate  해당값을 넣을 state

/* ----------- getData 사용 ----------- */
// const fetchUsers = async () => {
//   const result = await getData({
//     form: 'users',
//     select: 'id, name, email',
//     setState: setUsers // React의 setState 함수
//   });
//   if (result.success) {
//     console.log('Users fetched successfully');
//   } else {
//     console.error('Failed to fetch users:', result.error);
//   }
// };

/* ---------------수파베이스 데이터 업데이트 api -------------- */

export const updateData = async ({
  table, // 테이블이름
  updateColumn, // 변경할 컬럼 ex)users
  updateValue, // 변경할값 새로 변경할값
  conditionColumn, // 변경할 컬럼 updateColum 과 동일한값
  conditionValue, // 기존에 있는 값 ex) username 에 들어있는값
}) => {
  try {
    if (!table || typeof table !== 'string') {
      throw new Error('값이 비어있거나,테이블 이름은 문자값으로 전달해주세요');
    }
    if (!updateColumn || typeof updateColumn !== 'string') {
      throw new Error(
        '값이 비어있거나,업데이트할 column 을 문자값으로 전달해주세요'
      );
    }
    if (!conditionColumn || typeof conditionColumn !== 'string') {
      throw new Error(
        '값이 비어있거나,변경할column 을 문자값으로 전달헤주세요'
      );
    }

    const { data, error } = await supabase
      .from(table)
      .update({ [updateColumn]: updateValue })
      .eq(conditionColumn, conditionValue)
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error updating data:', error.message);
    return { success: false, error: error.message };
  }
};

/* -----------------------------------------------*/
/*     예시사용법 곰영한 => 고명한 으로 바꾸는 코드     */
/* -----------------------------------------------*/
// updateData 사용
// const updateUser = async () => {
//   const result = await updateData({
//     table: 'users',
//     updateColumn: 'username',
//     updateValue: '고명한',
//     conditionColumn: 'username',
//     conditionValue: '곰영한',
//   });
//   if (result.success) {
//     console.log('User updated:', result.data);
//   } else {
//     console.error('Failed to update user:', result.error);
//   }
// };
/* -----------------------------------------------*/

/* -------- 수파베이스 데이터 지우는 api ------- */

export const deleteData = async ({ table, deleteColumn, deleteValue }) => {
  try {
    if (!table || typeof table !== 'string') {
      throw new Error('값이 비어있거나,테이블 이름을 문자값을 전달해주세요');
    }
    if (!deleteColumn || typeof deleteColumn !== 'string') {
      throw new Error('값이 비어있거나,지우실 column 을 문자값을 전달해주세요');
    }

    const { data, error } = await supabase
      .from(table)
      .delete()
      .eq(deleteColumn, deleteValue)
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error deleting data:', error.message);
    return { success: false, error: error.message };
  }
};
// deleteData 사용
// const deleteUser = async () => {
//   const result = await deleteData({
//     table: 'users',
//     deleteColumn: 'id',
//     deleteValue: 123
//   });
//   if (result.success) {
//     console.log('User deleted:', result.data);
//   } else {
//     console.error('Failed to delete user:', result.error);
//   }
// };
