import React, { useEffect } from "react";
import {
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import { Avatar, Image, Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileOutlined,
  BankFilled,
  LogoutOutlined
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
          <Menu.Item onClick={() => navigate.push(`${match && match.url}/members`)} key="2" icon={<FileOutlined />}>
            Member Management
          </Menu.Item>
          <Menu.Item onClick={() => navigate.push(`${match && match.url}/groups`)} key="3" icon={<FileOutlined />}>
            Officers 
          </Menu.Item>
          <Menu.Item onClick={() => navigate.push(`${match && match.url}/groups`)} key="4" icon={<FileOutlined />}>
            Group and Subgroups
          </Menu.Item>
          <SubMenu key="sub1" icon={<BankFilled />} title="Events and Programs">
            <Menu.Item key="6" onClick={() => navigate.push(`${match && match.url}/programs`)}>Programs</Menu.Item>
            <Menu.Item key="7" onClick={() => navigate.push(`${match && match.url}/birthdays`)}>Birthday Events</Menu.Item>
            <Menu.Item key="8" onClick={() => navigate.push(`${match && match.url}/weddings`)}>Wedding Events</Menu.Item>
          </SubMenu>
          <Menu.Item onClick={onLogout} key="9" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}

export default Sidebar;