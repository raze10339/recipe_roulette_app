import { useEffect } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import { useStore } from './store';

import Header from './components/Header';

import Landing from './pages/Landing';
import UserShops from './pages/UserShops';
import ShopForm from './pages/ShopForm';
import WineForm from './pages/WineForm';
import AuthForm from './pages/AuthForm';
import NotFound from './pages/NotFound';

function App() {
  const store = useStore();

  if (!store) {
    throw new Error("Store is not available");
  }
  
  const { state } = store;
  const location = useLocation();

  // Create an object of page titles to use for the browser tab
  const titles: {[key: string]: string} = {
    '/': 'Wine Tracker - Home',
    '/register': 'Wine Tracker - Register',
    '/login': 'Wine Tracker - Log In',
    '/shops': 'Wine Tracker - View Shops',
    '/shops/create': 'Wine Tracker - Create Shop',
    '/wines/add': 'Wine Tracker - Add Wine',
  };

  useEffect(() => {
    // Grab the corresponding title based on the current route - what comes after localhost:5173
    
    const title = titles[location.pathname];

    // Set the browser tab title when the location of the browser changes
    document.title = title || ' Page Not Found';
  }, [location]);

  return (
    <>
      {state.loading && (
        <>
          <div className="loading d-flex justify-content-center align-items-center">
            <h2>Pouring ...</h2>
          </div>
        </>
      )}

      <Header />

      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Landing />} />

          {state.user ? (
            <>
              <Route path="/shops" element={<UserShops />} />
              <Route path="/shops/create" element={<ShopForm />} />
              <Route path="/wines/add" element={<WineForm />} />              
            </>
          ) : (
            <>
              <Route path="/register" element={<AuthForm isLogin={false} />} />
              <Route path="/login" element={<AuthForm isLogin={true} />} />
            </>
          )}
{/* Fallback route that showe */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
