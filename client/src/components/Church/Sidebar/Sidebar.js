import React, { useEffect } from "react";
import {
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import { Avatar, Image, Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  BankFilled,
  LogoutOutlined,
  DollarCircleFilled,
  UsergroupAddOutlined,
  SettingFilled
} from '@ant-design/icons';
import Logo from "../../../assets/images/User.jpeg";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actions/actions_login";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const navigate = useHistory();
  const { logoutSuccess } = useSelector(state => state.account);
  
  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (logoutSuccess) {
      navigate.push("/church-login");
    }
  }, [ logoutSuccess, navigate ]);

  return (
    <div className="side-container">
      <Sider>
        <div className="text-center mt-5 mb-4">
          <Avatar src={<Image src={Logo} />} size={90}/>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item onClick={() => window.location.href = `${match && match.url}`} key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item onClick={() => navigate.push(`${match && match.url}/members`)} key="2" icon={<UsergroupAddOutlined />}>
            Member Management
          </Menu.Item>
          
          <Menu.Item onClick={() => navigate.push(`${match && match.url}/groups`)} key="3" icon={<UsergroupAddOutlined />}>
            Group and Subgroups
          </Menu.Item>
          <Menu.Item onClick={() => navigate.push(`${match && match.url}/programs`)} key="4" icon={<UsergroupAddOutlined />}>
            Events and Activities
          </Menu.Item>
          
          <Menu.Item onClick={() => navigate.push(`${match && match.url}/finance`)} key="5" icon={<UsergroupAddOutlined />}>
            Finance
          </Menu.Item>
          <Menu.Item onClick={() => navigate.push(`${match && match.url}/reports`)} key="6" icon={<UsergroupAddOutlined />}>
            Report
          </Menu.Item>
          <Menu.Item onClick={() => navigate.push(`${match && match.url}/settings`)} key="7" icon={<SettingFilled />}>
            Settings
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