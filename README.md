Eventful auth server
====================

Lean passwordless authentication server and API for Eventful app.

It's an Express/MongoDB app exposing two endpoints:

* `/auth` for authenticating users with passwordless magic links sent via email
* `/agenda` for adding and removing users' agenda items to the mongo database so that they can sync across devices

Running locally
---------------

Clone the repo, run `npm install` and `npm start`, or `npm run dev` to watch for changes.

It should be on port 4000 by default.

It needs the following environment config file to run:

```
export SENDGRID_API_KEY=''
export MONGO_STRING=''
export SESSION_SECRET=''
export DATABASE=''
```

To do
-----

* Build out `/agenda` routes
* Better email template