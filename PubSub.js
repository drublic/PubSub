/**
 * PUBSUB
 *
 * PubSub is a JS implementation of a publication/subscription pattern in JS
 * using vanilla JS.
 *
 * Subscibe:
 *   PubSub.subscribe('App.loaded', function () {});
 *   PubSub.subscribe('App.done', [App.loadStack, App.clock]);
 *   PubSub.subscribe(['App.undo', 'App.redo'], App.change);
 *
 * Unsubscribe:
 *   PubSub.unsubscribe('App.done', App.loadStack);
 *   PubSub.unsubscribe(['App.undo', 'App.redo'], App.change);
 *
 * Publish:
 *   PubSub.publish('App.loaded');
 *   PubSub.publish('App.loaded', { data: App.data });
 *   PubSub.publish(['App.undo', 'App.redo']);
 *
 */
(function (global) {
  'use strict';

  /**
   * Object to store all functions and data
   * @type {Object}
   */
  var PubSub = {};

  /**
   * Storage for functions and events
   * @type {Object}
   */
  PubSub._storage = {};

  /**
   * Public API
   */

  /**
   * Subscribe funtions by mapping them to events
   * @param  {String|Array}   types     Event type
   * @param  {Function|Array} functions Function or array of functions to subscribe to event
   * @return {void}
   */
  PubSub.subscribe = function (types, functions) {
    var i = 0;
    var j = 0;
    var type = '';

    // If `types` is not an array, make it one
    if (typeof types === 'string') {
      types = [types];
    }

    // If `functions` is not an array, make it one
    if (typeof functions === 'function') {
      functions = [functions];
    }

    for (; i < types.length; i++) {
      type = types[i];

      // Add subsciption name to storage
      if (!PubSub._storage[type]) {
        PubSub._storage[type] = [];
      }

      for (j = 0; j < functions.length; j++) {
        if (typeof(functions[j]) === 'function') {
          PubSub._storage[type].push(functions[j]);
        }
      }
    }
  };

  /**
   * Unsubscribe functions from an event
   * @param  {String|Array}   types     Event types
   * @param  {Function|Array} functions Functions to unsubscribe from event
   * @return {void}
   */
  PubSub.unsubscribe = function (types, functions) {
    var index;
    var i = 0;
    var j = 0;
    var type = '';

    // If `types` is not an array, make it one
    if (typeof types === 'string') {
      types = [types];
    }

    // If `functions` is not an array, make it one
    if (!functions.length) {
      functions = [functions];
    }

    for (; i < types.length; i++) {
      type = types[i];

      // If the type does not exist, throw an error
      if (!PubSub._storage[type]) {
        throw new Error('Type ' + type + ' does not exist.');
      }

      for (j = 0; j < functions.length; j++) {
        index = PubSub._storage[type].indexOf(functions[j]);

        PubSub._storage[type].splice(index, 1);
      }
    }
  };

  /**
   * Call functions subscribed to an event
   * If you want to publish multiple events, call PubSub.publish multiple times.
   *
   * @param  {String|Array} types Event types to publish
   * @param  {Object}       data  Data to send with publish event
   * @return {void}
   */
  PubSub.publish = function (types, data) {
    var i = 0;
    var j = 0;
    var type = '';

    // If `types` is not an array, make it one
    if (typeof types === 'string') {
      types = [types];
    }

    for (; i < types.length; i++) {
      type = types[i];

      if (!PubSub._storage[type] || PubSub._storage[type].constructor !== Array) {
        PubSub._storage[type] = [];
      }

      for (j = 0; j < PubSub._storage[type].length; j++) {
        PubSub._storage[type][j](data);
      }
    }
  };


  /*
   * AMD, module loader, global registration
   */

  // Expose loaders that implement the Node module pattern.
  if (typeof module === 'object' && module && typeof module.exports === 'object') {
    module.exports = PubSub;

  // Register as an AMD module
  } else if (typeof define === 'function' && define.amd) {
    define('PubSub', [], function () {
      return PubSub;
    });

  // Export into global space
  } else if (typeof global === 'object' && typeof global.document === 'object') {
    global.PubSub = PubSub;
  }
}(this));
