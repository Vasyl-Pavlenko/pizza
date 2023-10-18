import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemById } from '../../redux/cart/selectors';
import { CartItem } from '../../redux/cart/types';
import { addItem } from '../../redux/cart/slice';
import { PizzaProps } from '../../@types/types';
import pepper from '../../assets/img/pepper.png';
import vegan from '../../assets/img/vegan.png';

const typeNames = ['traditional', 'cheese'];

export const PizzaBlock: React.FC<PizzaProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
  category
}) => {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const typeIndex = activeType === 0 ? 1 : 1.1;
  const sizeIndex = activeSize === 0 ? 1 : activeSize === 1 ? 1.25 : 1.5;
  const total = Math.ceil(price * sizeIndex * typeIndex);

  const cartItem = useSelector(selectCartItemById(id, sizes[activeSize], typeNames[activeType]));
  const addedCount = cartItem ? cartItem.count : 0;

  const handleAddClick = () => {
    const item: CartItem = {
      id,
      title,
      price: total,
      total,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 1,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link
          key={id}
          to={`/pizza/${id}`}
        >
          {category === 4 && (
            <img
              className="pizza-icon"
              src={pepper}
              alt="Pepper"
              title="Spicy"
            />
          )}

          {category === 2 && (
            <img
              className="pizza-icon"
              src={vegan}
              alt="Vegan"
              title="Vegetarian"
            />
          )}
          
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
          />

          <h4 className="pizza-block__title">
            {title}
          </h4>
        </Link>

        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>

          <ul>
            {sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}
              >
                {size} cm.
              </li>
            ))}
          </ul>
        </div>

        <div className="pizza-block__bottom">
          <div className="pizza-block__price">
            {total} ₴
          </div>

          <button
            onClick={handleAddClick}
            className="
              button
              button--outline
              button--add
            "
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>

            <span>Add</span>
            
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
