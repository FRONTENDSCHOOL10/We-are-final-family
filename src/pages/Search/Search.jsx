import Header from '@/components/Header/Header';

function Search() {
  return (
    <div>
      <Header back={true} search={true} actions={['i_search']}></Header>
    </div>
  );
}

export default Search;
