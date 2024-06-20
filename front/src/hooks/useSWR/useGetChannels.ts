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

const useGetChannels = (workspaceUrl: string) => {
  const {
    data: channels,
    mutate: mutateGetChannel,
    error,
    isLoading,
    isValidating,
  } = useSWR<GetChannelRes>(
    `/api/workspaces/${encodeURIComponent(workspaceUrl)}/channels`,
    fetcher
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
