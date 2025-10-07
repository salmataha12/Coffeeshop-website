import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '@/routes/routes';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
