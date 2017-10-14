import React, {Component} from 'react';

class Login extends Component {
  static login (e) {
    e.preventDefault();
    const login_data = new FormData(e.target);
    let loginRequest = new Request('http://localhost:8889/login', {
      mode: 'cors',
      method: 'POST',
      body: login_data
    });
    fetch(loginRequest).then(response => {
      console.log(response);
      return response.json();
    }).then(json => {
      console.log(json);
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <form action='/' onSubmit={Login.login}>
        <input type='text' name='username' placeholder='用户名' />
        <input type='password' name='password' placeholder='密码' />
        <input type='submit'/>
      </form>
    );
  }
}

export default Login;
