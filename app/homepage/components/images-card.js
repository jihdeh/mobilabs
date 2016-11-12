import React, {PropTypes} from "react";
import {Card, CardTitle, Row, Col} from "react-materialize";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import withState from "recompose/withState";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import {pipe} from "ramda";
import { Map, toJS, List } from "immutable";
import {connect } from "react-redux";
import Select from "react-select";
import "react-select/dist/react-select.css";
import { Link } from "react-router";
import HotImages from "./hot-images";
import TopImages from "./top-images";
import UserImages from "./user-images";
import {
  getImages
} from "../homepage-actions";

const mapDispatchToProps = dispatch => ({
  onCategoryClick: (section, sort, showViral) => {
    dispatch(getImages(section, sort, showViral));
  }
});

const enhance = compose(
	setDisplayName("HomeImages"),
	onlyUpdateForPropTypes,
	setPropTypes({
    imagesList: IPropTypes.map,
    onCategoryClick: PropTypes.func
	}),
  withState("section", "onSelectSection", "hot"),
  withState("sort", "onSortSection", "viral"),
  connect(null, mapDispatchToProps)
);

const HomeImages = enhance(({
  imagesList = new Map(),
  onSelectSection,
  onCategoryClick,
  section,
  sort
}) => {
  const images = Object.assign({}, imagesList.toJS());
	return  (
		<div>
      <ul className="tabs-img-grid">
        <li onTouchTap={ _ => pipe(
          onSelectSection("hot"),
          onCategoryClick("hot")
        )}>Hot</li>
        <li onTouchTap={ _ => pipe(
          onSelectSection("top"),
          onCategoryClick("top")
        )}
        >Top</li>
        <li onTouchTap={ _ => pipe(
          onSelectSection("user"),
          onCategoryClick("user", "rising")
        )}>User</li>
        {section === "user" && <li>
          <span onTouchTap={ _ => onCategoryClick(section, "rising", false)}>
            <i className="material-icons" title="Toggle Viral" alt="Toggle Viral">whatshot</i>
          </span>
        </li>}
      </ul>
      <br/>
      {section === "hot" && <HotImages imagesList={imagesList}/>}
      {section === "top" && <TopImages imagesList={imagesList}/>}
      {section === "user" && <UserImages imagesList={imagesList}/>}
		</div>
	)
});

export default HomeImages;
