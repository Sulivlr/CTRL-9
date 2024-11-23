import {createSlice} from '@reduxjs/toolkit';
import {createCategory, deleteCategory, fetchCategories} from './categoriesThunks';
import {Category} from '../../types';

export interface CategoriesState {
  items: Category[]
  isCreating: boolean;
  isFetching: boolean;
  isRemoving: string | null;
  modalOpen: boolean;
}

const initialState: CategoriesState = {
  items: [],
  isCreating: false,
  isFetching: false,
  isRemoving: null,
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
    });

    builder.addCase(deleteCategory.pending, (state, {meta: {arg: id}}) => {
      state.isRemoving = id;
    }).addCase(deleteCategory.fulfilled, (state) => {
      state.isRemoving = null;
    }).addCase(deleteCategory.rejected, (state) => {
      state.isRemoving = null;
    });
  },
  selectors: {
    showModalCloseModal: (state) => state.modalOpen,
    hideModalModal: (state) => state.modalOpen,
    selectCategoryIsCreating: (state) => state.isCreating,
    selectCategoryIsFetching: (state) => state.isFetching,
    selectCategoryIsRemoving: (state) => state.isRemoving,
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
  selectCategoryIsRemoving,
} = categoriesSlice.selectors;