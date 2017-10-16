import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {fetch} from '../../../services/http';
const { TextArea } = Input;
const FormItem = Form.Item;

class NewArticle extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          loading: true
        });
        fetch.post('/article/new', values).then(
          response => {
            this.props.form.resetFields();
            this.setState({
              loading: false
            });
          }
        )
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2 style={{marginBottom: 20}}>新增文章</h2>
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <FormItem>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题' }],
            })(
              <Input prefix={<Icon type="star" style={{ fontSize: 13 }} />} placeholder="标题" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请输入正文' }],
            })(
              <TextArea type="password" placeholder="正文" rows={10} />
            )}
          </FormItem>
          <FormItem>

            <Button loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button">
              确 定
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }

}
const WrappedNewArticle = Form.create()(NewArticle);

export default WrappedNewArticle;
