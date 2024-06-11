import React, { useMemo } from 'react';
import { EditorWrap } from '../styles';
import ReactQuill, { UnprivilegedEditor } from 'react-quill';
import SendIcon from '@components/Icon/SendIcon';
import useInput from '@hooks/useInput';
import DeltaStatic from 'quill';
import Sources from 'quill';
import { useParams } from 'react-router-dom';

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'indent',
  'link',
];

/** 빈칸 여부 */
const isEmpty = (value: string) => {
  if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
    return true;
  }
  return false;
};

const CheckPattern = (content: string) => {
  const pattern = /@\[(.+?)\]\((\d+?)\)/g;
  const str = content.match(pattern) + '';
  const matchedArr = str?.match(pattern);
  return matchedArr;
};

interface IEditorProps {
  handleSubmit: (content: string) => void;
}
const Editor = ({ handleSubmit }: IEditorProps) => {
  const { value: chatVal, setValue: setChatVal } = useInput({
    initValue: '',
  });
  const params = useParams();

  /** vlaue 핸들러 */
  const handleChatVal = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    let arr = CheckPattern(editor.getText());

    if (arr) {
      arr = (arr + '').match(/@\[(.+?)\]\((\d+?)\)/);
      setChatVal(
        `<a href=http://localhost:3090/workspace/${params.workspaceUrl}/dm/${arr![2]}>@${arr![1]}</a>`
      );
    } else {
      setChatVal(value);
    }
  };

  /** 채팅 폼 제출 */
  const handleSubmitChat = async () => {
    if (isEmpty(chatVal)) {
      return;
    }
    await handleSubmit(chatVal);
    setChatVal('');
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
      ],
    };
  }, []);

  return (
    <EditorWrap
      className="editor-wrap"
      onKeyDownCapture={(e) => {
        if (
          e.key === 'Enter' &&
          !(
            e.getModifierState('Shift') ||
            e.getModifierState('Alt') ||
            e.getModifierState('Control')
          )
        ) {
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
      <button className="submit-btn" onClick={handleSubmitChat}>
        <SendIcon />
      </button>
    </EditorWrap>
  );
};

export default Editor;
