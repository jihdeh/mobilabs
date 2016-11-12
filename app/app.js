import React from "react";

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class App extends React.Component {

  componentDidMount() {
    //TODO on load, if any
  }

  render() {
    return (
      <div id="app">
        {this.props.children}
      </div>
    );
  }
}

export default App;
