import CategoryModal from './CategoryModal';
import {useAppDispatch} from '../../app/hooks';
import {showCategoriesModal} from './categoriesSlice';
import {useCallback} from 'react';

const CategoriesList = () => {
  const dispatch = useAppDispatch();

  const openModal = useCallback(() => {
    dispatch(showCategoriesModal());
  }, [dispatch]);

  return (
    <div>
      <h2 className="d-flex justify-content-between">
        <span>Categories</span>
        <button
          className="btn btn-primary" onClick={openModal}>Add</button>
      </h2>
      <CategoryModal/>
    </div>
  );
};

export default CategoriesList;