import React,{useState, useEffect} from "react";
import { Form, Input, message } from 'antd';
import { connect } from "react-redux";
import apiRequest from "../../apiRequest";

const CardEditForm = (props) => {
    const [form] = Form.useForm();
    const [formLayout] = useState('horizontal');


    const onFinish = values => {
        let CardEditValue = {
            activeId: props.currentEditId.id, 
            values: {
                destination: values.destination,
                comment: values.comments
            }
        },
        newTripAllData = [...props.tripDatas];
        props.setCardModalSpin(true);
        props.setIsDisable(true);
        apiRequest.updateTripData(props.urls,CardEditValue).then((results) => {
            //props.updateTripData(results.data);
            let curentObj = newTripAllData[props.currentEditId.index];

            if(curentObj.id === results.data.id) {
                Object.assign(curentObj, results.data);
                props.updateTripData(newTripAllData) ;
            }
            
            message.success("Card Updated successfully");
            props.setCardModalVisible(false);
            props.setCardModalSpin(false);
            props.setIsDisable(false);
        }).catch(error => {
            message.error("Something went wrong, Card not updated");
            props.setCardModalVisible(true);
            props.setCardModalSpin(false);
            props.setIsDisable(false);
        })

      };
    
      const onFinishFailed = errorInfo => {
        //console.log('Failed:', errorInfo);
      };

    const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;

    useEffect(() => {
        let carIndex = props.currentEditId.index
        form.setFieldsValue({
            destination: props.tripDatas[carIndex].destination,
            comments: props.tripDatas[carIndex].comment
        })
    }, [props,form])
    return (
        <div>
            <Form
                {...formItemLayout}
                layout={formLayout}
                form={form}
                id="cardEditForm"
                name="cardEditForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item 
                label="Destination"
                name="destination"
                rules={[{ required: true, message: 'Please enter destination!' }]}
                >
                <Input placeholder="Destination" />
                </Form.Item>
                
                <Form.Item 
                label="Comments"
                name="comments"
                rules={[{ required: true, message: 'Please enter comments!' }]}
                >
                <Input placeholder="Comments" />
                </Form.Item>
            </Form>
        </div>
    )
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
  )(CardEditForm);