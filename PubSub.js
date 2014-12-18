/**
 * PUBSUB
 *
 * PubSub is a JS implementation of a publication/subscription pattern in JS
 * using vanilla JS.
 *
 * Subscibe:
 *   PubSub.subscribe('App.loaded', function () {});
 *   PubSub.subscribe('App.done', [App.loadStack, App.clock]);
 *
 * Unsubscribe:
 *   PubSub.unsubscribe('App.done', App.loadStack);
 *
 * Publish:
 *   PubSub.publish('App.loaded');
 *   PubSub.publish('App.loaded', { data: App.data });
 *
 */
void function (global) {

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
   * @param  {String}         type      Event type
   * @param  {Function|Array} functions Function or array of functions to subscribe to event
   * @return {void}
   */
  PubSub.subscribe = function (type, functions) {
    var i = 0;

    // If `functions` is not an array, make it one
    if (typeof functions === 'function') {
      functions = [functions];
    }

    // Add subsciption name to storage
    if (!PubSub._storage[type]) {
      PubSub._storage[type] = [];
    }

    for (; i < functions.length; i++) {
      if (typeof(functions[i]) === 'function') {
        PubSub._storage[type].push(functions[i]);
      }
    }
  };

  /**
   * Unsubscribe functions from an event
   * @param  {String}         type      Event type
   * @param  {Function|Array} functions Functions to unsubscribe from event
   * @return {void}
   */
  PubSub.unsubscribe = function (type, functions) {
    var index;
    var i = 0;

    // If `functions` is not an array, make it one
    if (!functions.length) {
      functions = [functions];
    }

    // If the type does not exist, throw an error
    if (!PubSub._storage[type]) {
      throw new Error('Type ' + type + ' does not exist.');
    }

    for (; i < functions.length; i++) {
      index = PubSub._storage[type].indexOf(functions[i]);

      PubSub._storage[type].splice(index, 1);
    }
  };

  /**
   * Call functions subscribed to an event
   * If you want to publish multiple events, call PubSub.publish multiple times.
   *
   * @param  {String} type Event type to publish
   * @param  {Object} data Data to send with publish event
   * @return {void}
   */
  PubSub.publish = function (type, data) {
    var i = 0;

    if (!PubSub._storage[type]) {
      return;
    }

    for (; i < PubSub._storage[type].length; i++) {
      PubSub._storage[type][i](data);
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
}(this);
