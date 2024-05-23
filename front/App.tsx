import Workspace from '@layouts/Workspace';
import Channel from '@pages/Channel';
import DirectMessage from '@pages/DirectMessage';
import withAuth from '@hoc/withAuth';
import React, { Suspense, lazy } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { SWRConfig, SWRConfiguration } from 'swr';
import useUserStore from '@store/UserStore';

const LoginComponent = withAuth(lazy(() => import('@pages/Login')));
const SignUpComponent = withAuth(lazy(() => import('@pages/SignUp')));

const WorkSpaceComponent = withAuth(Workspace);
const ChannelComponent = withAuth(Channel);
const App = () => {
  const { userId, setUserId } = useUserStore();
  const navigate = useNavigate();

  const swrOption: SWRConfiguration = {
    // dedupingInterval: 8000,
    // errorRetryCount: 0,
    revalidateOnFocus: false,
    onError: (err, key, config) => {
      console.log('err', err.response.status === 401);
      if (err.response.status === 401) {
        navigate('/login');
      }
      // if (key === 'getUser') {
      //   setUserId(-1);
      //   userId;
      // }
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
