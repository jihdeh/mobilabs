import React, {PropTypes, Component} from "react";
import compose from "recompose/compose";
import IPropTypes from "react-immutable-proptypes";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import { connect } from "react-redux";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import frontPage from "../../decorators/frontpage";
import Images from "../components/images-card";


const mapStateToProps = (state, props) => ({
	imagesList: state.get("imagesList"),
});

@frontPage()
class HomeView extends Component {
	static propTypes = {
		imagesList: IPropTypes.map
	}
	render() {
		const { imagesList } = this.props;
    // console.log(imagesList);
		return (
			<div>
				<Images imagesList={imagesList} />
			</div>
		)
	}
}


export default connect(mapStateToProps)(HomeView);
