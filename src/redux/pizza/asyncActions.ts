import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search } = params;
    const { data } = await axios.get<Pizza[]>(`https://651fe769906e276284c3b39c.mockapi.io/items`, {
      params: pickBy(
        {
          category,
          sortBy,
          order,
          search,
        },
        identity,
      ),
    });

    return data;
  },
);
