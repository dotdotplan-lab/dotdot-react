import { useState } from 'react';
import {CanvasList} from "../components/CanvasList.jsx";
import { ViewToggle } from '../components/ViewToggle.jsx';
import {
  createCanvas,
  deleteCanvas,
  getCanvases,
} from '../api/canvas.js';
import Loading from '../components/Loading.jsx';
import Error from '../components/Error.jsx';
import Button from '../components/Button.jsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';

function Home() {
  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined,
  });
  const handleFilter = (key, value) => setFilter({
    ...filter,
    [key]: value
  });
  const [isGridView, setIsGridView] = useState(true);
  const queryClient = useQueryClient();

  // 1] 데이터 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', filter.searchText, filter.category],
    queryFn: () => {
      console.log('fetching data');
      return getCanvases({
        title_like: filter.searchText,
        category: filter.category
      });
    },
    // initialData: [],
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 신선함(fresh) 상태로 유지
    refetchOnWindowFocus: false,
  });

  // 2] 등록
  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  // 3] 삭제
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  // 네트워크 통신 관리 함수 - 삭제
  const handleDeleteItem = async id => {
    if (confirm('삭제 하시겠습니까?') == false) {
      return;
    }
    deleteCanvasMutation(id);
  };

  // 네트워크 통신 관리 함수 - 신규
  const handleCreateCanvas = async () => {
    createNewCanvas();
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-2 flex-col w-full sm:flex-row  mb-4 sm:mb-0">
          <SearchBar
            searchText={filter.searchText}
            onSearch={val => handleFilter('searchText', val)}
          />
          <CategoryFilter
            category={filter.category}
            onChange={(val) => handleFilter('category', val)}
          />
        </div>
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="flex justify-self-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={refetch} />}
      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          isGridView={isGridView}
          searchText={filter.searchText}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}

export default Home;
