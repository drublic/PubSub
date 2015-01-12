# PubSub - vanilla-pubsub

PubSub is a JS implementation of a publication/subscription pattern in JS
using vanilla JS.

[![Build Status](https://api.travis-ci.org/drublic/PubSub.svg)](http://travis-ci.org/drublic/PubSub)

## Install

    npm install --save vanilla-pubsub

## Usage

Subscribe

    PubSub.subscribe('App.loaded', function () {});
    PubSub.subscribe('App.done', [App.loadStack, App.clock]);

Unsubscribe

    PubSub.unsubscribe('App.done', App.loadStack);

Publish

    PubSub.publish('App.loaded');
    PubSub.publish('App.loaded', { data: App.data });
