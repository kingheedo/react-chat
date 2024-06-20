import { IDM } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useMemo, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

interface GetUserReq {
  params: { workspaceUrl: string; userId: string };
}

const perPage = 20;

const useGetDms = ({ params }: GetUserReq) => {
  const scrollbarRef = useRef<Scrollbars | null>(null);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // 끝에 도달
    return `/api/workspaces/${params.workspaceUrl}/dms/${params.userId}/chats?perPage=${perPage}&page=${pageIndex + 1}`; // SWR 키
  };
  const {
    data: dms,
    mutate: mutateDms,
    size,
    setSize,
    error,
    isLoading,
    isValidating,
  } = useSWRInfinite<IDM[]>(getKey, fetcher, {
    onSuccess: (data) => {
      if (data.length === 1) {
        setTimeout(() => {
          scrollbarRef.current?.scrollToBottom();
        }, 50);
      }
    },
  });
  const isLastData = useMemo(() => {
    if (dms && dms[dms.length - 1].length < perPage) {
      return true;
    } else {
      return false;
    }
  }, [dms, perPage]);

  return {
    dms,
    mutateDms,
    size,
    setSize,
    isLastData,
    error,
    isLoading,
    isValidating,
    scrollbarRef,
  };
};

export default useGetDms;
