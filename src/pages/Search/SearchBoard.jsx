import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/App/Header';
import ListSearch from '@/components/ListSearch/ListSearch';
import ListFilterButtons from '@/components/ListFilterButtons/ListFilterButtons';

function SearchBoard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div>
      <Header back={true} contactName={`'${query}' 검색 결과`} />
      <ListFilterButtons
        optionsType="searchFilterOptions"
        singleSelect={true}
        onChange={handleFilterChange}
        activeFilter={activeFilter}
      />
      <ListSearch searchTerm={query} activeFilter={activeFilter} />
    </div>
  );
}

export default SearchBoard;
