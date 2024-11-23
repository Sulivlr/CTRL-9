import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import TransactionsList from './features/transactions/TransactionsList';
import CategoriesList from './features/categories/CategoriesList';
import TransactionModal from './features/transactions/TransactionModal';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<TransactionsList/>}/>
          <Route path="/categories" element={<CategoriesList/>}/>
          <Route path="*" element={<h1>Page Doesn't Exist!</h1>}/>
        </Routes>
        <TransactionModal/>
      </Layout>
    </>
  );
};

export default App;
