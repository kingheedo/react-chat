import React from 'react';
import { Outlet } from 'react-router-dom';

const Workspace = () => {
  return (
    <div>
      워크스페이스
      <Outlet />
    </div>
  );
};

export default Workspace;
