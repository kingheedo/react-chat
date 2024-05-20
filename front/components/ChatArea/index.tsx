import React, { useMemo } from 'react';
import {
  ChatContent,
  ChatDate,
  ChatHeader,
  ChatItem,
  ChatWrap,
  TextWrap,
} from './styles';
import UserSquareIcon from '@components/UserSquareIcon';
import HashIcon from '@components/Icon/HashIcon';
import useInput from '@hooks/useInput';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import { IDM } from '@typings/db';

interface IChat {
  id: number;
  userEmail: string;
  name: string;
  text: string;
  date: string;
  time: string;
}

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'indent',
  'link',
];

interface IChatChatAreaProps {
  list: IDM[];
  handleSubmit: (content: string) => void;
}

/** 빈칸 여부 */
const isEmpty = (value: string) => {
  if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
    return true;
  }
  return false;
};

const ChatArea = ({ list, handleSubmit }: IChatChatAreaProps) => {
  const { value: chatVal, setValue: setChatVal } = useInput({
    initValue: '',
  });
  // const [chatList, setChatList] = useState<IChat[]>(chatListDummy || []);

  /** 채팅 폼 제출 */
  const handleSubmitChat = () => {
    if (isEmpty(chatVal)) {
      return;
    }
    handleSubmit(chatVal);
    setChatVal('');
  };

  /** vlaue 핸들러 */
  const handleChatVal = (value: string) => {
    setChatVal(value);
  };

  const modules = useMemo(() => {
    return {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link'],
      ],
    };
  }, []);

  return (
    <ChatWrap className="chat-wrap">
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
        {list.map((chat) => (
          <ChatItem key={chat.id}>
            <UserSquareIcon email={chat.Sender.email} />
            <TextWrap>
              <div className="text-top">
                <strong>{chat.Sender.nickname}</strong>
                <em>{/* {chat.createdAt} */}</em>
              </div>
              <div
                className="view ql-editor"
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'pre-wrap',
                }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(chat.content),
                }}
              />
            </TextWrap>
          </ChatItem>
        ))}
      </ChatContent>
      <div
        style={{
          height: 180,
        }}
        onKeyDownCapture={(e) => {
          if (e.code === 'Enter') {
            e.preventDefault();
            handleSubmitChat();
          }
        }}
      >
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="메시지 보내기"
          value={chatVal}
          onChange={handleChatVal}
        />
        <button
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
          onClick={handleSubmitChat}
        >
          보내기
        </button>
      </div>
    </ChatWrap>
  );
};

export default ChatArea;
