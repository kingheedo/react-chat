import AuthProvider from '@context/AuthProvider';
import Workspace from '@layouts/Workspace';
import Channel from '@pages/Channel';
import DirectMessage from '@pages/DircetMessage';
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';

const LoginComponent = lazy(() => import('@pages/Login'));
const SignUpComponent = lazy(() => import('@pages/SignUp'));

const App = () => {
  return (
    <SWRConfig>
      <AuthProvider>
        <Suspense fallback={<div>로딩중 ...</div>}>
          <Routes>
            <Route element={<Workspace />}>
              <Route
                path="/workspace/:workspaceUrl/channel/:channelName"
                element={<Channel />}
              />
              <Route
                path="/workspace/:workspaceUrl/dm/:userId"
                element={<DirectMessage />}
              />
              <Route path="*" element={<div>404 not found</div>} />
            </Route>
            <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/login" element={<LoginComponent />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </SWRConfig>
  );
};

export default App;
