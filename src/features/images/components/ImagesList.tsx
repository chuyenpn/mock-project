import { useEffect } from 'react';

import { Table, Spinner, Link } from '@/components/Elements';
import { useImageStore } from '@/stores/images';
import { formatDate } from '@/utils/format';

import { Image } from '../types';

export const ImagesList = () => {
  const { getImages, images } = useImageStore();

  console.log('images ============ ', images);

  useEffect(() => {
    getImages();
  }, []);

  // if (discussionsQuery.isLoading) {
  //   return (
  //     <div className="w-full h-48 flex justify-center items-center">
  //       <Spinner size="lg" />
  //     </div>
  //   );
  // }

  // if (!discussionsQuery.data) return null;

  return (
    <Table<Image>
      data={[]}
      columns={[
        {
          title: 'Title',
          field: 'title',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <Link to={`./${id}`}>View</Link>;
          },
        },
      ]}
    />
  );
};
