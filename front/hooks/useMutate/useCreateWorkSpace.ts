import authInstance from '@apis/authInstance';
import { mutate } from 'swr';

type CreateWorkSpaceReq = {
  name: string;
  url: string;
};

const useCreateWorkSpaceApi = (payload: CreateWorkSpaceReq) =>
  authInstance.post('/api/workspaces', payload);

/** 워크스페이스 생성하기 */
const useCreateWorkSpace = () => {
  const postCreateWorkSpace = (payload: CreateWorkSpaceReq) =>
    mutate('postCreateWorkSpace', () => useCreateWorkSpaceApi(payload));

  return {
    postCreateWorkSpace,
  };
};

export default useCreateWorkSpace;
