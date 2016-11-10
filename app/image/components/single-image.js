import React, {PropTypes} from "react";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import setDisplayName from "recompose/setDisplayName";
import withHandlers from "recompose/withHandlers";
import { connect } from "react-redux";


const mapStateToProps = (state, props)  => ({
	imagesList: state.get("imagesList")
});

// const loadProductDetail = props = () => {

// }

const enhance = compose(
	setDisplayName("SingleImage"),
	onlyUpdateForPropTypes,
	setPropTypes({
		imagesList: IPropTypes.map
	})
);

const SingleImage = enhance(({
	imagesList = new Map()
}) => {
	return (
		<div>

		</div>
	)
});

export default connect(mapStateToProps)(SingleImage);
