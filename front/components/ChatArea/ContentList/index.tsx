import React, { RefObject, useMemo } from 'react';
import { ChatItem, Scrollbar, TextWrap } from '../styles';
import UserSquareIcon from '@components/UserSquareIcon';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import { IChat, IDM } from '@typings/db';
import { ko } from 'date-fns/locale';
import Scrollbars, { positionValues } from 'react-custom-scrollbars-2';
import classifiedList from '@utils/classifiedList';
import { Role } from '..';

interface IContentListWrapProps {
  role: Role;
  list: (IDM | IChat)[][];
  isLastData: boolean;
  isLoading: boolean;
  scrollbarRef: RefObject<Scrollbars>;
  handleUpdate: () => Promise<void>;
}

const ContentListWrap = ({
  role,
  list,
  isLastData,
  isLoading,
  scrollbarRef,
  handleUpdate,
}: IContentListWrapProps) => {
  /** 스크롤바 핸들러 */
  const handleScrollBar = async (values: positionValues) => {
    if (values.scrollTop === 0 && !isLastData) {
      await handleUpdate().then(() => {
        setTimeout(() => {
          scrollbarRef.current?.scrollTop(
            scrollbarRef.current?.getScrollHeight() - values.scrollHeight
          );
        }, 100);
      });
    }
  };

  const ChatList = useMemo(() => {
    return classifiedList(list.flat().reverse());
  }, [list]);
  console.log('ChatList', ChatList[0]);

  return (
    <Scrollbar
      autoHide={true}
      onScrollFrame={handleScrollBar}
      ref={scrollbarRef}
      className="chat-content-list"
    >
      <div>{ChatContents(role, ChatList)}</div>
    </Scrollbar>
  );
};

const ChatContents = (role: Role, list: any) => {
  switch (role) {
    case Role.CHAT:
      return list.map((value: any, index: number) => (
        <div key={index} className="chat-content">
          <span className="date">{value[0]}</span>
          <em className="date-line" />
          {value[1].map((chat: IChat) => (
            <ChatItem key={chat.id + chat.createdAt.toString()}>
              <UserSquareIcon email={chat.User.email} />
              <TextWrap>
                <div className="chat-user">
                  <strong>{chat.User.nickname}</strong>
                  <em>{format(chat.createdAt, 'aa HH:MM', { locale: ko })}</em>
                </div>
                <div
                  className="chat-text"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(chat.content),
                  }}
                />
              </TextWrap>
            </ChatItem>
          ))}
        </div>
      ));
    case Role.DM:
      return list.map((value: any, index: number) => (
        <div key={index} className="chat-content">
          <span className="date">{value[0]}</span>
          <em className="date-line" />
          {value[1].map((chat: IDM) => (
            <ChatItem key={chat.id + chat.createdAt.toString()}>
              <UserSquareIcon email={chat.Sender.email} />
              <TextWrap>
                <div className="chat-user">
                  <strong>{chat.Sender.nickname}</strong>
                  <em>{format(chat.createdAt, 'aa HH:MM', { locale: ko })}</em>
                </div>
                <div
                  className="chat-text"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(chat.content),
                  }}
                />
              </TextWrap>
            </ChatItem>
          ))}
        </div>
      ));

    default:
  }
};

export default ContentListWrap;
