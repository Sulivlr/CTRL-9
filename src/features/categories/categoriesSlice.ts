import {createSlice} from '@reduxjs/toolkit';

export interface CategoriesState {
  modalOpen: boolean;
}

const initialState: CategoriesState = {
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
  extraReducers: () => {},
  selectors: {
    showModalCloseModal: (state) => state.modalOpen,
    hideModalModal: (state) => state.modalOpen,
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
} = categoriesSlice.selectors;