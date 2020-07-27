import React,{useState, useEffect} from "react";
import moment from "moment";
import { Card, Col, Row, Popconfirm, message, Spin} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import apiRequest from "../../apiRequest";
import CardEditFormModal from "../cardEditModalForm";

const CardView = (props) => {
  const[activeClass, setActiveClass] = useState(0);
  const[cardLoading, setCardLoading] = useState(false);
  const[cardModalVisible, setCardModalVisible] = useState(false);
  
  const tripCardClick = (id,index) => {
    setActiveClass(id);
    props.updateActiveRow(props.tripDatas[index]);
  }
  function confirm(e,id,index) {
    e.stopPropagation();
    let newTripData = [...props.tripDatas];
    setCardLoading(true);
    apiRequest.deleteTripData(props.urls,{activeId: id}).then((results) => {
      newTripData.splice(index,1);
      props.updateTripData(newTripData);
      message.success('Successfully Deleted');
      setCardLoading(false);
    }).catch(error => {
      message.error('Something went wrong, trip not deleted');
      setCardLoading(false);
    })
  }
  function editcardButton(id,index) {
    props.updateCurrentEditId({
      id: id,
      index: index,
    })
    setCardModalVisible(true)
  }
  function cancel(e) {
    e.stopPropagation();
    message.error('Trip not delete');
  }
  useEffect(() => {
    if(props.tripDatas[0] !== undefined) {
      props.updateActiveRow(props.tripDatas[0]);
      setActiveClass(props.tripDatas[0].id);
    }
    
  },[props])
  return (
    <div className="site-card-wrapper">
    <CardEditFormModal cardModalVisible={cardModalVisible} setCardModalVisible={setCardModalVisible}/>
     <Spin spinning={cardLoading} tip="Loading...">
      <Row gutter={16}>
       {
         
         Object.keys(props.tripDatas).map(key => {
          return (
            <Col span={8} className={activeClass === props.tripDatas[key].id ? "card-col active": "card-col"} key={'trip-'+props.tripDatas[key].id}>
            
              <Card
                title={props.tripDatas[key].destination}
                bordered={true}
                actions={[
                  <EditOutlined key="edit" title="Edit" onClick={(e) => editcardButton(props.tripDatas[key].id,key)} />,
                  <Popconfirm
                    title="Are you sure delete this trip?"
                    onConfirm={(e) => confirm(e, props.tripDatas[key].id, key)}
                    onCancel={(e) => cancel(e)}
                    okText="Yes"
                    cancelText="No"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DeleteOutlined key="delete" title="Delete" />
                  </Popconfirm>,
                ]}
              onClick={(e) => tripCardClick(props.tripDatas[key].id, key)}
              >
                <div className="trip-date">
                  <b className="mr10">Date:</b>{moment(props.tripDatas[key].start).format('MMM-DD-YYYY')}
                </div>
                <div className="trip-duration">
                  <b className="mr10">Duration:</b>{props.tripDatas[key].duration}
                </div>
                <div className="trip-commnet">
                  <b className="mr10">Comments:</b>{props.tripDatas[key].comment}
                </div>
              </Card>
            </Col>
          )

         })
       }
        
      </Row>
      </Spin>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    urls: state.url,
    tripDatas: state.allTripDatas,
    currentEditId: state.currentEditId
  };
};
const mapDispacthToProps = dispatch => {
  return {
    updateTripData: values => {
      dispatch({ type: "TRIPDATA", value: values });
    },
    updateActiveId: values => {
      dispatch({ type: "ACTIVEID", value: values })
    },
    updateActiveRow: values => {
      dispatch({type: "ACTIVEROW",value: values});
    },
    updateCurrentEditId: values => {
      dispatch({ type: "CURRENTEDITID",value: values })
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(CardView);
