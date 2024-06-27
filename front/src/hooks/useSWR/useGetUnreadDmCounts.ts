import fetcher from '@utils/fetcher';
import useSWR from 'swr';

type GetUnreadDmCountsReq = {
  workspaceUrl: string;
  receiverId: number;
  after: number;
};

const useGetUnreadDmCounts = ({
  workspaceUrl,
  receiverId,
  after,
}: GetUnreadDmCountsReq) => {
  const { data: unreadsDmsCounts, mutate: mutateUnreadsDmsCounts } = useSWR(
    `/api/workspaces/${workspaceUrl}/dms/${receiverId}/unread?after=${after}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  return {
    unreadsDmsCounts,
    mutateUnreadsDmsCounts,
  };
};

export default useGetUnreadDmCounts;
