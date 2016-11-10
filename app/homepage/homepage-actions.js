import axios from "axios";
import { fromJS } from "immutable";

export const FETCH_IMAGES = "FETCH_IMAGES";
export const FETCH_SINGLE_IMAGE = "FETCH_SINGLE_IMAGE";

export const fetchImages = (images) => ({
  type: FETCH_IMAGES,
  images
});

export const fetchSingleImage = (image) => ({
	type: FETCH_SINGLE_IMAGE,
	image
});

export const getAllImages = () => async dispatch => {
  try {
    const response = await axios.get(`/api/v1/images`);
    dispatch(fetchImages(fromJS(response.data)));
  } catch (error) {
    console.trace(error);
  }
};

export const getOneImage = (imageId) => async dispatch => {
	try {
		const response = await axios.get(`/api/v1/images/${imageId}`);
		dispatch(fetchSingleImage(fromJS(response.data)));
	} catch(error) {
		console.trace(error);
	}
};
