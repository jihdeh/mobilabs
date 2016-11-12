import axios from "axios";
import { fromJS } from "immutable";

export const FETCH_IMAGES = "FETCH_IMAGES";
export const START_LOADING_DATA = "START_LOADING_DATA";


export const fetchImages = (images) => ({
  type: FETCH_IMAGES,
  images
});

export const startLoadingData = () => ({type: START_LOADING_DATA});

export const getImages = (section = "hot", sort = "viral", showViral = true) => async dispatch => {
  try {
    dispatch(startLoadingData());
    const response = await axios.get(`/api/v1/images/${section}/${sort}?showViral=${showViral}`);
    dispatch(fetchImages(fromJS(response.data)));
  } catch (error) {
    console.trace(error);
  }
};

export const getImagesWindow = (section = "hot", sort = "viral", windowSort="day", showViral = true) => async dispatch => {
  try {
    dispatch(startLoadingData());
    const response = await axios.get(`/api/v1/images/${section}/${sort}/${windowSort}?showViral=${showViral}`);
    dispatch(fetchImages(fromJS(response.data)));
  } catch (error) {
    console.trace(error);
  }
};
