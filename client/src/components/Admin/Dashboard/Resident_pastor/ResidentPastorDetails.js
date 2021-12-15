import {  Avatar, Image } from "antd";

import "./Residence.css";
// import { useState } from "react";

export const ResidentPastorDetails = ({
  pastorDetail,
  viewToggle,
}) => {
  let role = pastorDetail.role && pastorDetail.role?.role_name;
  const rolesplit = role.split("_");
  const role1 = rolesplit[0];
  const role2 = rolesplit[1];
  return (
    <div className="coord-body">
      <div className="cord-detail-card">
        <span className="close" onClick={() => viewToggle()}>X</span>
        <div className="coord-detail-inner-container">
          <p className="detail-name">{role1.charAt(0).toUpperCase() + role1.slice(1)}{" "}{role2}</p>
          <div className="info-cont">
            <Avatar style={{ marginBottom: 25 }} size={200} src={<Image src={pastorDetail?.image_url} />} />
            <p className="detail-email">{pastorDetail?.first_name}{" "} {pastorDetail?.last_name}</p>
            <p className="detail-email">{pastorDetail?.email}</p>
            <p className="detail-email"> {pastorDetail?.phone}</p>
            
          </div>
          
        </div>
      </div>

      
    </div>
  );
}