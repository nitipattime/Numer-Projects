import React from 'react';
import { Route,Link, BrowserRouter, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import Bisection from './component/numer/Root of Equation/Bisection';
import False from './component/numer/Root of Equation/False_position';
import Onepoint from './component/numer/Root of Equation/Onepoint';
import Newton from './component/numer/Root of Equation/Newton-raphson';
import Secant from './component/numer/Root of Equation/Secant';

import Creamer from './component/numer/Linear Algebra/Cramer';
import Gauss from './component/numer/Linear Algebra/Gauss';
import GaussJordan from './component/numer/Linear Algebra/Jordan';
import LU from './component/numer/Linear Algebra/LU';
import Cholesky from './component/numer/Linear Algebra/Cholesky';
import Jacobi from './component/numer/Linear Algebra/Jacobi';
import Seidel from './component/numer/Linear Algebra/Seidel';

import Lagrange from './component/numer/Interpolation/Lagrange';
import NewtonIn from './component/numer/Interpolation/Newton';
import Spline from './component/numer/Interpolation/Spline';

import Linear from './component/numer/Regression/Linear';
import Polynomial from './component/numer/Regression/Polynomial';
import Multiple from './component/numer/Regression/MultipleLinear';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">Numer</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={280}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<LaptopOutlined />} title="Root of Equation">
              {/* <Menu.Iem key="1">Graphical Method</Menu.Iem> */}
              <Menu.Item key="2" ><Link to = '/Bisection'>Bisection Method</Link></Menu.Item>
              <Menu.Item key="3"><Link to = '/False'>False-Position Method</Link></Menu.Item>
              <Menu.Item key="4"><Link to = '/Onepoint'>One-Point Iteration Method</Link></Menu.Item>
              <Menu.Item key="5"><Link to = '/Newton'>Newton-Raphson Method</Link></Menu.Item>
              <Menu.Item key="6"><Link to = '/Secant'>Secant Method</Link></Menu.Item>
            </SubMenu>

            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Linear Algebraic Equations">
              {/* <SubMenu key="sub2-1" icon={<LaptopOutlined />} title="Direct Method"> */}
                <Menu.Item key="7"><Link to = '/Creamer'>Cramer's Rule</Link></Menu.Item>
                <Menu.Item key="8"><Link to = '/Gauss'>Gauss Elimination Method</Link></Menu.Item>
                <Menu.Item key="9"><Link to = '/GaussJordan'>Gauss-Jordan Method</Link></Menu.Item>
                <Menu.Item key="10"><Link to = '/LU'>LU Decomposition Method</Link></Menu.Item>
                <Menu.Item key="11"><Link to = '/Cholesky'>Cholesky Decomposition Method</Link></Menu.Item>
              {/* </SubMenu> */}
              {/* <SubMenu key="sub2-2" icon={<LaptopOutlined />} title="Iterative Method"> */}
                <Menu.Item key="12"><Link to = '/Jacobi'>Jacobi</Link></Menu.Item>
                <Menu.Item key="13"><Link to = '/Seidel'>Seidel</Link></Menu.Item>
                <Menu.Item key="14"><Link to = '/'>option16</Link></Menu.Item>
                {/* <Menu.Item key="15">option17</Menu.Item> */}
              {/* </SubMenu> */}
            </SubMenu>

            <SubMenu key="sub3" icon={<LaptopOutlined />} title="Interpolation and Extrapolation">
              <Menu.Item key=""><Link to = '/Lagrange'>Lagrange</Link></Menu.Item>
              <Menu.Item key=""><Link to = '/NewtonIn'>Newton</Link></Menu.Item>
              <Menu.Item key=""><Link to = '/Spline'>Spline</Link></Menu.Item>
            </SubMenu>

            <SubMenu key="Regession" icon={<LaptopOutlined />} title="Leat-Squares Regression">
              <Menu.Item key=""><Link to = '/Linear'>Linear Regession</Link></Menu.Item>
              <Menu.Item key=""><Link to = '/Polynomial'>Polynomial Regession</Link></Menu.Item>
              <Menu.Item key=""><Link to = '/Multiple'>Multiple Linear Regression</Link></Menu.Item>
            </SubMenu>

          </Menu>
        </Sider>

        <Content style={{ padding: '0 24px', minHeight: 280 }}>

          {/* Content */}
          <Switch>
          <Route path = "/Bisection" component={Bisection}/>
          <Route path = "/False" component={False}/>
          <Route path = "/Onepoint" component={Onepoint}/>
          <Route path = "/Newton" component={Newton}/>
          <Route path = "/Secant" component={Secant}/>

          <Route path = "/Creamer" component={Creamer}/>
          <Route path = "/Gauss" component={Gauss}/>
          <Route path = "/GaussJordan" component={GaussJordan}/>
          <Route path = "/LU" component={LU}/>
          <Route path = "/Cholesky" component={Cholesky}/>
          <Route path = "/Jacobi" component={Jacobi}/>
          <Route path = "/Seidel" component={Seidel}/>

          <Route path = "/Lagrange" component={Lagrange}/>
          <Route path = "/NewtonIn" component={NewtonIn}/>
          <Route path = "/Spline" component={Spline}/>

          <Route path = "/Linear" component={Linear}/>
          <Route path = "/Polynomial" component={Polynomial}/>
          <Route path = "/Multiple" component={Multiple}/>
          
          </Switch>
        </Content>

      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
  </Layout>
  </BrowserRouter>

    );
  }
}

export default App;
