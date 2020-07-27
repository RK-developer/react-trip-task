import React from "react";
import { Col } from "antd";
import Calender from "../calender";

const RightSection = () => {
  return (
    <Col span={8} className="right-col">
      <h3>Date</h3>
      <Calender />
    </Col>
  );
};

export default RightSection;
