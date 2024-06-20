import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';
import {
  CenterModalBody,
  CenterModalCoseBtn,
  CenterModalFooter,
  CenterModalHead,
  CenterModalWrap,
} from './styles';
import BackDrop from '@components/BackDrop';

interface ICenterModalContext {
  isOpen: boolean;
  handleClose: () => void;
}

const CenterModalContext = createContext<ICenterModalContext>({
  isOpen: false,
  handleClose: () => null,
});

interface ICenterModalProps extends ICenterModalContext {}

const CenterModal = ({
  isOpen,
  handleClose,
  children,
}: ICenterModalProps & PropsWithChildren) => {
  const modalInfo = useMemo(
    () => ({
      isOpen,
      handleClose,
    }),
    [isOpen]
  );

  return (
    <CenterModalContext.Provider value={modalInfo}>
      {modalInfo.isOpen && (
        <BackDrop onClose={handleClose}>
          <CenterModalWrap
            onClick={(e) => e.stopPropagation()}
            className="center-modal-wrap"
          >
            {modalInfo.isOpen && children}
          </CenterModalWrap>
        </BackDrop>
      )}
    </CenterModalContext.Provider>
  );
};

const Head = ({ children }: PropsWithChildren) => {
  return <CenterModalHead className="head">{children}</CenterModalHead>;
};

const Body = ({ children }: PropsWithChildren) => {
  return <CenterModalBody className="body">{children}</CenterModalBody>;
};

const Footer = ({ children }: PropsWithChildren) => {
  return <CenterModalFooter className="footer">{children}</CenterModalFooter>;
};

const CloseBtn = () => {
  const { handleClose } = useCenterModal();
  return (
    <CenterModalCoseBtn onClick={handleClose}>
      <svg
        data-106="true"
        data-qa="close"
        aria-hidden="true"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M16.53 3.47a.75.75 0 0 1 0 1.06L11.06 10l5.47 5.47a.75.75 0 0 1-1.06 1.06L10 11.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L8.94 10 3.47 4.53a.75.75 0 0 1 1.06-1.06L10 8.94l5.47-5.47a.75.75 0 0 1 1.06 0"
          clipRule="evenodd"
        ></path>
      </svg>
    </CenterModalCoseBtn>
  );
};
CenterModal.Head = Head;
CenterModal.Body = Body;
CenterModal.Footer = Footer;
CenterModal.CloseBtn = CloseBtn;

const useCenterModal = () => useContext(CenterModalContext);
export default CenterModal;
