import { Loader } from './components/index.js';
import { useSelector } from 'react-redux';
import AppRouter from './Router/AppRouter.jsx';

function App() {
  const loading = useSelector((state) => state.loader.loading);


  if (loading) {
    return <Loader />
  }

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
