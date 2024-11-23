import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategories, Category} from '../../types';
import axiosApi from '../../axiosApi';

export const createCategory = createAsyncThunk<void, Category>(
  'categories/create',
  async (apiCategory) => {
    await axiosApi.post('/categories.json', apiCategory);
  });

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchCategories',
  async () => {
    const {data: categories} = await axiosApi.get<ApiCategories | null>('/categories.json');
    if (categories === null) {
      return [];
    }

    return Object.keys(categories).map(id => ({
      ...categories[id],
      id,
    }));
  });

export const deleteCategory = createAsyncThunk<void, string>(
  'categories/delete',
  async (id) => {
    await axiosApi.delete(`/categories/${id}.json`);
  });