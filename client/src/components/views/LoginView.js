import React from 'react';
import { Login } from '../authentication';
import { Link } from 'react-router-dom';
import { Button, Header, FlexContainerVertical, Or } from '../basic-components';

export function LoginView() {
  return (
    <div>
      <Header />
      <FlexContainerVertical>
        <Login />
        <Or />
        <Link to="/register"><Button secondary>Register</Button></Link>
      </FlexContainerVertical>
    </div>
  );
}