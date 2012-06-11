# User Sessions for Meteor

A smart package for authentication and tracking users across requests (based on [client-sessions](http://client-sessions.meteor.com))

*Note: I'm noticing people forking and following this and wanted to point out that it's in a semi-broken state right now because I just updated it's dependencies and I haven't gotten around to catching up with them. This library will be getting a lot of love in the next couple days, stay tuned.*

*Follow this discussion if you want to know when this proj is ready to tinkering again: [https://github.com/possibilities/meteor-user-sessions/commit/65ff55bbc91cdc37acd8a8b20f7b1a803d9e803b#commitcomment-1438253](https://github.com/possibilities/meteor-user-sessions/commit/65ff55bbc91cdc37acd8a8b20f7b1a803d9e803b#commitcomment-1438253)*

[Check out the demo!](http://user-sessions.meteor.com/)

## Installation

First download it and add it to your Meteor packages

Now add it to your app

    meteor add user-sessions

## Usage

I'll add instructions eventually. Until then check out demo app in repo.

## TODO

Decouple from internal User model

When you tab out of blog settings fields the focus is moving to buttons under the overlay

Forms need to be cleared when submitted successfully

Expose a handle to current user in Meteor methods (same way clientId works). I mean that's the whole point right!

User model field validation

Lowercase email addresses

Fuzzy password option

Pass through options to client session

Figure out why username field isn't saving history, would nice if we could make it prompt to save password in browser.

Make it work without bootstrap
