import React, {
  ForwardedRef,
  RefObject,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { ChatWrap, Header } from './styles';
import 'react-quill/dist/quill.snow.css';
import { IChat, IDM } from '@typings/db';
import Editor from './Editor';
import ContentListWrap from './ContentList';
import HeaderWrap from './HeaderWrap';
import { useParams } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars-2';

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'indent',
  'link',
];

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

  return (
    <ChatWrap className="chat-wrap">
      <HeaderWrap />
      <ContentListWrap
        role={role}
        list={list}
        handleUpdate={handleUpdate}
        isLoading={isLoading}
        isLastData={isLastData}
        scrollbarRef={scrollbarRef}
      />
      <Editor handleSubmit={handleSubmit} />
    </ChatWrap>
  );
};

export default ChatArea;
