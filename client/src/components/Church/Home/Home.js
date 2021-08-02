import React from "react";
import { Route } from "react-router-dom";
import { Layout } from 'antd';

import Sidebar from "../Sidebar/Sidebar";
import Head from "../Header/Head";
import Dashboard from "./Dasboard";


const { Content, Footer } = Layout;

const ChurchHomePage = (props) => {
  const { match } = props;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Head />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background dashboard-content">
            <Route exact path={`${match.url}`} render={(props) => <Dashboard {...props} />} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2021 Developed by Onoja Igoche Matthew</Footer>
      </Layout>
    </Layout>
  );
}

export default ChurchHomePage;