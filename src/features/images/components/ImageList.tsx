/* eslint-disable jsx-a11y/no-onchange */
import { useEffect, useState } from 'react';

import { Spinner } from '@/components/Elements';
import { useImageStore } from '@/stores/images';

import ImageGrid from './ImageGrid';
import OrderBy from './OrderBy';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

import './Image.scss';

export const ImageList = () => {
  const {
    getImages,
    images,
    isLoading,
    page,
    totalPages,
    total,
    perPage,
    setPage,
    searchTerm,
    setSearchTerm,
    isSearching,
    orderBy,
    setOrderBy,
  } = useImageStore();
  const [searchTermLocal, setSearchTermLocal] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const TIME_OUT = 500;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      setSearchTermLocal(term);
    }, TIME_OUT);

    setSearchTimeout(timeout);
  };

  useEffect(() => {
    getImages();
  }, [searchTermLocal, orderBy, page, getImages]);

  if (!images.length) return null;

  return (
    <div className="list">
      <div className="flex justify-between items-center flex-col md:flex-row">
        <SearchBar
          isSearching={isSearching}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          className="flex-1"
        />
        <OrderBy className="flex-1" orderBy={orderBy} setOrderBy={setOrderBy} />
      </div>
      {isLoading ? (
        <div className="w-full h-48 flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <ImageGrid images={images} />
      )}
      <Pagination
        total={total}
        currentPage={page}
        perPage={perPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
