import Test from '@components/Test';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LoginComponent = lazy(() => import('@pages/Login'));
const SignUpComponent = lazy(() => import('@pages/SignUp'));

const App = () => {
  return (
    <Suspense fallback={<div>로딩중 ...</div>}>
      <Routes>
        <Route index path="/" element={<Test />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="*" element={<Test />} />
      </Routes>
    </Suspense>
  );
};

export default App;
