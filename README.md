# Chat API

This is a chat API written in Node, Express, React, and Mongo. Now with ES6.

Requirements
---

- Node v7.8 (Built on 7.8, should build on earlier versions)
- [MongoDB](https://docs.mongodb.com/master/administration/install-community/) (I'd recommend using Homebrew to install)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) (Also recommend using Homebrew)

Installation
---

1. Clone this repo
2. `yarn install`
3. Make a directory for MongoDB
	- `mkdir mongostore`
	- `mongod --dbpath mongostore/`
	- MongoDB should now be running
4. `yarn dev:wds` - to start webpack hot reloader
5. `yarn start` - start express and react frontend
6. Servers should be loaded
	- Visit `localhost:8000` to view front end
	- API calls are made on `localhost:8000/thread`

Test
---

1. `yarn test`

Frontend Documentation
---

Start a new conversation and grab the chat ID.  Give the chat ID to other user, have them enter the ID in to join and begin chatting.

API Documentation
---
* `POST /thread`
	- Creates a new thread
	- Params: None

* `GET /thread/:id?offset=0&limit=10`
	- Gets a thread by ID
	- Params (on query):
		- `id: ID of thread`
		- `offset: number of messages to offset`
		- `limit: limit the number of messages to display`

* `DELETE /thread/:id`
	- Deletes a thread by ID
	- Params (on query):
		- `id: ID of thread`

* `POST /thread/:id`
	- Adds a message to a thread
	- Params (on query):
		- `id: ID of thread`
	- Params (on body as JSON):
		- `user: username of user`
		- `message: message to be sent`
