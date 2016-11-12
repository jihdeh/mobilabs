import axios from "axios";
import { fromJS } from "immutable";

export const FETCH_IMAGES = "FETCH_IMAGES";
export const FETCH_SINGLE_IMAGE = "FETCH_SINGLE_IMAGE";
export const FETCH_TOP_IMAGES = "FETCH_TOP_IMAGES";
export const FETCH_USER_IMAGES = "FETCH_USER_IMAGES";

export const fetchImages = (images) => ({
  type: FETCH_IMAGES,
  images
});

export const topSection = (topImages) => ({
  type: FETCH_TOP_IMAGES,
  topImages
});

export const userSection = (userImages) => ({
  type: FETCH_USER_IMAGES,
  userImages
});

export const fetchSingleImage = (image) => ({
	type: FETCH_SINGLE_IMAGE,
	image
});

export const getImages = (section = "hot", sort = "viral", showViral = true) => async dispatch => {
  try {
    const response = await axios.get(`/api/v1/images/${section}/${sort}?showViral=${showViral}`);
    dispatch(fetchImages(fromJS(response.data)));
  } catch (error) {
    console.trace(error);
  }
};

export const getImagesWindow = (section = "hot", sort = "viral", windowSort="day", showViral = true) => async dispatch => {
  try {
    const response = await axios.get(`/api/v1/images/${section}/${sort}/${windowSort}?showViral=${showViral}`);
    dispatch(fetchImages(fromJS(response.data)));
  } catch (error) {
    console.trace(error);
  }
};

export const getTopImages = () => async dispatch => {
  try {
    const response = await axios.get("/api/v1/images/top");
    dispatch(topSection(fromJS(response.data)));
  } catch (error) {
    console.trace(error, "error fetching top images");
  }
};

export const getUserImages = (showViral = true) => async dispatch => {
  try {
    const response = await axios.get(`/api/v1/images/user?showViral=${showViral}`);
    dispatch(userSection(fromJS(response.data)));
  } catch (error) {
    console.trace(error, "error fetching user images");
  }
};

// export const getOneImage = (imageId) => async dispatch => {
// 	try {
// 		const response = await axios.get(`/api/v1/images/${imageId}`);
// 		dispatch(fetchSingleImage(fromJS(response.data)));
// 	} catch(error) {
// 		console.trace(error);
// 	}
// };
