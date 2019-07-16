import React from 'react';

export default function SignUp(props) {
  return (
    <form method="POST" action="/api/signup">
      <label>Username<input name="username" type="text" required/></label>
      <label>Email<input name="email" type="email" required/></label>
      <label>Password<input name="password" type="password" required /></label>
      <input type="submit" />
    </form>
  );
};
