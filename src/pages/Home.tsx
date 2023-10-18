import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, PizzaBlock, Skeleton} from '../components';
import { sortList } from '../components/Sort';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, searchValue } = useSelector(selectFilter);

  const handleChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const getPizzas = async () => {
    try {
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? String(categoryId) : '';
      const search = searchValue;

      await dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
        }),
      );

      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId > 0 ? categoryId : 0,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty]);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          sort: sort || sortList[0],
        }),
      );
    }
    
    isSearch.current = true;
  }, []);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          handleChangeCategory={handleChangeCategory}
        />

        <Sort value={sort} />
      </div>

      <h2 className="content__title">
        All pizzas
      </h2>
      
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Error happened 😕</h2>

          <p>Unfortunately, we were unable to obtain pizzas. Please try again later.</p>
        </div>
      ) : (
          <div className="content__items">
            {status === 'loading' ? skeletons : pizzas}
          </div>
      )}
    </div>
  );
};

export default Home;
