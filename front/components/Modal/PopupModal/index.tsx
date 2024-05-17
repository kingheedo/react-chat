import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Popup } from './styles';

interface IPopupContext {
  openIdx: number;
  listLength: number;
  buttonRefs: any;
  handlePopupIdx: (openIdx: number) => void;
}

interface IPopupModalProps {
  listLength: number;
  openIdx: number;
  handlePopupIdx: (openIdx: number) => void;
}

const PopupContext = createContext<IPopupContext>({
  openIdx: -1,
  listLength: -1,
  handlePopupIdx: () => null,
  buttonRefs: [],
});

const PopupModal = ({
  openIdx,
  listLength,
  handlePopupIdx,
  children,
}: IPopupModalProps & PropsWithChildren) => {
  const buttonRefs = useRef<HTMLLIElement[] | []>([]);

  const targetInfo = useMemo(
    () => ({
      openIdx: openIdx,
      listLength,
      buttonRefs,
      handlePopupIdx,
    }),
    [openIdx, buttonRefs],
  );

  useEffect(() => {
    handlePopupIdx(openIdx);
  }, [openIdx]);

  return (
    <PopupContext.Provider value={{ ...targetInfo }}>
      <Popup className="popup">{children}</Popup>
    </PopupContext.Provider>
  );
};

const Content = ({ children }: PropsWithChildren) => {
  const { openIdx, buttonRefs, handlePopupIdx } = usePopupModal();
  const topPixel = useMemo(() => {
    return buttonRefs.current[openIdx]?.getBoundingClientRect().top || 0;
  }, [openIdx]);

  const bottomPixel = useMemo(() => {
    return buttonRefs.current[openIdx]?.getBoundingClientRect().height || 0;
  }, [openIdx]);

  return (
    <div
      className={
        openIdx > -1 ? 'info-popup-content active' : 'info-popup-content'
      }
      onMouseEnter={() => handlePopupIdx(openIdx)}
      onMouseLeave={() => handlePopupIdx(-1)}
      style={{
        top: topPixel + bottomPixel + 2,
      }}
    >
      {children}
    </div>
  );
};

const Trigger = ({ children }: PropsWithChildren) => {
  const { buttonRefs, listLength, handlePopupIdx } = usePopupModal();

  return Array.from({ length: listLength }).map((_, index) => (
    <li
      className="trigger-btn"
      key={index}
      onMouseEnter={() => handlePopupIdx(index)}
      onMouseLeave={() => handlePopupIdx(-1)}
      ref={(el) => (buttonRefs.current[index] = el)}
    >
      {children}
    </li>
  ));
};

PopupModal.Content = Content;
PopupModal.Trigger = Trigger;

const usePopupModal = () => useContext(PopupContext);
export default PopupModal;
