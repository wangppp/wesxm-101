import React, {Component} from 'react';
import {setToken} from '../../../services/auth';
import {withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

class Login extends Component {

  login (e) {
    e.preventDefault();

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



const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      // 拿到history 对象
      const {history} = this.props;

      const login_data = new FormData();
      for (const item in values) {
        login_data.append(item, values[item]);
      }
      let loginRequest = new Request('http://localhost:8889/login', {
        mode: 'cors',
        method: 'POST',
        body: login_data
      });
      fetch(loginRequest).then(response => {
        return response.json();
      }).then(json => {
        console.log(json);
        if (json.status === true && json.access_token) {
          // 登录成功
          setToken(json.access_token);
          history.push('/');
        }
      }).catch(error => {
        console.log(error);
        alert(error.response ? error.response.message : '登录失败');
      })
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
export default withRouter(WrappedHorizontalLoginForm);