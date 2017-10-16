import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Redirect, Switch, withRouter} from 'react-router-dom';
import {Login} from './app/login';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {ArticlePage, AddNewArticle, ArticleDetail} from './app/article';
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

const MyMenu = withRouter(({history}) => (
  <Menu theme="dark" defaultSelectedKeys={['/article']} onClick={(item) => {
    history.push(item.key);
  }} mode="inline">
    <Menu.Item key="/article">
      <Icon type="pie-chart" />
      <span>
                文章首页
              </span>
    </Menu.Item>
    <Menu.Item key="/login">
      <Icon type="desktop" />
      <span>登录</span>
    </Menu.Item>
  </Menu>
));


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
          <MyMenu/>
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
              <Route exact path={'/article'} component={ArticlePage} />
              <Route exact path={'/article/new'} component={AddNewArticle} />
              <Route exact path={'/article/detail/:titleId'} component={ArticleDetail} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            copyright owned
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
