import { useState } from 'react';

interface IUseInputProps<T> {
  initValue: T;
}

const useInput = <T>({
  initValue,
}: IUseInputProps<T>): {
  value: T;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
} => {
  const [value, setValue] = useState<T>(initValue);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e', e.target.value);

    setValue(e.target.value as T);
  };

  return {
    value,
    onChangeInput,
  };
};

export default useInput;
