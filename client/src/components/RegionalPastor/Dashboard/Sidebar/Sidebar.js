import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/actions/actions_login";
import { FaChurch } from "react-icons/fa";

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
      window.location.href = "/regional_pastor_login";
    }
  }, [ logoutSuccess, history ]);

  return (
    <div className="side-container">
      <Sider>
        <div className="text-center mt-5 mb-4">
          <Avatar src={<FaChurch size="large" />} size={90}/>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item onClick={() => history.push("/regional_pastor")} key="1" icon={<DashboardOutlined />}>
            Churches
          </Menu.Item>
          <Menu.Item key="5" onClick={() => history.push("/regional_pastor/reports")} icon={<FileOutlined />}>
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