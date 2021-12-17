import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Image, Avatar, Layout, Menu } from 'antd';
import { Spinner } from "reactstrap";
import {
  DashboardOutlined,
  FileOutlined,
  LogoutOutlined
} from '@ant-design/icons'; 
import { FaUserTie, FaChurch, FaTools, FaPlus, FaUpload } from "react-icons/fa"
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { logout } from "../../../../store/actions/actions_login";

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logoutSuccess } = useSelector(state => state.account);
  const { files, upload_loading } = useSelector(state => state.upload);
  const [ uploadedFile, setUploadedPhoto ] = useState("");
  
  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (logoutSuccess) {
      history.push("/");
    }
  }, [ logoutSuccess, history ]);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);

  const handlePhoto = (e) => {

  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  return (
    <div className="side-container">
      <Sider>
        <div className="text-center mt-5 mb-4">
          {/* <Avatar src={<FaChurch size="large" />} size={90}/> */}
          <div {...getRootProps()} className="text-center s-file-uploader">
            {upload_loading ?
              <p className="text-center">
                <Spinner className="my-loader">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>Uploading file. Please wait...
              </p> : 
               (
              <>
                <input {...getInputProps()} onChange={(e) => handlePhoto(e)} />
                <i className="ri-folder-reduce-fill"></i>
                {
                uploadedFile && uploadedFile.length > 0 ? 
                  <Image src={uploadedFile} alt="identity" style={{ width: "200px", height: "230px" }} /> :
                  isDragActive ?
                    <p style={{ color: "#FFFFFF"}}>Drop the files here ...</p> :
                    <div style={{ color: "#FFFFFF"}} className="mt-2">
                      <FaUpload />
                      <p>Upload</p>
                    </div>
                }
              </>
            )}
          </div>
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
          <Menu.Item key="8" onClick={() => history.push("/dashboard/settings")} icon={<FaTools />}>
            settings
          </Menu.Item>
          <Menu.Item onClick={onLogout} key="9" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}

export default Sidebar;