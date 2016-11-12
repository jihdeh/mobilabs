import React, {PropTypes} from "react";
import {Card, CardTitle, Row, Col} from "react-materialize";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import withState from "recompose/withState";
import withHandlers from "recompose/withHandlers";
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
  getTopImages,
  getUserImages,
  getImages
} from "../homepage-actions";

function logChange(val) {
}
const windowHandler = props => (val) => {
  console.log("Selected: " + JSON.stringify(val));
  if(val && val.value) {
    props.onWindowSelect(val.value);
  }
}
const mapStateToProps = (state, props) => ({
  imagesList: state.get("imagesList"),
});

const mapDispatchToProps = dispatch => ({
  onTopClick: pipe(
    getTopImages,
    dispatch),
  onUserClick: (showViral) => {
    dispatch(getUserImages(showViral));
  },
  onCategoryClick: (section, sort, showViral) => {
    console.log(section, sort, showViral)
    dispatch(getImages(section, sort, showViral));
  }
});

const enhance = compose(
	setDisplayName("HomeImages"),
	onlyUpdateForPropTypes,
	setPropTypes({
    imagesList: IPropTypes.map,
    onTopClick: PropTypes.func,
    onUserClick: PropTypes.func,
    onCategoryClick: PropTypes.func
	}),
  withState("section", "onSelectSection", "hot"),
  withState("sort", "onSortSection", "viral"),
  withState("windowSort", "onWindowSelect", "day"),
  withHandlers({
    windowHandler
  }),
  connect(mapStateToProps, mapDispatchToProps)
);

const HomeImages = enhance(({
  imagesList = new Map(),
  onTopClick,
  onUserClick,
  onSelectSection,
  onCategoryClick,
  section,
  sort,
  windowSort = "day",
  windowHandler
}) => {
  const images = Object.assign({}, imagesList.toJS());
	return  (
		<div>
      <ul className="tabs-img-grid">
        <li onTouchTap={ _ => onSelectSection("hot")}>Hot</li>
        <li onTouchTap={ _ => pipe(
          onSelectSection("top"),
          onCategoryClick("top")
        )}
        >Top</li>
        <li onTouchTap={ _ => pipe(
          onSelectSection("user"),
          onCategoryClick(true)
        )}>User</li>
        {section === "user" && <li>
          <span onTouchTap={ _ => onCategoryClick(section,false)}>
            <i className="material-icons" title="Toggle Viral" alt="Toggle Viral">whatshot</i>
          </span>
        </li>}
      </ul>
      {section === "hot" && <HotImages imagesList={imagesList}/>}
      {section === "top" && <TopImages imagesList={imagesList}/>}
      {section === "user" && <UserImages imagesList={imagesList}/>}
		</div>
	)
});

export default HomeImages;
