import axios from "axios";
import {get} from "lodash";

function* getOne(next) {}

function* getAll(next) {}

function* getTop(next) {
  let images = yield axios.get(`https://api.imgur.com/3/gallery/top/top/0.json`, {
    headers: { "Authorization": `Client-ID d78c0971800b4a2` }
  });
  this.body = get(images.data, "data");
}

export default { getOne, getAll, getTop };
