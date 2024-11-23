import {createAsyncThunk} from '@reduxjs/toolkit';
import {Category} from '../../types';
import axiosApi from '../../axiosApi';

export const createCategory = createAsyncThunk<void, Category>(
  'categories/create',
  async (apiCategory) => {
    await axiosApi.post('/categories.json', apiCategory);
  });