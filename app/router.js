import React from "react";
import {Route, IndexRoute, Router, browserHistory} from "react-router";
import App from "./app";
import { connect } from "react-redux";
import HomeView from "./homepage";
import {
	getAllImages,
	getOneImage
} from "./homepage/homepage-actions";

// import ErrorPage from "./static-pages/error-page";
// import About from "./static-pages/about-us";

class NoMatch extends React.Component {
  render() {
    return (
      <div>
        <h2>No Match</h2>
        <div> 404 Error</div>
      </div>
    )
  }
}

const MobileLabsRouter = ({
  history,
  dispatch
}) => (
	  <Router history={ history }>
	    <Route path="/" component={App}>
	      <IndexRoute
	        component={HomeView}
	        />
		      <Route path="*" component={NoMatch} />
	    </Route>
	  </Router>
);

export default connect()(MobileLabsRouter);

