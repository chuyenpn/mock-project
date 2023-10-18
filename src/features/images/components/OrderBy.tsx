/* eslint-disable jsx-a11y/no-onchange */
import clsx from 'clsx';
import React from 'react';

import { OrderBy as OrderByEnum } from '@/types';

type ListProps = {
  className: string;
  orderBy: OrderByEnum;
  setOrderBy: (orderBy: OrderByEnum) => void;
};

const OrderBy: React.FC<ListProps> = ({ className, orderBy, setOrderBy }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value as OrderByEnum);
  };
  return (
    <div className={clsx('flex justify-between items-center order-by', className)}>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white order-label"
      >
        Order By
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select-box"
        onChange={handleOnChange}
        value={orderBy}
      >
        <option value="popular"> Popular </option>
        <option value="latest"> Latest </option>
      </select>
    </div>
  );
};

export default OrderBy;
