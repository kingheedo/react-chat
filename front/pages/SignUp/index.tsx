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

  const onSubmit = () => {
    // 1. 회원가입 api요청
    // 2.로그인 페이지로 리다이렉트
  };

  return (
    <Section className="signup">
      <header>
        <Link to="/">React-Chat</Link>
      </header>
      <main>
        <Form
          enabled={
            !!(email && nickName && password && passwordCheck) &&
            !!password &&
            !!passwordCheck &&
            password === passwordCheck
          }
        >
          <Form.Label htmlFor="email" text={'Email address'} />
          <Form.Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="name@work-email.com"
            isError={!email}
            errorMsg="이메일을 입력해주세요."
          />

          <Form.Label htmlFor="nickName" text={'Nickname'} />
          <Form.Input
            type="text"
            id="nickName"
            name="nickName"
            value={nickName}
            onChange={onChangeNickName}
            placeholder="Nickname"
            isError={!nickName}
            errorMsg="닉네임을 입력해주세요."
          />

          <Form.Label htmlFor="password" text={'Password'} />
          <Form.Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            placeholder="************"
            isError={
              !password ||
              ((!!password || !!passwordCheck) && password !== passwordCheck)
            }
            errorMsg={
              !password
                ? '비밀번호를 입력해주세요'
                : '비밀번호가 일치하지 않습니다.'
            }
          />

          <Form.Label htmlFor="passwordCheck" text={'Password Check'} />
          <Form.Input
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            placeholder="************"
            isError={
              !passwordCheck ||
              ((!!password || !!passwordCheck) && password !== passwordCheck)
            }
            errorMsg={
              !passwordCheck
                ? '비밀번호를 입력해주세요'
                : '비밀번호가 일치하지 않습니다.'
            }
          />

          <Form.SubmitBtn>SignUp</Form.SubmitBtn>
        </Form>
      </main>
    </Section>
  );
};

export default SignUp;
