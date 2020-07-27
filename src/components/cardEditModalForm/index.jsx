import React,{useState} from "react";
import {Modal, Button, Spin} from "antd";
import CardEditForm from "../cardEditForm";

const CardEditFormModal = (props) => {
    const[cardModalSpin, setCardModalSpin] = useState(false);
    const[isDisable, setIsDisable] = useState(false);
    return(
        
            <Modal
            title="Edit Card Form"
            centered
            visible={props.cardModalVisible}
            footer={
                <Button form="cardEditForm" type="primary" htmlType="submit" disabled={isDisable ? "disabled" : ""}>Update</Button>
            }
            >
            <Spin spinning={cardModalSpin} tip="Loading...">
            <CardEditForm 
                cardModalVisible={props.cardModalVisible}  
                setCardModalVisible={props.setCardModalVisible }  
                setCardModalSpin={setCardModalSpin} 
                setIsDisable={setIsDisable}

            />
            </Spin>
            </Modal>
        
    )
};

export default CardEditFormModal;