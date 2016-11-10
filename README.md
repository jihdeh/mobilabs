Mobilabs
==========
Api.imgur.com

[x] show gallery images in a grid of thumbnails;
[x] show image description in the thumbnail, top or bottom;
[ ] allow selecting the gallery section: hot, top, user;
[ ] allow including / excluding viral images from the result set;
[ ] allow specifying window and sort parameters;
[ ] when clicking an image in the gallery - show its details: big image, title, description, upvotes, downvotes and score.


Bonus points:
[x] instead of calling Imgur API directly, proxy the API calls through your server (ex. Express);
provide a Dockerfile such that your solution can be run on Docker.


App requirements:
[x] use ReactJS;
[x] and preferably Redux.


How to run

- git clone
- yarn install or npm install
- npm run dev
- visit localhost:5000


TODO

-- Implement infinite scroll
-- Optimize for production (caching, builds)
