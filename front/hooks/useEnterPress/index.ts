import React from 'react';

/** 엔터 키 입력 시 감지
 *
 * onEnter: 엔터키 입력 시 실행할 함수
 */
const useEnterPress = () => {
  const handlePressEnter = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    onEnter: () => void,
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onEnter();
    }
  };

  return {
    handlePressEnter,
  };
};

export default useEnterPress;
