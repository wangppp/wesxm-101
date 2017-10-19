import React, {Component} from 'react';
import {setToken, logOut} from '../../../services/auth';
import {withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import {fetch} from '../../../services/http';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  constructor (props) {
    super(props);
  }
  componentWillMount () {
    logOut();
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

      fetch.post('/login', login_data).then(
        response => {
          const json = response.data;
          if (json.status === true && json.access_token) {
            // 登录成功
            setToken(json.access_token);
            history.push('/');
          }
        },
        error => {
          console.log(error);
          alert(error.response ? error.response.message : '登录失败');
        }
      );
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <Row style={{marginTop: 100}}>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} />
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          <div style={{textAlign: 'center'}}>
            <h1>WESX内容管理系统</h1>
            <Icon style={{fontSize: 200, color: '#08c'}} type='cloud' />
          </div>
          <Form onSubmit={this.handleSubmit}>
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
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} />
      </Row>

    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
export default withRouter(WrappedHorizontalLoginForm);