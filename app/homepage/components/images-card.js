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
import { Link } from "react-router";
import HotImages from "./hot-images";
import TopImages from "./top-images";
import {
  getTopImages
} from "../homepage-actions";


const mapStateToProps = (state, props) => ({
  imagesList: state.get("imagesList"),
});

const mapDispatchToProps = dispatch => ({
  onTopClick: pipe(
    getTopImages,
    dispatch)
});

const enhance = compose(
	setDisplayName("HomeImages"),
	onlyUpdateForPropTypes,
	setPropTypes({
    imagesList: IPropTypes.map,
    onTopClick: PropTypes.func
	}),
  withState("section", "onSelectSection", "hot"),
  connect(mapStateToProps, mapDispatchToProps)
);

const HomeImages = enhance(({
  imagesList = new Map(),
  onTopClick,
  onSelectSection,
  section = "hot"
}) => {
  const images = Object.assign({}, imagesList.toJS());
  // console.log(images)
	return  (
		<div>
      <ul className="tabs-img-grid">
        <li onTouchTap={ _ => onSelectSection("hot")}>Hot</li>
        <li onTouchTap={ _ => pipe(
          onSelectSection("top"),
          onTopClick()
        )}
        >Top</li>
        <li>User</li>
      </ul>
      {section === "hot" && <HotImages imagesList={imagesList}/>}
      {section === "top" && <TopImages imagesList={imagesList}/>}
		</div>
	)
});

export default HomeImages;
