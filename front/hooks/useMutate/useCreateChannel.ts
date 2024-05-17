import request from '@apis/request';
import { mutate } from 'swr';

type CreateChannelReq = {
  workspaceNameParam: string;
  data: {
    name: string;
  };
};

const useCreateChannelApi = (payload: CreateChannelReq) =>
  request.post(
    `/api/workspaces/${payload.workspaceNameParam}/channels`,
    payload.data,
  );

/** 워크스페이스 생성하기 */
const useCreateChannel = () => {
  const createChannel = (payload: CreateChannelReq) =>
    mutate('createChannel', () => useCreateChannelApi(payload));

  return {
    createChannel,
  };
};

export default useCreateChannel;
