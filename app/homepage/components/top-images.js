import React from "react";
import {Card, CardTitle, Row, Col} from "react-materialize";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import { Map, toJS } from "immutable";
import { Link } from "react-router";
import { map} from "../../../util/functional-immutable";


const enhance = compose(
  setDisplayName("TopImages"),
  onlyUpdateForPropTypes,
  setPropTypes({
    imagesList: IPropTypes.map
  })
);

const TopImages = enhance(({
  imagesList = new Map()
}) => {
  const images = Object.assign({}, imagesList.toJS());
  return  (
    <div>
      <Row>
      {images.topImages &&
          map((image, index) =>
            <Col key={ index } s={1} m={3} l={3} className="image-grid">
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
          )(images.topImages)
        }
      </Row>
    </div>
  )
});

export default TopImages;
