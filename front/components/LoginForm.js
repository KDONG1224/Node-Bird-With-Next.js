import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();

  const { logInLoading, logInError } = useSelector((state) => state.user);
  console.log(logInError)

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  // const [id, setId] = useState('');
  // const onChangeId = useCallback((e) => {
  //   setId(e.target.value);
  // }, []);

  // const [password, setPassword] = useState('');
  // const onChangePassword = useCallback((e) => {
  //   setPassword(e.target.value);
  // }, []);

  // const style = useMemo(() => ({ marginTop: 10 }), []);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        {/* <ButtonWrapper style={style}> styled-components를 사용하기 싫을때 useMemo를 활용한다. 그래야 리렌더링 최적화가 된다. */}
        {/* 함수형 컴포넌트에서 리렌더링이 될때 다시 실행되지만, 훅스의 []부분이 바뀐게 없기 때문에 바뀐게 없다라고 하지만, 
        인라인 스타일을 사용하면 바뀐 부분이 있다고 인식해서 그 부분을 다시 그리기 시작한다. 이것을 버츄얼 돔이라고 생각하면 된다. */}
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
      <div></div>
    </FormWrapper>
  );
};

export default LoginForm;
