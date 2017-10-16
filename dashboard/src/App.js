import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Redirect, Switch} from 'react-router-dom';
import {Login} from './app/login';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {ArticlePage} from './app/article';
import {getToken} from './services/auth';
import './App.css';

const { Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path={'/login'} render={() => (
              <Login/>
            )} />
            <Route path={'/'} render={() => (
              getToken() ?
                <Dashboard/> :
                <Redirect to={'/login'}/>
            )} />
          </Switch>
        </div>
      </Router>
    );
  }
}


class Dashboard extends Component {

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render () {

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to={'/article'}>
                <Icon type="pie-chart" />
                文章首页
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={'/login'}>
                <Icon type="desktop" />
                登录
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/*<Header style={{ background: '#fff', padding: 0 }} />*/}
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {/*将默认的跳转到 index*/}
              <Route exact path={'/'} render={() => (
                <Redirect to={'/article'} />
              )}/>
              <Route path={'/article'} component={ArticlePage} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            H?
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
