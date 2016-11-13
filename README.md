Let us play with react and some server rendering, shall we?
==========
Api.imgur.com

- [x] show gallery images in a grid of thumbnails;
- [x] show image description in the thumbnail, top or bottom;
- [x] allow selecting the gallery section: hot, top, user;
- [x] allow including / excluding viral images from the result set;
- [x] allow specifying window and sort parameters;
- [x] when clicking an image in the gallery - show its details: big image, title, description, upvotes, downvotes and score.


Bonus points:

- [x] instead of calling Imgur API directly, proxy the API calls through your server (ex. Express);
- [x] provide a Dockerfile such that your solution can be run on Docker.


App requirements:

- [x] use ReactJS;
- [x] and preferably Redux.

Demo can be found [here](https://rocky-wildwood-24318.herokuapp.com)

## Development environment setup
### macOS
* Install Docker for Mac ([here](https://docs.docker.com/docker-for-mac/))
* Verify your installation by running these commands
- docker --version
- docker-compose --version

```
  - git clone git@github.com:jihdeh/mobilabs.git
  - cp .env.template .env
  - docker-compose build
  - docker-compose up

```
How to run locally

```

- git clone
- yarn install or npm install
- Add enviroment variables (IMGUR_AUHTORIZATION_ID => `your imgur client id`, NODE_ENV=development)
- npm run dev
- visit localhost:5000

```

Tech Stack
 * React/Redux
 * ImmutableJS
 * KoaJS
 * NodeJS

