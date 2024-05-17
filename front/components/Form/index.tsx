import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  FormEl,
  FormError,
  FormInput,
  FormInputWrap,
  FormLabel,
  FormSubmitBtn,
} from './styles';
import { isAxiosError } from 'axios';

interface IFormProps {
  enabled: boolean;
  onSubmit: () => Promise<void> | void;
}

interface ILabelProps {
  htmlFor: string;
  text: string;
}

interface IInputProps extends React.ComponentProps<'input'> {
  isError?: boolean;
  errorMsg?: string;
}

interface IFormContext {
  isSubmit: boolean;
  formErrorMsg: string;
}

const FormContext = createContext<IFormContext>({
  isSubmit: false,
  formErrorMsg: '',
});

const Form = ({
  enabled,
  onSubmit,
  children,
}: IFormProps & PropsWithChildren) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrorMsg, setFormErrorMsg] = useState('');

  /** 폼 제출 시
   *
   * 1. props 함수 실행
   * 2. 에러메시지있으면 초기화
   * 3. 제출상태 초기화
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!enabled) {
      return null;
    }
    try {
      await onSubmit();
      if (formErrorMsg) {
        setFormErrorMsg('');
      }
      setIsSubmit(false);
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        console.log('err.response.data', err.response.data);

        setFormErrorMsg(err.response.data);
      }
    }
  };

  const formValue = useMemo(
    () => ({
      isSubmit,
      formErrorMsg,
    }),
    [isSubmit],
  );

  return (
    <FormContext.Provider value={formValue}>
      <FormEl onSubmit={handleSubmit}>
        {children}
        {formErrorMsg && <Form.Error>{formErrorMsg}</Form.Error>}
      </FormEl>
    </FormContext.Provider>
  );
};

const Label = (props: ILabelProps) => {
  const { text } = props;
  return <FormLabel {...props}>{text}</FormLabel>;
};

const Input = (props: IInputProps) => {
  const { isError, errorMsg } = props;
  const { isSubmit } = useForm();

  return (
    <FormInputWrap className="input-wrap">
      <FormInput error={isSubmit && isError} autoComplete="off" {...props} />
      {isSubmit && isError && (
        <strong className="error">
          <svg
            data-w3c="true"
            data-qa="info"
            aria-hidden="true"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15M1 10a9 9 0 1 1 18 0 9 9 0 0 1-18 0m10-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-.25 3.25a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>{errorMsg}</span>
        </strong>
      )}
    </FormInputWrap>
  );
};

const SubmitBtn = ({ children }: PropsWithChildren) => {
  return <FormSubmitBtn type="submit">{children}</FormSubmitBtn>;
};

const Error = ({ children }: PropsWithChildren) => {
  return <FormError>{children}</FormError>;
};

Form.Label = Label;
Form.Input = Input;
Form.SubmitBtn = SubmitBtn;
Form.Error = Error;

const useForm = () => useContext(FormContext);

export default Form;
