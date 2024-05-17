import request from '@apis/request';
import useSWR from 'swr';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';

type GetChannelReq = string;
type GetChannelRes = {
  id: number;
  name: string;
  private: boolean;
  WorkspaceId: number;
  Members: {
    id: number;
  }[];
}[];

const GetChannelApi = (payload: GetChannelReq) => {
  return request
    .get<GetChannelRes>(`/api/workspaces/${payload}/channels`)
    .then((res) => res.data);
};
const useGetChannels = () => {
  const currentWorkSpace = useCurrentWorkSpace();
  const {
    data: channels,
    mutate: mutateGetChannel,
    error,
    isLoading,
    isValidating,
  } = useSWR(
    currentWorkSpace?.name ? 'GetChannel' : null,
    () => GetChannelApi(currentWorkSpace?.name || ''),
    {
      shouldRetryOnError: false,
    },
  );

  return {
    channels,
    mutateGetChannel,
    error,
    isLoading,
    isValidating,
  };
};

export default useGetChannels;
