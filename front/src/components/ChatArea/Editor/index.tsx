import React, { useMemo, useRef, useState } from 'react';
import { EditorWrap } from '../styles';
import ReactQuill from 'react-quill/lib/index.js';
import type { UnprivilegedEditor } from 'react-quill';
import type Delta from 'quill-delta';
import SendIcon from '@components/Icon/SendIcon';
import useInput from '@hooks/useInput';
import { useParams } from 'react-router-dom';
import useUploadImages from '@hooks/useMutate/useUploadImages';
import 'react-quill/dist/quill.snow.css';

type DeltaStatic = Delta;
type Sources = 'api' | 'user' | 'silent';
const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'indent',
  'link',
  'image',
];

// Custom Mention Blot
// const Inline = Quill.import('blots/inline');

// interface MentionValue {
//   id: number;
//   value: string;
// }

// const MentionBlot = {
//   create(data: MentionValue) {
//     const node = document.createElement('span');
//     node.setAttribute('data-id', data.id.toString());
//     node.setAttribute('data-value', data.value);
//     node.classList.add('mention');
//     node.innerHTML = `@${data.value}`;
//     return node;
//   },
//   formats(node: HTMLElement) {
//     return {
//       id: node.getAttribute('data-id'),
//       value: node.getAttribute('data-value'),
//     };
//   },
// };

// Quill.register(MentionBlot, true);

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
  const quillRef = useRef<ReactQuill | null>(null);
  const inputImageRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();

  const { uploadImages } = useUploadImages();

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

  /** 이미지 클릭 시 */
  const onClickImageIcon = () => {
    console.log('hi');
    inputImageRef.current?.click();
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
        ],
        handlers: {
          image: onClickImageIcon,
        },
      },
      // mention: {
      //   allowedChars: /^[A-Za-z\s]*$/,
      //   mentionDenotationChars: ['@', '#'],
      //   source: function (searchTerm: any, renderList: any, mentionChar: any) {
      //     let values;

      //     if (mentionChar === '@') {
      //       values = atValues;
      //     } else {
      //       values = hashValues;
      //     }

      //     if (searchTerm.length === 0) {
      //       renderList(values, searchTerm);
      //     } else {
      //       const matches = [];
      //       for (let i = 0; i < values.length; i++)
      //         if (
      //           ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
      //         )
      //           matches.push(values[i]);
      //       renderList(matches, searchTerm);
      //     }
      //   },
      // },
    };
  }, []);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append('images', e.target.files[i]);
      }
    }
    try {
      const imageSrcRes = await uploadImages(formData);
      const editor = quillRef.current && quillRef.current.getEditor();
      if (!editor) {
        return;
      }
      for (let i = 0; i < imageSrcRes.length; i++) {
        const range = editor?.getSelection();
        range && editor.insertEmbed(range.index, 'image', imageSrcRes[i]);
        range && editor.setSelection(range.index + 1);
      }
    } catch (error) {
      console.error('upload imag error', error);
    }
  };

  // const [suggestions, setSuggestions] = useState<MentionValue[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  // const handleKeyUp = () => {
  //   const quill = quillRef.current?.getEditor();
  //   const range = quill?.getSelection();
  //   if (!range) return;

  //   const [leaf] = quill!.getLeaf(range.index - 1);
  //   const text = leaf ? (leaf.domNode as Text).textContent || '' : '';
  //   console.log('text', text.includes('@'));

  //   if (text.includes('@')) {
  //     const searchTerm = text.slice(1);
  //     const values: MentionValue[] = [
  //       { id: 1, value: 'John Doe' },
  //       { id: 2, value: 'Jane Doe' },
  //       { id: 3, value: 'Someone Else' },
  //     ];
  //     const matches = values.filter((val) =>
  //       val.value.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setSuggestions(matches);
  //     setShowSuggestions(true);

  //     const bounds = quill!.getBounds(range.index);
  //     setPosition({ top: bounds!.bottom, left: bounds!.left });
  //   } else {
  //     setShowSuggestions(false);
  //   }
  // };

  // const handleSuggestionClick = (suggestion: { id: number; value: string }) => {
  //   const quill = quillRef.current?.getEditor();
  //   const range = quill?.getSelection(true);

  //   if (!range || !quill) return;

  //   const textBeforeCursor = quill.getText(range.index - 1, range.index);
  //   const insertIndex = range.index - textBeforeCursor.length;
  //   const newText = `@${suggestion.value} `;

  //   // quill?.deleteText(insertIndex, textBeforeCursor.length);
  //   // quill?.insertText(insertIndex, newText, 'mention', suggestion);
  //   quill.clipboard.dangerouslyPasteHTML(`<a href='#'>${newText}</a>`);
  //   quill?.setSelection(insertIndex + newText.length);

  //   setShowSuggestions(false);
  // };

  // useEffect(() => {
  //   const quill = quillRef.current?.getEditor();
  //   quill?.on('text-change', handleKeyUp);
  //   return () => {
  //     quill?.off('text-change', handleKeyUp);
  //   };
  // }, []);
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
        ref={quillRef}
        modules={modules}
        formats={formats}
        placeholder="메시지 보내기"
        value={chatVal}
        onChange={handleChatVal}
      />
      {/* {showSuggestions && (
        <ul
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            background: 'white',
            border: '1px solid #ccc',
            listStyle: 'none',
            padding: '5px',
            margin: 0,
          }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: 'pointer', padding: '5px' }}
            >
              {suggestion.value}
            </li>
          ))}
        </ul>
      )} */}
      <input
        className="input-image"
        multiple
        ref={inputImageRef}
        type="file"
        accept="image/*"
        onChange={handleImage}
      />
      <button className="submit-btn" onClick={handleSubmitChat}>
        <SendIcon />
      </button>
    </EditorWrap>
  );
};

export default Editor;
