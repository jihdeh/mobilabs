import React, {Component} from "react";
import DefaultHeaderData from "../menu/default-menu-data";
import {Navbar, NavItem} from "react-materialize";

export default function frontPage(
		TopHeaderData = DefaultHeaderData
	) {
	return function(Child) {
		return class extends Component {
			constructor(props) {
				super(props);
			}
			render() {
				return (
					<div>
						<Navbar brand={<i className="material-icons">spa</i>} right>
						  <NavItem href="https://github.com/jihdeh/mobilabs">
                <i className="material-icons">star</i>
              </NavItem>
						  <NavItem href="https://github.com/jihdeh">
                <i className="material-icons">person</i>
              </NavItem>
						</Navbar>
						<Child {...this.props}/>
					</div>
				)
			}
		}
	}
}
