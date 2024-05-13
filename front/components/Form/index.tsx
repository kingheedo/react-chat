import React, {
  ChangeEvent,
  PropsWithChildren,
  createContext,
  useState,
} from 'react';
import { FormEl, FormInput, FormLabel, FormSubmitBtn } from './styles';

interface IFormProps {
  enabled: boolean;
}

interface ILabelProps {
  htmlFor: string;
  text: string;
}

interface IInputProps extends React.ComponentProps<'input'> {}

interface IFormContext {}

const FormContext = createContext<null>(null);

const Form = ({ enabled, children }: IFormProps & PropsWithChildren) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!enabled) {
      return null;
    }
    console.log('폼 제출');
  };

  return (
    <FormContext.Provider value={null}>
      <FormEl onSubmit={handleSubmit}>{children}</FormEl>
    </FormContext.Provider>
  );
};

const Label = (props: ILabelProps) => {
  const { text } = props;
  return <FormLabel {...props}>{text}</FormLabel>;
};

const Input = (props: IInputProps) => {
  return <FormInput {...props} />;
};

const SubmitBtn = ({ children }: PropsWithChildren) => {
  return <FormSubmitBtn type="submit">{children}</FormSubmitBtn>;
};

Form.Label = Label;
Form.Input = Input;
Form.SubmitBtn = SubmitBtn;

export default Form;
