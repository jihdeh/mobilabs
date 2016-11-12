import React, {PropTypes} from "react";
import {Card, CardTitle, Row, Col, Input, Modal, Preloader} from "react-materialize";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import { Map, toJS } from "immutable";
import { Link } from "react-router";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import withState from "recompose/withState";
import { map, get} from "../../../util/functional-immutable";
import LoadDataSpinner from "./load-data-spinner";

import {
  getImages,
  getImagesWindow
} from "../homepage-actions";

const mapDispatchToProps = (dispatch, props) => ({
  onSortClick: (section, sort) => {
    props.onSortSelect(sort);
    dispatch(getImages(section, sort));
  },
  onWindowSortClick: (section, sort, hotWindowSort) => {
    let newSort = sort !== props.sort ? sort : props.sort;
    props.onWindowSelect(hotWindowSort);
    dispatch(getImagesWindow(section, newSort, hotWindowSort));
  }
});


const enhance = compose(
  setDisplayName("HotImages"),
  onlyUpdateForPropTypes,
  setPropTypes({
    imagesList: IPropTypes.map,
    onSortClick: PropTypes.func,
    onWindowSortClick: PropTypes.func
  }),
  withState("sort", "onSortSelect"),
  withState("hotWindowSort", "onWindowSelect"),
  connect(null, mapDispatchToProps)
);

const HotImages = enhance(({
  imagesList = new Map(),
  onSortClick,
  sort,
  hotWindowSort,

  onWindowSortClick
}) => {
  const imgurImages = Object.assign({}, imagesList.toJS());
  return  (
    <div>
      <LoadDataSpinner loading={ get("loading", imagesList) }/>
      <Row>
        <Col>
          <Input s={6} type="select" label="Sort By" onChange={
            evt => hotWindowSort ?
            onWindowSortClick("hot", evt.target.value, hotWindowSort)
            : onSortClick("hot", evt.target.value)}
            >
            <option value="viral">Viral</option>
            <option value="top">Top</option>
            <option value="time">Time</option>
          </Input>
          <Input s={6} type="select" label="Sort By Window" onChange={evt => onWindowSortClick("hot", sort, evt.target.value)}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </Input>
        </Col>
      </Row>
      <Row>
      {imgurImages.images ?
          map((image, index) =>
            <Col key={ index } s={12} m={4} l={3} className="image-grid">
              <Card header={
                <Modal
                  header={image.title}
                  trigger={
                    <CardTitle image={image.cover ? `http://i.imgur.com/${image.cover}m.jpg` : image.link} waves="light"/>
                  }>
                  <Row>
                    <Col s={12} m={12} l={12}>
                      <img src={image.cover ? `http://i.imgur.com/${image.cover}m.jpg` : image.link} />
                    </Col>
                    <Col s={12} m={6} l={6}>
                      <p>Title: {image.title}</p>
                      <p>Description: {image.description || "None"}</p>
                      <p>Upvotes: {image.ups}</p>
                      <p>Downvotes: {image.downs}</p>
                      <p>Popularity Score: {image.score}</p>
                    </Col>
                  </Row>
                </Modal>
                }
                title={`${image.title.substring(0, 50)}.....`}
                textClassName="card-text"
                >
              </Card>
            </Col>
          )(imgurImages.images) : <Preloader size="small"/>
        }
      </Row>
    </div>
  )
});

export default HotImages;
