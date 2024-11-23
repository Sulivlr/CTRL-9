import CategoryModal from './CategoryModal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectCategories,
  selectCategoryIsFetching,
  selectCategoryIsRemoving,
  showCategoriesModal
} from './categoriesSlice';
import {useCallback, useEffect} from 'react';
import {deleteCategory, fetchCategories} from './categoriesThunks';
import Spinner from '../../components/Spinners/Spinner';
import {toast} from 'react-toastify';
import ButtonSpinner from '../../components/Spinners/ButtonSpinner';

const CategoriesList = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoryIsFetching);
  const isDeleting = useAppSelector(selectCategoryIsRemoving);
  const openModal = useCallback(() => {
    dispatch(showCategoriesModal());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onRemove =  async (id: string) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
      await dispatch(fetchCategories());
      toast.success('Category removed');
    } catch {
      toast.error('Something went wrong');
    }
  };

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
                <strong>{category.name}</strong>
                <span style={{color: category.type === 'income' ? 'green' : 'red'}}>{category.type}</span>
                <div>
                  <button
                    onClick={() => onRemove(category.id)}
                    disabled={isDeleting === category.id}
                    className="btn btn-danger"
                  >
                    {isDeleting === category.id && <ButtonSpinner/>}
                    Delete
                  </button>
                </div>
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