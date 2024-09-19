import { useState, useEffect } from 'react';
import Badge from '../Badge/Badge';
import { supabase } from '@/api/supabase';
import S from './ListSearch.module.css';
import PropTypes from 'prop-types';
import Error from '@/pages/Error';
import Fallback from '@/pages/Fallback';
import NoneData from '@/pages/NoneData';

function ListSearch({ searchTerm, activeFilter }) {
  const [mixedData, setMixedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let boardData = [];
        let partyData = [];

        const fetchTableData = async (table) => {
          let query = supabase
            .from(table)
            .select('*')
            .order('update_at', { ascending: false, nullsFirst: false })
            .order('create_at', { ascending: false });

          if (searchTerm) {
            query = query.ilike('title', `%${searchTerm}%`);
          }

          const { data, error } = await query;
          if (error) throw error;
          return data.map((item) => ({ ...item, source: table }));
        };

        if (activeFilter === 'all' || activeFilter === 'board') {
          boardData = await fetchTableData('board');
        }

        if (activeFilter === 'all' || activeFilter === 'party') {
          partyData = await fetchTableData('party');
        }

        const allData = [...boardData, ...partyData].sort((a, b) => {
          const dateA = new Date(a.update_at || a.create_at);
          const dateB = new Date(b.update_at || b.create_at);
          return dateB - dateA;
        });

        setMixedData(allData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, activeFilter]);

  if (loading) return <Fallback />;
  if (error) return <Error />;
  if (mixedData.length === 0)
    return <NoneData icon="i_close" text="검색 결과가 없습니다." />;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={S.listSearch}>
      {mixedData.map((item) => (
        <div key={`${item.source}-${item.id}`} className={S.listSearchItem}>
          <Badge text={item.source === 'board' ? '게시판' : '파티모집'} />
          <div className={S.listSearchItemContent}>
            <span className={`${S.listSearchTitle} para-md`}>{item.title}</span>
            <span className={`${S.listSearchDate} para-sm`}>
              {formatDate(item.update_at || item.create_at)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

ListSearch.propTypes = {
  searchTerm: PropTypes.string,
  activeFilter: PropTypes.string,
};

export default ListSearch;
