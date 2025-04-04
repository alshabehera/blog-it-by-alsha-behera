import React from "react";

import PropTypes from "prop-types";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Header from "./Header";

const Container = ({ children, className = "", title,actionType,setActionType,handleDelete,handleSubmit,handlePreview, showMenu}) => (
  <div className="flex w-full relative">
  <Sidebar />
  <div className="flex flex-col w-full ml-20 mr-5">
    <div className="flex justify-between">
    <Navbar {...{ title }} /> 
     {actionType && <Header {...{actionType,setActionType,handleDelete,handleSubmit,handlePreview,showMenu}}/>
}
    </div>
    <div className={classNames("px-10", [className])}>{children}</div>
  </div>
</div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;