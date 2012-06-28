# User Sessions for Meteor

A smart package for authentication and tracking users across requests (based on [client-sessions](http://client-sessions.meteor.com))

*Note: This lib is not going to be developed further until meteor's core auth is finished. Potentially there's nothing in this project worth keeping, we'll see.*

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
