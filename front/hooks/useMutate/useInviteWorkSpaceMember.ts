import authInstance from '@apis/authInstance';
import { useParams } from 'react-router-dom';
import { mutate } from 'swr';

type InviteMember = {
  email: string;
  workspaceUrl: string;
};

const useInviteWorkSpaceMemberApi = (payload: InviteMember) =>
  authInstance.post(`/api/workspaces/${payload.workspaceUrl}/members`, {
    email: payload.email,
  });

/** 워크스페이스에 멤버 초대하기 */
const useInviteWorkSpaceMember = () => {
  const postInviteWorkSpaceMember = (payload: InviteMember) =>
    mutate('postInviteWorkSpaceMember', () =>
      useInviteWorkSpaceMemberApi(payload)
    );

  return {
    postInviteWorkSpaceMember,
  };
};

export default useInviteWorkSpaceMember;
