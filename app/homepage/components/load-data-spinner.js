import React, { PropTypes } from "react";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import {Preloader} from "react-materialize";


const enhance = compose(
	setDisplayName("LoadDataSpinner"),
	onlyUpdateForPropTypes,
	setPropTypes({
		loading: PropTypes.bool
	}),
);

const LoadDataSpiner = enhance(({
	loading,
}) => (
		<div className="load-data-spinner">
			{ loading &&
				<div className="overlay">
          <Preloader size="small"/>
				</div>
			}
		</div>
	)
);

export default LoadDataSpiner
