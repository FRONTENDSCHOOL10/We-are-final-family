import { supabase } from '@/api/supabase';

export async function fetchListData(type) {
  if (type === 'A') {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('interest_selected')
      .select(
        'interest_1, interest_2, interest_3, interest_4, interest_5, interest_6'
      )
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('관심사 가져오기 오류:', error);
      return [];
    }

    return Object.entries(data)
      .filter(([, value]) => value !== null)
      .map(([, value], index) => ({
        value: `interest_${index + 1}`,
        label: value,
      }));
  } else if (type === 'B') {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name');

    if (error) {
      console.error('카테고리 가져오기 오류:', error);
      return [];
    }

    return data.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  } else if (type === 'C') {
    const { data, error } = await supabase
      .from('board_category')
      .select('id, category');

    if (error) {
      console.error('게시판 카테고리 가져오기 오류:', error);
      return [];
    }

    const formattedData = data.map((category) => ({
      value: category.id,
      label: category.category,
    }));

    return formattedData;
  }

  return [];
}
