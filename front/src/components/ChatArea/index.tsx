import React, { RefObject, lazy, useMemo } from 'react';
import { ChatWrap } from './styles';
import { IChat, IDM } from '@typings/db';
import ContentListWrap from './ContentList';
import HeaderWrap from './HeaderWrap';
import Scrollbars from 'react-custom-scrollbars-2';
import { useParams } from 'react-router-dom';

const LazyEditorComponent = lazy(
  () => import('@components/ChatArea/Editor/index')
);

export enum Role {
  DM = 'DM',
  CHAT = 'CHAT',
}

interface IChatChatAreaProps {
  role: Role;
  list: (IDM | IChat)[][];
  isLastData: boolean;
  isLoading: boolean;
  scrollbarRef: RefObject<Scrollbars>;
  handleSubmit: (content: string) => void;
  handleUpdate: () => Promise<void>;
}

const ChatArea = ({
  role,
  list,
  isLastData,
  isLoading,
  scrollbarRef,
  handleSubmit,
  handleUpdate,
}: IChatChatAreaProps) => {
  // const mentionConversion = (content: string) => {
  //   const pattern = /@\[(.+?)\]\((\d+?)\)/g;
  //   const str = content.match(pattern) + '';
  //   const matchedArr = str?.match(pattern);
  //   if (matchedArr) {
  //     return `<a href=http://localhost:3090/workspace/${params.workspaceUrl}/dm/${matchedArr![2]}>
  //         @${matchedArr![1]}
  //       </a>`;
  //   } else {
  //     return content;
  //   }

  // return regexifyString({
  //   pattern: /@\[(.+?)\]\((\d+?)\)/g,
  //   decorator: (match, index) => {
  //     console.log('match', match.match(/@\[(.+?)\]\((\d+?)\)/));
  //     const matchedArr = match.match(/@\[(.+?)\]\((\d+?)\)/);
  //     if (matchedArr) {
  //       return (
  //         <Link to={`/workspace/${params.workspaceUrl}/dm/${matchedArr[2]}`}>
  //           @{matchedArr[1]}
  //         </Link>
  //       );
  //     } else {
  //       return content;
  //     }
  //   },
  //   input: content,
  // });
  // };
  const params = useParams<'channelName'>();

  /** 채팅 헤더 내용
   *
   * 1. 채널이면 채널명
   * 2. DM이면 Receiver의 닉네임
   */
  const headerContent = useMemo(() => {
    if (list.length > 0 && list[0][0] && 'Receiver' in list[0][0]) {
      return (list[0][0] as IDM).Receiver.nickname;
    } else {
      return params.channelName || '';
    }
  }, [list, params.channelName]);

  return (
    <ChatWrap className="chat-wrap">
      <HeaderWrap content={headerContent} />
      <ContentListWrap
        role={role}
        list={list}
        handleUpdate={handleUpdate}
        isLoading={isLoading}
        isLastData={isLastData}
        scrollbarRef={scrollbarRef}
      />
      <LazyEditorComponent handleSubmit={handleSubmit} />
    </ChatWrap>
  );
};

export default ChatArea;
