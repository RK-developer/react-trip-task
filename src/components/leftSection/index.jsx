import React from "react";
import { Col } from "antd";
import CardView from "../cardview";

const LeftSection = () => {
  return (
    <Col span={16} className="left-col">
      <h3>Trip List</h3>
      <CardView />
    </Col>
  );
};

export default LeftSection;
