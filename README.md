Bouncer
=======

Lean passwordless authentication server and API for Eventful experiences.

Most of an Eventful experience is public. This app enables the bits that aren't.

It's an Express/MongoDB app exposing two endpoints:

* `/auth` for authenticating users with passwordless magic links sent via email
* `/agenda` for adding and removing users' agenda items to the mongo database so that they can sync across devices

**Read about the [intended auth flow](https://github.com/jhackett1/bouncer/wiki/Authentication-flow).**

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
* Prepare for web deployment via Zeit Now (get rid of hardcoded localhosts and come up with a better way to supply env config)
* Pull out other useful config into separate file (eg. reply-to address in emails)