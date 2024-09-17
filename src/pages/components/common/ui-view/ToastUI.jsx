import React from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";
import { Icon } from "../../../../components/Component";

const ToastUI = ({ success, error, info, message='' }) => {
    const [isOpen , setisOpen] = React.useState(true);

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
          {success && <span className="text-success">Success</span>}
          {error && <span className="text-danger">Error</span>}
          {info && <span className="text-primary">Attention</span>}
          </ToastHeader>
          <ToastBody>{message}</ToastBody>
        </Toast>
      
    )
  }


export default ToastUI;