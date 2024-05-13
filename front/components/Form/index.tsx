import React, {
  ChangeEvent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  FormEl,
  FormInput,
  FormInputWrap,
  FormLabel,
  FormSubmitBtn,
} from './styles';

interface IFormProps {
  enabled: boolean;
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
}

const FormContext = createContext<IFormContext>({
  isSubmit: false,
});

const Form = ({ enabled, children }: IFormProps & PropsWithChildren) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!enabled) {
      return null;
    }
    console.log('폼 제출');
  };

  const formValue = useMemo(
    () => ({
      isSubmit,
    }),
    [isSubmit],
  );

  return (
    <FormContext.Provider value={formValue}>
      <FormEl onSubmit={handleSubmit}>{children}</FormEl>
    </FormContext.Provider>
  );
};

const Label = (props: ILabelProps) => {
  const { text } = props;
  return <FormLabel {...props}>{text}</FormLabel>;
};

const Input = (props: IInputProps) => {
  const { isError, errorMsg } = props;
  const form = useForm();

  console.log('form.isSubmit', form.isSubmit);
  console.log('isError', isError);
  console.log('둘다', form.isSubmit && isError);

  return (
    <FormInputWrap className="input-wrap">
      <FormInput
        error={form.isSubmit && isError}
        autoComplete="off"
        {...props}
      />
      {form.isSubmit && isError && (
        <strong className="error">
          <svg
            data-w3c="true"
            data-qa="info"
            aria-hidden="true"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15M1 10a9 9 0 1 1 18 0 9 9 0 0 1-18 0m10-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-.25 3.25a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0z"
              clip-rule="evenodd"
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

Form.Label = Label;
Form.Input = Input;
Form.SubmitBtn = SubmitBtn;

const useForm = () => useContext(FormContext);

export default Form;
