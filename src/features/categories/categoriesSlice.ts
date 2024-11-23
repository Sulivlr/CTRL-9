import {createSlice} from '@reduxjs/toolkit';
import {createCategory, fetchCategories} from './categoriesThunks';
import {Category} from '../../types';

export interface CategoriesState {
  items: Category[]
  isCreating: boolean;
  isFetching: boolean;
  modalOpen: boolean;
}

const initialState: CategoriesState = {
  items: [],
  isCreating: false,
  isFetching: false,
  modalOpen: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    showCategoriesModal: (state) => {
      state.modalOpen = true;
    },
    hideCategoriesModal: (state) => {
      state.modalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCategory.pending, (state) => {
      state.isCreating = true;
    }).addCase(createCategory.fulfilled, (state) => {
      state.isCreating = false;
    }).addCase(createCategory.rejected, (state) => {
      state.isCreating = false;
    });

    builder.addCase(fetchCategories.pending, (state) => {
      state.isFetching = true;
    }).addCase(fetchCategories.fulfilled, (state, {payload: category}) => {
      state.isFetching = false;
      state.items = category;
    }).addCase(fetchCategories.rejected, (state) => {
      state.isFetching = false;
    })
  },
  selectors: {
    showModalCloseModal: (state) => state.modalOpen,
    hideModalModal: (state) => state.modalOpen,
    selectCategoryIsCreating: (state) => state.isCreating,
    selectCategoryIsFetching: (state) => state.isFetching,
    selectCategories: (state) => state.items,
  }
});

export const categoriesReducer = categoriesSlice.reducer;
export const {
  showCategoriesModal,
  hideCategoriesModal
} = categoriesSlice.actions;
export const {
  showModalCloseModal,
  hideModalModal,
  selectCategoryIsCreating,
  selectCategoryIsFetching,
  selectCategories,
} = categoriesSlice.selectors;