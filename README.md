# MERN Stack: Express + Mongo + React + NodeJS and build with Docker Compose

A project that provide ability to build shrinked links. Also implemented authorization(login and register users in Mongo);


## Development

#### Start local development

1) Run mongo docker container
```
docker run --name mongodb -p 27017:27017 -d mongo
```
2) Run server and React App concurrently
```
cd server
npm run dev
```
4) Open http://localhost:3001

#### Start local developmentwit Docker compose

For development, the `server/` and `client/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild.
(in windows present issue with notify Docker contianers about changes, need use https://github.com/merofeev/docker-windows-volume-watcher)

1) Run commands to build and up docker containers
```
docker-compose build
docker-compose up
```
2) Open http://localhost:3002

3) Stop Docker containers
```
docker-compose down
```

## Production

For production, this uses the Dockerfile at the root of the repo. It creates a static build of the client React app and runs Express inside server, which handles both the API and serving of React files.

As a result, different code is executing to serve the React files, but all of the API calls should remain the same. The difference between development and production isn’t ideal, but it does offer the simplicity of having the entire app run in one server on one machine.

```
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up
```

