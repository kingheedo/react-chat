import useInput from '@hooks/useInput';
import React from 'react';
import { Section } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import Form from '@components/Form';
import useSignIn from '@hooks/useMutate/useLogin';
import useGetUser from '@hooks/useSWR/useGetUser';
import useUserStore from '@store/UserStore';
import useLogIn from '@hooks/useMutate/useLogin';

const Login = () => {
  const {
    value: email,
    setValue: setEmail,
    onChangeInput: onChangeEmail,
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

  const { postLogin } = useLogIn();
  const navigate = useNavigate();
  const { setUserId } = useUserStore();
  const { user, getUser } = useGetUser();

  /** 로그인시
   *
   * 1. 로그인 api요청
   * 2. state 초기화
   * 3. optimistic ui 적용
   * 4. user 정보 가져와서 전역 상태에 저장
   * 5. 메인페이지로 이동
   */
  const onSubmit = async () => {
    try {
      const loginRes = await postLogin({
        email,
        password,
      });
      setEmail('');
      setPassword('');
      const getUserData = await getUser(user, {
        optimisticData: loginRes,
        rollbackOnError: true,
        populateCache: false,
        revalidate: false,
      });

      if (getUserData && getUserData.id > -1) {
        setUserId(getUserData.id);
        navigate('/workspace/channel');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Section className="signin">
      <header>
        <Link to="/">React-Chat</Link>
      </header>
      <main>
        <Form enabled={!!(email && password)} onSubmit={onSubmit}>
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

          <Form.Label htmlFor="password" text={'Password'} />
          <Form.Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            placeholder="************"
            isError={!password}
            errorMsg={
              !password
                ? '비밀번호를 입력해주세요'
                : '비밀번호가 일치하지 않습니다.'
            }
          />

          <Form.SubmitBtn>SignIn</Form.SubmitBtn>
        </Form>
        <p>
          처음 사용하시나요?
          <Link to="/signUp">계정 생성</Link>
        </p>
      </main>
    </Section>
  );
};

export default Login;
