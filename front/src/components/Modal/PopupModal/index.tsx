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
import BackDrop from '@components/BackDrop';

interface IPopupContext {
  as: 'hover' | 'click';
  openIdx: number;
  buttonRefs: any;
  handlePopupIdx: (openIdx: number) => void;
}

interface IPopupModalProps {
  as: 'hover' | 'click';
  openIdx: number;
  handlePopupIdx: (openIdx: number) => void;
}

const PopupContext = createContext<IPopupContext>({
  as: 'hover',
  openIdx: -1,
  handlePopupIdx: () => null,
  buttonRefs: [],
});

const PopupModal = ({
  as,
  openIdx,
  handlePopupIdx,
  children,
}: IPopupModalProps & PropsWithChildren) => {
  const buttonRefs = useRef<HTMLLIElement[] | []>([]);
  const targetInfo = useMemo(
    () => ({
      as,
      openIdx: openIdx,
      buttonRefs,
      handlePopupIdx,
      handleClose,
    }),
    [as, openIdx, buttonRefs]
  );

  const handleClose = () => {
    handlePopupIdx(-1);
  };

  useEffect(() => {
    handlePopupIdx(openIdx);
  }, [openIdx]);

  return (
    <PopupContext.Provider value={{ ...targetInfo }}>
      {as === 'click' && (
        <>
          {openIdx > -1 && (
            <BackDrop
              style={{
                background: 'none',
              }}
              onClose={handleClose}
            />
          )}
          <Popup className="popup">{children}</Popup>
        </>
      )}
      {as === 'hover' && <Popup className="popup">{children}</Popup>}
    </PopupContext.Provider>
  );
};

const Content = ({ children }: PropsWithChildren) => {
  const { as, openIdx, buttonRefs, handlePopupIdx } = usePopupModal();
  const topPixel = useMemo(() => {
    return buttonRefs.current[openIdx]?.getBoundingClientRect().top || 0;
  }, [openIdx]);

  const heightPixel = useMemo(() => {
    return buttonRefs.current[openIdx]?.getBoundingClientRect().height || 0;
  }, [openIdx]);

  return (
    <div
      className={
        openIdx > -1 ? 'info-popup-content active' : 'info-popup-content'
      }
      {...(as === 'hover' && { onMouseEnter: () => handlePopupIdx(openIdx) })}
      {...(as === 'hover' && { onMouseLeave: () => handlePopupIdx(-1) })}
      style={{
        top: topPixel + heightPixel + 2,
      }}
    >
      {children}
    </div>
  );
};

interface ITriggerProps {
  idx: number;
}

const Trigger = ({ idx, children }: ITriggerProps & PropsWithChildren) => {
  const { as, buttonRefs, handlePopupIdx } = usePopupModal();

  return (
    <li
      className="trigger-btn"
      key={idx}
      //동적 속성추가
      {...(as === 'hover' && { onMouseEnter: () => handlePopupIdx(idx) })}
      {...(as === 'hover' && { onMouseLeave: () => handlePopupIdx(-1) })}
      {...(as === 'click' && {
        onClick: () => {
          handlePopupIdx(idx);
        },
      })}
      ref={(el) => (buttonRefs.current[idx] = el)}
    >
      {children}
    </li>
  );
};

PopupModal.Content = Content;
PopupModal.Trigger = Trigger;

const usePopupModal = () => useContext(PopupContext);
export default PopupModal;
