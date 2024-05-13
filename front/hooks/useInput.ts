import { useCallback, useState } from 'react';

interface IUseInputProps<T> {
  initValue: T;
}

type ReturnTypes<T> = {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const useInput = <T>({ initValue }: IUseInputProps<T>): ReturnTypes<T> => {
  const [value, setValue] = useState<T>(initValue);

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value as T);
    },
    [],
  );

  return {
    value,
    setValue,
    onChangeInput,
  };
};

export default useInput;
