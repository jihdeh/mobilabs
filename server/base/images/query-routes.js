import axios from "axios";
import {get } from "lodash";

let headers = { "Authorization": `Client-ID ${process.env.IMGUR_AUHTORIZATION_ID}` }


function* routeOne(next) {
  console.log(this.params);
  let showViral = this.query.showViral;
  console.log(`https://api.imgur.com/3/gallery/${this.params.section}/${this.params.sort}/0.json?showViral=${showViral}`);
  try {
    let images = yield axios.get(`https://api.imgur.com/3/gallery/${this.params.section}/${this.params.sort}/0.json`, {
      headers
    });
    console.log(images.data.data[0])
    this.body = get(images.data, "data");
  } catch (error) {
    console.log(error);
  }
};

function* routeTwo(next) {
   console.log(this.params);
  let showViral = this.query.showViral;
  console.log(`https://api.imgur.com/3/gallery/${this.params.section}/${this.params.sort}/${this.params.windowSort}/0.json?showViral=${showViral}`);

  try {
    let images = yield axios.get(`https://api.imgur.com/3/gallery/${this.params.section}/${this.params.sort}/${this.params.windowSort}/0.json`, {
      headers
    });
    console.log(images.data.data[0])
    this.body = get(images.data, "data");
  } catch (error) {
    console.log(error);
  }
};

function* getTop(next) {
  try {
    let images = yield axios.get(`https://api.imgur.com/3/gallery/top/top/0.json`, {
      headers
    });
    this.body = get(images.data, "data");
  } catch (error) {
    console.log(error);
  }
};

function* getUser(next) {
  let showViral = this.query.showViral;
  let images = yield axios.get(`https://api.imgur.com/3/gallery/user/rising/0.json?showViral=${showViral}`, {
    headers
  });
  this.body = get(images.data, "data");
};

export default { routeOne, routeTwo, getTop, getUser };
