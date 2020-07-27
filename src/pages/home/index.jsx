import React,{useEffect} from "react";
import { Row } from "antd";
import { connect } from "react-redux";
import LeftSection from "../../components/leftSection";
import RightSection from "../../components/rightSection";
import apiRequest from "../../apiRequest";
const Home = (props) => {
  
  useEffect(() => {
    apiRequest.getTripData(props.urls).then((results) => {
      props.updateTripData(results.data);
    })
  },[]);
  return (
    <div className="App">
      <div className="header">
        <h4>Trip</h4>
      </div>
      <Row className="trip-wrapper">
        <LeftSection />
        <RightSection />
      </Row>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    urls: state.url,
    tripDatas: state.allTripDatas
  };
};
const mapDispacthToProps = dispatch => {
  return {
    updateTripData: values => {
      dispatch({ type: "TRIPDATA", value: values });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(Home);
