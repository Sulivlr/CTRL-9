import {createSlice} from '@reduxjs/toolkit';
import {createCategory} from './categoriesThunks';

export interface CategoriesState {
  modalOpen: boolean;
  isCreating: boolean;
}

const initialState: CategoriesState = {
  modalOpen: false,
  isCreating: false,
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
  },
  selectors: {
    showModalCloseModal: (state) => state.modalOpen,
    hideModalModal: (state) => state.modalOpen,
    selectCategoryIsCreating: (state) => state.isCreating,
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
} = categoriesSlice.selectors;