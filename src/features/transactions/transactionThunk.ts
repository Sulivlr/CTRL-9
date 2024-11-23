import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategories, ApiTransaction, ApiTransactions, Transaction} from '../../types';
import axiosApi from '../../axiosApi';

export const createTransaction = createAsyncThunk<void, ApiTransaction>(
  'transactions/create',
  async (apiTransaction) => {
    await axiosApi.post('/transactions.json', apiTransaction);
  }
);

export const fetchTransactions = createAsyncThunk<Transaction[]>(
  'transactions/fetchTransactions',
  async () => {
    const {data: apiTransactions} = await axiosApi.get<ApiTransactions | null>('/transactions.json');
    const {data: apiCategories} = await axiosApi.get<ApiCategories | null>('/categories.json');

    if (!apiCategories) {
      return [];
    }

    if (!apiTransactions) {
      return [];
    }

    const transactions: Transaction[] = [];

    Object.keys(apiTransactions).forEach(id => {
      const transaction = apiTransactions[id];
      const category = apiCategories[transaction.category];

      if (category) {
        transactions.push({
          ...transaction,
          id,
          category: {
            ...category,
            id: transaction.category,
          },
        });
      }
    });

    transactions.sort((a, b ) => a.createdAt > b.createdAt ? -1 : 1);

    return transactions;
  }
);
