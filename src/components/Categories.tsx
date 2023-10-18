import React from 'react';
import { CategoriesProps } from '../@types/types';

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Cheeze', 'Sweet'];

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, handleChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => handleChangeCategory(i)}
            className={value === i ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
