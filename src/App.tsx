import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import Layout from './layouts/Layout';
import { Loader } from './components/Loader';

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          path=""
          element={<Suspense fallback={<Loader />}>
            <Home />
          </Suspense>}
        />

        <Route
          path="cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />

        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<Loader />}>
              <FullPizza />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
