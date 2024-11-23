import {Transaction} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createTransaction, deleteTransaction, fetchTransactions} from './transactionThunk';
import {createCategory} from '../categories/categoriesThunks';

export interface TransactionSlice {
  items: Transaction[]
  isCreating: boolean;
  isFetching: boolean;
  isRemoving: string | null
  modalOpen: boolean;
}

const initialState: TransactionSlice = {
  items: [],
  isCreating: false,
  isFetching: false,
  isRemoving: null,
  modalOpen: false,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    showTransactionModal: (state) => {
      state.modalOpen = true;
    },
    hideTransactionModal: (state) => {
      state.modalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTransaction.pending, (state) => {
      state.isCreating = true;
    }).addCase(createCategory.fulfilled, (state) => {
      state.isCreating = false;
    }).addCase(createCategory.rejected, (state) => {
      state.isCreating = false;
    });

    builder.addCase(fetchTransactions.pending, (state) => {
      state.isFetching = true;
    }).addCase(fetchTransactions.fulfilled, (state, {payload: transaction}) => {
      state.isFetching = false;
      state.items = transaction;
    }).addCase(fetchTransactions.rejected, (state) => {
      state.isFetching = false;
    });

    builder.addCase(deleteTransaction.pending, (state,{meta: {arg: id}}) => {
      state.isRemoving = id;
    }).addCase(deleteTransaction.fulfilled, (state) => {
      state.isRemoving = null;
    }).addCase(deleteTransaction.rejected, (state) => {
      state.isRemoving = null;
    });
  },
  selectors: {
    selectShowTransactionModal: (state) => state.modalOpen,
    selectHideTransactionModal: (state) => state.modalOpen,
    selectTransactionIsCreating: (state) => state.isCreating,
    selectTransactionIsFetching: (state) => state.isFetching,
    selectTransactionIsRemoving: (state) => state.isRemoving,
    selectTransactions: (state) => state.items,
  }
});

export const transactionsReducer = transactionSlice.reducer;
export const {
  showTransactionModal,
  hideTransactionModal
} = transactionSlice.actions;
export const {
  selectShowTransactionModal,
  selectHideTransactionModal,
  selectTransactionIsCreating,
  selectTransactionIsFetching,
  selectTransactions,
  selectTransactionIsRemoving,
} = transactionSlice.selectors;