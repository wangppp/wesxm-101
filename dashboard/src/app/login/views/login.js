import React, {Component} from 'react';
import {setToken} from '../../../services/auth';
import {withRouter} from 'react-router-dom';

class Login extends Component {
  constructor (props) {
    super(props);
    this.login = this.login.bind(this);
  }
  login (e) {
    e.preventDefault();
    // 拿到history 对象
    const {history} = this.props;

    const login_data = new FormData(e.target);
    let loginRequest = new Request('http://localhost:8889/login', {
      mode: 'cors',
      method: 'POST',
      body: login_data
    });
    fetch(loginRequest).then(response => {
      return response.json();
    }).then(json => {
      if (json.status === true && json.access_token) {
        // 登录成功
        setToken(json.access_token);
        history.push('/');
      }
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <form action='/' onSubmit={this.login}>
        <input type='text' name='username' placeholder='用户名' />
        <input type='password' name='password' placeholder='密码' />
        <input type='submit'/>
      </form>
    );
  }
}

export default withRouter(Login);
