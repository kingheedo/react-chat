import Workspace from '@layouts/Workspace';
import Channel from '@pages/Channel';
import DirectMessage from '@pages/DirectMessage';
import withAuth from '@hoc/withAuth';
import React, { Suspense, lazy } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { SWRConfig, SWRConfiguration } from 'swr';

const LoginComponent = withAuth(lazy(() => import('@pages/Login')));
const SignUpComponent = withAuth(lazy(() => import('@pages/SignUp')));

const WorkSpaceComponent = withAuth(Workspace);
const ChannelComponent = withAuth(Channel);
const App = () => {
  const swrOption: SWRConfiguration = {
    errorRetryCount: 0,
    revalidateOnFocus: false,
    onError: (err, key, config) => {
      console.log('err', err);
    },
  };
  return (
    <SWRConfig value={swrOption}>
      <Suspense fallback={<div>로딩중 ...</div>}>
        <Routes>
          <Route path="/" element={<WorkSpaceComponent />}>
            <Route
              path="/workspace/:workspaceUrl/channel/:channelName"
              element={<ChannelComponent />}
            />
            <Route
              path="/workspace/:workspaceUrl/dm/:userId"
              element={<DirectMessage />}
            />
          </Route>
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="*" element={<div>404 not found</div>} />
        </Routes>
      </Suspense>
    </SWRConfig>
  );
};

export default App;
