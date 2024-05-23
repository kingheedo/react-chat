import request from '@apis/request';
import useSWR from 'swr';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';
import fetcher from '@utils/fetcher';

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

const getChannelsApi = (payload: GetChannelReq) => {
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
  } = useSWR<GetChannelRes>(
    // currentWorkSpace?.name ? 'getChannels' : null,
    currentWorkSpace?.name
      ? `/api/workspaces/${currentWorkSpace?.name}/channels`
      : null,
    fetcher,
    {
      shouldRetryOnError: false,
    }
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
