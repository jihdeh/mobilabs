import { Map } from "immutable";
import { set } from "../../util/functional-immutable";
import {
  FETCH_IMAGES,
  FETCH_SINGLE_IMAGE,
  FETCH_TOP_IMAGES,
  FETCH_USER_IMAGES
} from "./homepage-actions";


const initialState = new Map();

const HomepageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES:
      return set("images", action.items, state);
    case FETCH_SINGLE_IMAGE:
      return set("image", action.item, state);
    case FETCH_TOP_IMAGES:
      return set("topImages", action.topImages, state);
    case FETCH_USER_IMAGES:
      return set("userImages", action.userImages, state);
    default:
      return state;
  }
}


export default HomepageReducer;
