import request from '@apis/request';
import { mutate } from 'swr';

interface PostSendDmReq {
  params: { workspaceUrl: string; userId: string };
  body: { content: string };
}

const postSendDmApi = ({ params, body }: PostSendDmReq) => {
  return request
    .post(
      `/api/workspaces/${params.workspaceUrl}/dms/${params.userId}/chats`,
      body,
    )
    .then((res) => res.data);
};
const useSendDm = () => {
  const postSendDm = (payload: PostSendDmReq) =>
    mutate('postSendDm', () => postSendDmApi(payload));

  return {
    postSendDm,
  };
};

export default useSendDm;
