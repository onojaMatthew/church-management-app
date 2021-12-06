import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileOutlined,
  LogoutOutlined
} from '@ant-design/icons'; 
import { FaUserTie, FaChurch } from "react-icons/fa"
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/actions/actions_login";

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logoutSuccess } = useSelector(state => state.account);
  
  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (logoutSuccess) {
      history.push("/");
    }
  }, [ logoutSuccess, history ]);

  return (
    <div className="side-container">
      <Sider>
        <div className="text-center mt-5 mb-4">
          <Avatar src={<FaChurch size="large" />} size={90}/>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item onClick={() => history.push("/dashboard")} key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item onClick={() => history.push("/dashboard/create-church")} key="2" icon={<FaChurch />}>
            Create Church
          </Menu.Item>
          <Menu.Item key="3" onClick={() => history.push("/dashboard/church-list")} icon={<FaChurch />}>
            Church List
          </Menu.Item>
          <Menu.Item key="4" onClick={() => history.push("/dashboard/resident_pastors")} icon={<FaUserTie />}>
            Resident Pastor
          </Menu.Item>
          <Menu.Item key="5" onClick={() => history.push("/dashboard/regional_pastors")} icon={<FaUserTie />}>
            Regional Pastors
          </Menu.Item>
          <Menu.Item key="6" onClick={() => history.push("/dashboard/zonal_pastors")} icon={<FaUserTie />}>
            Zonal Pastors
          </Menu.Item>
          <Menu.Item key="7" onClick={() => history.push("/dashboard/reports")} icon={<FileOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item onClick={onLogout} key="8" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}

export default Sidebar;