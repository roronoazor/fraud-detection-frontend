import React from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";
import { Icon } from "../../../../components/Component";

const ToastUI = ({ success, error, info }) => {
    const [isOpen , setisOpen] = React.useState(false);

    const toggle = () => {setisOpen(!isOpen)};
    return (
      <Toast isOpen={isOpen}>
        <ToastHeader
          toggle={toggle}
          close={
            <>
              <button className="close" onClick={toggle}>
                <Icon name="cross-sm" />
              </button>
            </>
          }
        >
        {success && <span className="text-success"></span>}
        {error && <span className="text-error"></span>}
        {info && <span className="text-primary"></span>}
        </ToastHeader>
        <ToastBody>Hello, world! This is a toast message.</ToastBody>
      </Toast>
    )
  }


export default ToastUI;