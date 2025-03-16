import './index.css';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store/store.js';
import AppWrapper from './components/common/AppWrapper.jsx';


if (localStorage.getItem("darkMode") === "true") {
  document.documentElement.classList.add("dark");
}



createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <ToastContainer position='top-right' autoClose={3000} />
      <AppWrapper />
    </Provider>
  </>,
)
