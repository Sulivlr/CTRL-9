import CategoryModal from './CategoryModal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories, selectCategoryIsFetching, showCategoriesModal} from './categoriesSlice';
import {useCallback, useEffect} from 'react';
import {fetchCategories} from './categoriesThunks';
import Spinner from '../../components/Spinners/Spinner';

const CategoriesList = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoryIsFetching);
  const openModal = useCallback(() => {
    dispatch(showCategoriesModal());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <h2 className="d-flex justify-content-between">
        <span>Categories</span>
        <button
          className="btn btn-primary" onClick={openModal}>Add
        </button>
      </h2>
      {isLoading ? (<Spinner/>) : (
        <div>
          {categories.map((category) => (
            <div className="card mb-2">
              <div key={category.id}
                   className="card-body d-flex justify-content-between">
                <span>{category.name}</span>
                <span style={{color: category.type === 'income' ? 'green' : 'red'}}>{category.type}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <CategoryModal/>
    </div>
  );
};

export default CategoriesList;