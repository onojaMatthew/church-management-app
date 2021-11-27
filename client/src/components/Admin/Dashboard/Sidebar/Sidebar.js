import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Image, Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileOutlined,
  LogoutOutlined
} from '@ant-design/icons'; 
import { FaUserFriends, FaChurch } from "react-icons/fa"
import Logo from "../../../../assets/images/User.jpeg";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/actions/actions_login";

const { Sider } = Layout;
const { SubMenu } = Menu;

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
          <Menu.Item key="2" onClick={() => history.push("/dashboard/coordinators")} icon={<FaUserFriends />}>
            Coordinator
          </Menu.Item>
          <Menu.Item onClick={() => history.push("/dashboard/create-church")} key="3" icon={<FaChurch />}>
            Create Church
          </Menu.Item>
          <Menu.Item key="4" onClick={() => history.push("/dashboard/church-list")} icon={<FaChurch />}>
            Church List
          </Menu.Item>
          <Menu.Item key="5" onClick={() => history.push("/dashboard/reports")} icon={<FileOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item onClick={onLogout} key="6" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}

export default Sidebar;