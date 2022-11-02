
import React from "react";
import ReactDOM from "react-dom";


const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px", maxWidth: "100%",
    height: "400px", maxHeight: "100%",
    backgroundColor: "#FFFFFF", 
    zIndex: "999"
};
   
const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0", 
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: "777"
};

const Modal = ({ children }) => {
    return ReactDOM.createPortal(
        <>
        
        <div style={modalStyle}>{children}</div>
        <div style={overlayStyle}></div>

         </>,
         document.getElementById("modal")
        );
    };

export default Modal;