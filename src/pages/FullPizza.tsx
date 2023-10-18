import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemById } from '../redux/cart/selectors';
import { CartItem } from '../redux/cart/types';
import { addItem } from '../redux/cart/slice';
import axios from 'axios';
import { PizzaProps } from '../@types/types';
import { Loader } from '../components/Loader';
import pepper from '../assets/img/pepper.png';
import vegan from '../assets/img/vegan.png';

const typeNames = ['traditional', 'cheese'];

const FullPizza: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pizza, setPizza] = React.useState<PizzaProps | null>(null);
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  React.useEffect(() => {
    async function fetchPizza() {
      if (id) {
        try {
          const { data } = await axios.get('https://651fe769906e276284c3b39c.mockapi.io/items/' + id);
          setPizza(data);
        } catch (error) {
          alert('Error fetching data!');
          navigate('/');
        }
      }
    }

    fetchPizza();
  }, [id, navigate]);
  
  const typeIndex = activeType === 0 ? 1 : 1.1;
  const sizeIndex = activeSize === 0 ? 1 : activeSize === 1 ? 1.25 : 1.5;
  const sizes = pizza?.sizes || [];

  let total = 0;

  if (pizza) {
    const { price } = pizza;

    total = Math.ceil(price * sizeIndex * typeIndex);
  }

  const handleAddClick = () => {
    if (pizza) {
      const { title, imageUrl, sizes } = pizza;

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
    }
  };

  const cartItem = useSelector(selectCartItemById(id, sizes[activeSize], typeNames[activeType]));
  const addedCount = cartItem ? cartItem.count : 0;

  if (!pizza) {
    return <Loader />;
  }

  return (
    <div className="full-pizza-block">
      <div className="full-pizza-block__image-container">
        {pizza.category === 4 && (
          <img
            className="pizza-icon"
            src={pepper}
            alt="Pepper"
            title="Spicy"
          />
        )}

        {pizza.category === 2 && (
          <img
            className="pizza-icon"
            src={vegan}
            alt="Vegan"
            title="Vegetarian"
          />
        )}
        
        <img
          src={pizza.imageUrl}
          alt='Pizza img'
          className="full-pizza-block__image"
        />
      </div>

      <div className="full-pizza-block__info">
        <h2 className="full-pizza-block__title">
          {pizza.title}
        </h2>

        <p className="full-pizza-block__desc">
          {pizza.desc}
        </p>

        <div className="full-pizza-block__selector">
          <ul className="full-pizza-block__type-selector">
            {pizza.types.map((typeId) => (
              <li
                key={typeId}
                className={activeType === typeId ? 'active' : ''}
                onClick={() => setActiveType(typeId)}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>

          <ul className="full-pizza-block__size-selector">
            {pizza.sizes.map((size, i) => (
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

        <div className="full-pizza-block__bottom-buttons">
          <Link
            to="/"
            className="
              button 
              button--outline 
              button--add 
              go-back-btn
            "
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
            </svg>

            <span>Go back</span>
          </Link>

          <div className="full-pizza-block__add-to-cart-button">
            <div className="full-pizza-block__price">
              {total} ₴
            </div>

            <button
              onClick={handleAddClick}
              className="button button--add"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
    </div>
  );
};

export default FullPizza;
