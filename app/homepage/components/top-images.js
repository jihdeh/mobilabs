import React, {PropTypes} from "react";
import {Card, CardTitle, Row, Col, Input} from "react-materialize";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import withHandlers from "recompose/withHandlers";
import withState from "recompose/withState";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import { Map, toJS } from "immutable";
import { Link } from "react-router";
import { connect } from "react-redux";
import { map} from "../../../util/functional-immutable";

import {
  getImages,
  getImagesWindow
} from "../homepage-actions";

const mapDispatchToProps = (dispatch, props) => ({
  onWindowSortClick: (section, sort, windowSort) => {
    props.onWindowSelect(windowSort);
    dispatch(getImagesWindow(section, sort, windowSort));
  }
});

const enhance = compose(
  setDisplayName("TopImages"),
  onlyUpdateForPropTypes,
  setPropTypes({
    imagesList: IPropTypes.map,
    onWindowSortClick: PropTypes.func
  }),
  withState("windowSort", "onWindowSelect"),
  connect(null, mapDispatchToProps)
);

const TopImages = enhance(({
  imagesList = new Map(),
  onSortClick,
  windowSort,
  onWindowSortClick
}) => {
  const imgurImages = Object.assign({}, imagesList.toJS());
  return  (
    <div>
      <Row>
        <Col s={6}>
          <Input type="select" label="Sort By Window" onChange={evt => onWindowSortClick("top", "top", evt.target.value)}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </Input>
        </Col>
      </Row>
      <Row>
      {imgurImages.images &&
          map((image, index) =>
            <Col key={ index } s={12} m={4} l={3} className="image-grid">
              <Card header={<CardTitle reveal image={image.cover ? `http://i.imgur.com/${image.cover}m.jpg` : image.link} waves="light"/>}
                title={`${image.title.substring(0, 50)}.....`}
                textClassName="card-text"
                reveal={
                  <div>
                    <p>Topic: {image.topic}</p>
                    <p>Views: {image.views}</p>
                  </div>
                }
                >
              </Card>
            </Col>
          )(imgurImages.images)
        }
      </Row>
    </div>
  )
});

export default TopImages;
