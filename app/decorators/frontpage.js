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
						<Navbar brand="logo" right>
						  <NavItem href="get-started.html">Getting started</NavItem>
						  <NavItem href="components.html">Components</NavItem>
						</Navbar>
						<Child {...this.props}/>
					</div>
				)
			}
		}
	}
}
