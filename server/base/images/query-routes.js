import axios from "axios";
import {get } from "lodash";

let headers = { "Authorization": `Client-ID ${process.env.IMGUR_AUHTORIZATION_ID}` }


function* routeOne(next) {
  let showViral = this.query.showViral;
  try {
    let images = yield axios.get(`https://api.imgur.com/3/gallery/${this.params.section}/${this.params.sort}/0.json?showViral=${showViral}`, {
      headers
    });
    this.body = get(images.data, "data");
  } catch (error) {
    console.log(error);
  }
};

function* routeTwo(next) {
  let showViral = this.query.showViral;
  try {
    let images = yield axios.get(`https://api.imgur.com/3/gallery/${this.params.section}/${this.params.sort}/${this.params.windowSort}/0.json?showViral=${showViral}`, {
      headers
    });
    this.body = get(images.data, "data");
  } catch (error) {
    console.log(error);
  }
};

export default { routeOne, routeTwo };
