import { IChat } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useMemo, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

type UseGetChannelChats = {
  workspaceUrl: string;
  channelName: string;
};

const perPage = 20;

const useGetChannelChats = ({
  workspaceUrl,
  channelName,
}: UseGetChannelChats) => {
  const scrollbarRef = useRef<Scrollbars | null>(null);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // 끝에 도달
    return `/api/workspaces/${workspaceUrl}/channels/${channelName}/chats?perPage=${perPage}&page=${pageIndex + 1}`; // SWR 키
  };

  const {
    data: channelChats,
    isLoading,
    setSize,
    mutate: mutateChannelChats,
  } = useSWRInfinite<IChat[]>(getKey, fetcher, {
    onSuccess: (data) => {
      if (data.length === 1) {
        setTimeout(() => {
          scrollbarRef.current?.scrollToBottom();
        }, 50);
      }
    },
  });

  const isLastData = useMemo(() => {
    if (
      channelChats &&
      channelChats[channelChats.length - 1].length < perPage
    ) {
      return true;
    } else {
      return false;
    }
  }, [channelChats, perPage]);

  return {
    channelChats,
    isLoading,
    isLastData,
    scrollbarRef,
    setSize,
    mutateChannelChats,
  };
};

export default useGetChannelChats;
