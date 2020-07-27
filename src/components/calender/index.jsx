import React, { useState,useEffect } from "react";
import { Calendar } from "antd";
import moment from "moment";
import { connect } from "react-redux";

const Calender = (props) => {
  
  const [value, setValue] = useState(moment());
  const onPanelChange = (value, mode) => {
    //console.log(value, mode);
  };
  useEffect(() => {
    if(props.activeRow.start !== '') {
      setValue(moment(props.activeRow.start));
    }
  },[props]);

  return (
    <div className="site-calendar-demo-card">
      <Calendar
        value={value}
        fullscreen={false}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    activeRow: state.activeRow,
    activeId: state.activeId,
    tripDatas: state.allTripDatas
  };
};
const mapDispacthToProps = dispatch => {
  return {
    updateActiveId: values => {
      dispatch({ type: "ACTIVEID", value: values })
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(Calender);
