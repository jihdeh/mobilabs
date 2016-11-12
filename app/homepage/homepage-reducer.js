import { Map } from "immutable";
import {pipe} from "ramda";
import { set } from "../../util/functional-immutable";
import {
  FETCH_IMAGES,
  START_LOADING_DATA
} from "./homepage-actions";


const initialState = new Map();

const HomepageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES:
      return pipe(
        set("images", action.images),
        set("loading", false)
        )(state);
    case START_LOADING_DATA:
      return set("loading", true, state);
    default:
      return state;
  }
}


export default HomepageReducer;
