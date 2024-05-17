import React, { useState } from 'react';
import {
  ChatContent,
  ChatDate,
  ChatForm,
  ChatHeader,
  ChatItem,
  ChatWrap,
  TextWrap,
} from './styles';
import UserSquareIcon from '@components/UserSquareIcon';
import HashIcon from '@components/Icon/HashIcon';
import useInput from '@hooks/useInput';
import useEnterPress from '@hooks/useEnterPress';

interface IChat {
  id: number;
  userEmail: string;
  name: string;
  text: string;
  date: string;
  time: string;
}

const chatListDummy = [
  {
    id: 0,
    userEmail: 'asda@naver.com',
    name: '왕희도',
    text: 'asdasdasdasdasdadsasd',
    date: '2024-05-24',
    time: '오후 12:00',
  },
  {
    id: 1,
    userEmail: 'asda@naver.com',
    name: '왕희도',
    text: 'asdasdasdasdasdadsasd',
    date: '2024-05-24',
    time: '오후 12:00',
  },
  {
    id: 2,
    userEmail: 'asda@naver.com',
    name: '왕희도',
    text: 'asdasdasdasdasdadsasd',
    date: '2024-05-24',
    time: '오후 12:00',
  },
  {
    id: 3,
    userEmail: 'asda@naver.com',
    name: '왕희도',
    text: 'asdasdasdasdasdadsasd',
    date: '2024-05-24',
    time: '오후 12:00',
  },
];

const Chat = () => {
  const {
    value: chatVal,
    setValue: setChatVal,
    onChangeInput: onChangeChatVal,
  } = useInput({
    initValue: '',
  });
  const [chatList, setChatList] = useState<IChat[]>(chatListDummy || []);
  console.log('chatList', chatList);
  const { handlePressEnter } = useEnterPress();

  /** 채팅 폼 제출 */
  const handleSubmitChat = () => {
    const inputVal = {
      id: chatList[chatList.length - 1].id + 1 || 0,
      userEmail: 'asda@naver.com',
      name: '왕희도',
      text: chatVal,
      date: '2024-05-24',
      time: '오후 12:00',
    };
    setChatList([...chatList, inputVal]);
    setChatVal('');
  };

  return (
    <ChatWrap>
      <ChatHeader>
        <h2>
          <HashIcon />
          랜덤
        </h2>
      </ChatHeader>
      <ChatContent>
        <ChatDate>
          <span>2024-05-24</span>
        </ChatDate>
        {chatList.map((chat) => (
          <ChatItem key={chat.id}>
            <UserSquareIcon email="asda@naver.com" />
            <TextWrap>
              <div className="text-top">
                <strong>{chat.name}</strong>
                <em>{chat.time}</em>
              </div>
              <p>{chat.text}</p>
            </TextWrap>
          </ChatItem>
        ))}
      </ChatContent>
      <ChatForm onSubmit={handleSubmitChat}>
        <textarea
          autoFocus={true}
          wrap="hard"
          onKeyDown={(e) => handlePressEnter(e, handleSubmitChat)}
          value={chatVal}
          onChange={onChangeChatVal}
        />
        <button type="submit">보내기</button>
      </ChatForm>
    </ChatWrap>
  );
};

export default Chat;
