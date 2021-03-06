import React from "react";
import {Route, IndexRoute, Router} from "react-router";
import App from "./app";
import { connect } from "react-redux";
import HomeView from "./homepage";

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
  history
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

