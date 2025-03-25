import React from "react";

import PropTypes from "prop-types";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Container = ({ children, className = "", title }) => (
  <>
  <div className="flex h-screen w-screen">
    <Sidebar/>
    <div className="flex flex-col p-10 w-full pb-20">
    <Navbar {...{title}} />
    <div className={classNames("px-6", [className])}>
      {children}
    </div>
    </div>
    </div>
   
    
  </>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;