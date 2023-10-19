/* eslint-disable jsx-a11y/no-onchange */
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { useImageDetail } from '@/stores/imageDetail';

import './Image.scss';

export const ImageDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getImageDetail, imageDetail, isLoading } = useImageDetail();

  useEffect(() => {
    getImageDetail(id);
  }, [getImageDetail, id]);

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="detail-card">
      <button
        type="button"
        onClick={() => navigate('/images')}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {'<'} Back
      </button>
      <div className="flex justify-center items-center h-screen bg-gray-100 image-wrap">
        <div className="mx-auto">
          <img src={imageDetail?.largeImageURL} alt="" className="w-full h-auto img-max-height" />
          <div className="flex items-center image-detail">
            <h1 className="text-2xl font-bold my-4">{imageDetail?.user}</h1>
            <p className="text-gray-500">Views: {imageDetail?.views}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
