import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Image, Avatar, Layout, Menu } from 'antd';
import { Spinner } from "reactstrap";
import {
  DashboardOutlined,
  FileOutlined,
  LogoutOutlined
} from '@ant-design/icons'; 
import { FaUserTie, FaChurch, FaTools, FaUpload } from "react-icons/fa";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { logout } from "../../../../store/actions/actions_login";
import { upload } from "../../../../store/actions/actions_uploader";
import { adminDetails, adminProfile } from "../../../../store/actions/actions_admin";

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logoutSuccess } = useSelector(state => state.account);
  const { admin, success } = useSelector(state => state.adminReducer);
  const { files, upload_loading, upload_success } = useSelector(state => state.upload);
  const [ isSidebar, setIsSidebar ] = useState(false);
  const [ isUpload, setIsUpload ] = useState(false);
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
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.name) {
      dispatch(upload(file));
      setIsSidebar(true);
    }
  }

  useEffect(() => {
    if (upload_success && isSidebar) {
      setUploadedPhoto(files.secure_url);
      setIsUpload(true)
    }
  }, [ upload_success ]);

  useEffect(() => {
    if (success && isSidebar) {
      setUploadedPhoto(admin?.church_logo);
      setIsUpload(false);
    }
  }, [ success ]);

  useEffect(() => {
    dispatch(adminDetails());
  }, [ dispatch ]);

  useEffect(() => {
    if (admin?.church_logo?.length > 0) {
      setUploadedPhoto(admin?.church_logo)
    }
  }, [ admin ]);

  useEffect(() => {
    if (isUpload === true && uploadedFile?.length > 0) {
      const data = { church_logo: uploadedFile };
      dispatch(adminProfile(data));
    }
  }, [ isUpload, dispatch, uploadedFile ]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});
  return (
    <div className="side-container">
      <Sider>
        <div className="text-center mt-5 mb-4">
          <div {...getRootProps()} className="text-center s-file-uploader">
            {upload_loading && isSidebar ?
              <p className="text-center">
                <Spinner className="my-loader">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </p> : 
               (
              <>
                <input {...getInputProps()} onChange={(e) => handlePhoto(e)} />
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
          <Menu.Item key="5" onClick={() => history.push("/dashboard/zonal_pastors")} icon={<FaUserTie />}>
            Zonal Pastors
          </Menu.Item>
          <Menu.Item key="6" onClick={() => history.push("/dashboard/regional_pastors")} icon={<FaUserTie />}>
            Regional Pastors
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