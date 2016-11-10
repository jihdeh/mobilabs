import { Map } from "immutable";
import { pipe } from "ramda";
import { set } from "../../util/functional-immutable";
import {
  FETCH_IMAGES,
  FETCH_SINGLE_IMAGE
} from "./homepage-actions";


const initialState  = new Map();

const HomepageReducer = (state = initialState, action) => {
	switch(action.type) {
		case FETCH_IMAGES:
			return set("images", action.items, state);
		case FETCH_SINGLE_IMAGE:
			return set("image", action.item, state);
		default:
			return state;
	}
}


export default HomepageReducer;
