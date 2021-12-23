import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Image, Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { FaUpload  } from "react-icons/fa";
// import Logo from "../../../../assets/images/User.jpeg";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/actions/actions_login";
import { adminDetails } from "../../../../store/actions/actions_admin";
import { useDropzone } from "react-dropzone";

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logoutSuccess } = useSelector(state => state.account);
  const { admin } = useSelector(state => state.adminReducer);
  const [ uploadedFile, setUploadedPhoto ] = useState("");
  
  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (logoutSuccess) {
      window.location.href = "/zonal_pastor_login";
    }
  }, [ logoutSuccess, history ]);

  useEffect(() => {
    dispatch(adminDetails());
  }, [ dispatch ]);

  useEffect(() => {
    if (admin?.church_logo?.length > 0) {
      setUploadedPhoto(admin?.church_logo)
    }
  }, [ admin ]);

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
          <Menu.Item onClick={() => history.push("/zonal_pastor")} key="1" icon={<DashboardOutlined />}>
            Churches
          </Menu.Item>
          <Menu.Item key="5" onClick={() => history.push("/zonal_pastor/reports")} icon={<FileOutlined />}>
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