import Form from '@components/Form';
import React, { useMemo } from 'react';
import { Section } from './styles';
import useInput from '@hooks/useInput';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const { value: email, onChangeInput: onChangeEmail } = useInput<string>({
    initValue: '',
  });
  const { value: nickName, onChangeInput: onChangeNickName } = useInput<string>(
    {
      initValue: '',
    },
  );
  const { value: password, onChangeInput: onChangePassword } = useInput<string>(
    {
      initValue: '',
    },
  );
  const { value: passwordCheck, onChangeInput: onChangePasswordCheck } =
    useInput<string>({
      initValue: '',
    });

  return (
    <Section className="signup">
      <header>
        <Link to="/">React-Chat</Link>
      </header>
      <main>
        <Form enabled={!!(email && nickName && password && passwordCheck)}>
          <Form.Label htmlFor="email" text={'Email address'} />
          <Form.Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="name@work-email.com"
          />

          <Form.Label htmlFor="nickName" text={'Nickname'} />
          <Form.Input
            type="text"
            id="nickName"
            name="nickName"
            value={nickName}
            onChange={onChangeNickName}
            placeholder="name"
          />

          <Form.Label htmlFor="password" text={'Password'} />
          <Form.Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            placeholder="************"
          />

          <Form.Label htmlFor="passwordCheck" text={'Password Check'} />
          <Form.Input
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            placeholder="************"
          />

          <Form.SubmitBtn>SignUp</Form.SubmitBtn>
        </Form>
      </main>
    </Section>
  );
};

export default SignUp;
