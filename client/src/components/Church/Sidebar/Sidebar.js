import React, { useEffect, useCallback, useState } from "react";
import {
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import { Avatar, Layout, Menu, Image } from 'antd';
import { useDropzone } from "react-dropzone";
import {
  DashboardOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { FaUpload } from "react-icons/fa";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actions/actions_login";
import { adminDetails, churchLogo } from "../../../store/actions/actions_admin";


const { Sider } = Layout;

const Sidebar = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const navigate = useHistory();
  const { logoutSuccess } = useSelector(state => state.account);
  const { logo } = useSelector(state => state.adminReducer);
  const [ uploadedFile, setUploadedPhoto ] = useState("");
  
  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (logoutSuccess) {
      navigate.push("/church-login");
    }
  }, [ logoutSuccess, navigate ]);

  useEffect(() => {
    dispatch(churchLogo());
  }, [ dispatch ]);

  useEffect(() => {
    if (logo?.church_logo?.length > 0) {
      setUploadedPhoto(logo?.church_logo)
    }
  }, [ logo ]);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  return (
    <div className="side-container">
      <Sider>
        <div className="text-center mt-5 mb-4">
          <div {...getRootProps()} className="text-center s-file-uploader">
            <>
              <input {...getInputProps()} />
              <i className="ri-folder-reduce-fill"></i>
              {
              uploadedFile && uploadedFile.length > 0 ? 
                <Avatar size={100} src={<Image src={uploadedFile} alt="identity" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />} /> :
                isDragActive ?
                  <p style={{ color: "#FFFFFF"}}>Drop the files here ...</p> :
                  <div style={{ color: "#FFFFFF"}} className="mt-2">
                    <FaUpload />
                    <p>Upload</p>
                  </div>
              }
            </>
          </div>
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
          {/* <Menu.Item onClick={() => navigate.push(`${match && match.url}/settings`)} key="7" icon={<SettingFilled />}>
            Settings
          </Menu.Item> */}
          <Menu.Item onClick={onLogout} key="7" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}

export default Sidebar;