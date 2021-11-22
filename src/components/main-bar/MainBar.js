import React, { useState } from "react";

import CloseIcon from "@material-ui/icons/Close";
import Whatshot from "@material-ui/icons/Whatshot";
import NewReleases from "@material-ui/icons/NewReleases";
import TrendingUp from "@material-ui/icons/TrendingUp";
import Menu from "@material-ui/icons/Menu";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

import "./MainBar.css";

export default function MainBar({ fetchPost, activeTab }) {

  return (
      <>
    <div className="main-bar">
      <div className="filter-container">
        <div className={activeTab === 'hot' ? "filter-element hoverable": "filter-element-secondary hoverable"} onClick={() => fetchPost('hot')}>
          <Whatshot />
          <span>Hot</span>
        </div>
        <div className={activeTab === 'new' ? "filter-element hoverable": "filter-element-secondary hoverable"} onClick={() => fetchPost('new')}>
          <NewReleases />
          <span>New</span>
        </div>
        <div className={activeTab === 'top' ? "filter-element hoverable": "filter-element-secondary hoverable"} onClick={() => fetchPost('top')}>
          <TrendingUp />
          <span>Top</span>
        </div>
        <MoreHoriz className="filter-element-tertiary hoverable" />
        <div className="spacer"></div>
        <div className="filter-element-menu hoverable">
          <Menu />
          <ArrowDropDown />
        </div>
      </div>
      </div>
    </>
  );
}