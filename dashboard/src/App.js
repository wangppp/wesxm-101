import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import {Login} from './app/login';
import {getToken} from './services/auth';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path={'/'} render={() => (
            /*每次从localStorage里取出token是费时操作，在初始化的时候取出放在store里*/
            getToken() ? (
              <Dashboard/>
            ) : (
              <Redirect to={'/login'} />
            )
          )} />
          <Route path={'/login'} render={() => (
            <Login/>
          )} />
        </div>
      </Router>
    );
  }
}

// 根组件
const Root = (props) => (
  <div style={{
    display: 'flex'
  }} {...props} />
);

const Sidebar = (props) => (
  <div style={{
    width: '33vw',
    height: '100vh',
    overflow: 'auto',
    background: '#eee'
  }} {...props} />
);

const SidebarItem = (props) => (
  <div style={{
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    padding: '5px 10px'
  }} {...props} />
);

const Main = (props) => (
  <div style={{
    flex: 1,
    height: '100vh',
    overflow: 'auto'
  }}>
    <div style={{padding: '20px'}} {...props} />
  </div>
);


const Dashboard = () => (
  <Root>
    <Sidebar>
      <SidebarItem>
        <Link to={'/index'}>
          Hello, Route Here
        </Link>
      </SidebarItem>
      <SidebarItem>
        <Link to={'/login'}>
          Login
        </Link>
      </SidebarItem>
    </Sidebar>
    <Main>
      <Route path={'/index'} component={() => (
        <h2>Index is here, you can customize this page as a component.</h2>
      )} />
    </Main>
  </Root>
);

export default App;
