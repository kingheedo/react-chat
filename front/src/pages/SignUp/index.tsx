import Form from '@components/Form';
import React from 'react';
import { Section } from './styles';
import useInput from '@hooks/useInput';
import { Link, useNavigate } from 'react-router-dom';
import useSignUp from '@hooks/useMutate/useSignUp';

const SignUp = () => {
  const {
    value: email,
    setValue: setEmail,
    onChangeInput: onChangeEmail,
  } = useInput<string>({
    initValue: '',
  });
  const {
    value: nickName,
    setValue: setNickName,
    onChangeInput: onChangeNickName,
  } = useInput<string>({
    initValue: '',
  });
  const {
    value: password,
    setValue: setPassword,
    onChangeInput: onChangePassword,
  } = useInput<string>({
    initValue: '',
  });
  const {
    value: passwordCheck,
    setValue: setPasswordCheck,
    onChangeInput: onChangePasswordCheck,
  } = useInput<string>({
    initValue: '',
  });
  const { postSignUp } = useSignUp();
  const navigate = useNavigate();

  /** 폼 제출시
   *
   * 1. state 초기화
   * 2. 로그인 페이지로 이동
   */
  const onSubmit = async () => {
    await postSignUp({
      email,
      nickname: nickName,
      password,
    }).then(() => {
      setEmail('');
      setNickName('');
      setPassword('');
      setPasswordCheck('');
      navigate('/login');
    });
  };

  return (
    <Section className="signup">
      <header>
        <Link to="/">Chat</Link>
      </header>
      <main>
        <Form
          enabled={
            !!(email && nickName && password && passwordCheck) &&
            !!password &&
            !!passwordCheck &&
            password === passwordCheck
          }
          onSubmit={onSubmit}
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
        <p>
          이미 계정이 있으신가요?
          <Link to="/login">로그인하러 가기</Link>
        </p>
      </main>
    </Section>
  );
};

export default SignUp;
