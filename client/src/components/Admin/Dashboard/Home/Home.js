import React from "react";
import { Route } from "react-router-dom";
import { Layout } from 'antd';

import Sidebar from "../Sidebar/Sidebar";
import Head from "../Header/Head";
import Dashboard from "./Dasboard";
import NewChurch from "../Church/NewChurch/NewChurch";
import ChurchList from "../Church/ChurchList/ChurchList";
import { Reports } from "../Reports/Reports";
import { ZonalPastorList } from "../ZonalPastor/ZonalPastorList";
import { ResidentPastorList } from "../Resident_pastor/ResidentPastorList";
import { RegionalPastorList } from "../regional_pastor/RegionalPastorList";

const { Content, Footer } = Layout;

const Home = (props) => {
  const { match } = props; 
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Head />
        <Content className="dashboard-container-wrapper">
          <div className="site-layout-background dashboard-content">
            <Route exact path={`${match.url}`} render={(props) => <Dashboard {...props} />} />
            <Route exact path={`${match.url}/create-church`} render={(props) => <NewChurch {...props} />} />
            <Route exact path={`${match.url}/church-list`} render={(props) => <ChurchList {...props} />} />
            <Route exact path={`${match.url}/regional_pastors`} render={(props) => <RegionalPastorList {...props} />} />
            <Route exact path={`${match.url}/resident_pastors`} render={(props) => <ResidentPastorList {...props} />} />
            <Route exact path={`${match.url}/zonal_pastors`} render={(props) => <ZonalPastorList {...props} />} />
            <Route exact path={`${match.url}/reports`} render={(props) => <Reports {...props} />} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2021 Developed by Onoja Igoche Matthew</Footer>
      </Layout>
    </Layout>
  );
}

export default Home;