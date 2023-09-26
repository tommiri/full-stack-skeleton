import { SyntheticEvent, useContext, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import AuthContext from '../../shared/context/auth-context';
import { loginUser, signUpUser } from '../api/users';
import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/button/Button';

const Authenticate = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoginMode, setLoginMode] = useState(true);
  const { login } = useContext(AuthContext);

  const switchModeHandler = () => {
    setLoginMode((prevMode) => !prevMode);
  };

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: ({ id, token }) => {
      login(id, token);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ id, token }) => {
      login(id, token);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
    } else {
      signUpUserMutation.mutate({
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
    }
  };

  return (
    <div>
      <h2>{isLoginMode ? 'Login' : 'Sign up'}</h2>
      <form onSubmit={onSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="username"
            ref={usernameRef}
            type="text"
            label="Username"
            placeholder="Username"
          />
        )}
        <Input
          id="email"
          ref={emailRef}
          type="text"
          label="Email"
          placeholder="Email"
        />
        <Input
          id="password"
          ref={passwordRef}
          type="password"
          label="Password"
          placeholder="Password"
        />
        <Button type="submit">{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
      </form>
      <Button onClick={switchModeHandler}>
        {isLoginMode ? 'Sign up' : 'Login'} instead?
      </Button>
    </div>
  );
};

export default Authenticate;
