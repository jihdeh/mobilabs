import fs from "fs";
import path from "path";
import log from "../util/log";

const filename = path.join(__dirname, "../static/hash-map.json");
let hashMap = JSON.parse(fs.readFileSync(filename));

fs.watch(filename, (event) => {
	try {
		hashMap = JSON.parse(fs.readFileSync(filename));
		log.info("Reloaded static hash map");
	} catch (e) {
		log.error(e.stack);
	}

});

console.log(`Serving static assets from ${process.env.STATIC_CDN_PREFIX || "dist"}/static`);

export default function(uri) {
	return (process.env.STATIC_CDN_PREFIX || "") + (hashMap[uri] || "");
}
