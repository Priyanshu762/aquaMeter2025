import { useState, useEffect } from 'react';
import { Loader } from './components/index.js';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/Layout/Layout.jsx';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);


  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Layout />
    </>
  )
}

export default App
