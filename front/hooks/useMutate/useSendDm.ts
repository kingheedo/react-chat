import authInstance from '@apis/authInstance';
import { mutate } from 'swr';

interface PostSendDmReq {
  params: { workspaceUrl: string; userId: string };
  body: { content: string };
}

const postSendDmApi = ({ params, body }: PostSendDmReq) => {
  return authInstance
    .post(
      `/api/workspaces/${params.workspaceUrl}/dms/${params.userId}/chats`,
      body
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
