(function () {

/* Imports */
var _ = Package.underscore._;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var EJSON = Package.ejson.EJSON;
var Meteor = Package.meteor.Meteor;
var Iron = Package['iron:core'].Iron;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var CurrentOptions, HTTP_METHODS, RouteController, Route, Router, route;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/iron_router/packages/iron_router.js                                                      //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
(function () {                                                                                       // 1
                                                                                                     // 2
////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                            //     // 4
// packages/iron:router/lib/current_options.js                                                //     // 5
//                                                                                            //     // 6
////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                              //     // 8
/**                                                                                           // 1   // 9
 * Allows for dynamic scoping of options variables. Primarily intended to be                  // 2   // 10
 * used in the RouteController.prototype.lookupOption method.                                 // 3   // 11
 */                                                                                           // 4   // 12
CurrentOptions = new Meteor.EnvironmentVariable;                                              // 5   // 13
                                                                                              // 6   // 14
////////////////////////////////////////////////////////////////////////////////////////////////     // 15
                                                                                                     // 16
}).call(this);                                                                                       // 17
                                                                                                     // 18
                                                                                                     // 19
                                                                                                     // 20
                                                                                                     // 21
                                                                                                     // 22
                                                                                                     // 23
(function () {                                                                                       // 24
                                                                                                     // 25
////////////////////////////////////////////////////////////////////////////////////////////////     // 26
//                                                                                            //     // 27
// packages/iron:router/lib/http_methods.js                                                   //     // 28
//                                                                                            //     // 29
////////////////////////////////////////////////////////////////////////////////////////////////     // 30
                                                                                              //     // 31
HTTP_METHODS = [                                                                              // 1   // 32
  'get',                                                                                      // 2   // 33
  'post',                                                                                     // 3   // 34
  'put',                                                                                      // 4   // 35
  'delete',                                                                                   // 5   // 36
];                                                                                            // 6   // 37
                                                                                              // 7   // 38
////////////////////////////////////////////////////////////////////////////////////////////////     // 39
                                                                                                     // 40
}).call(this);                                                                                       // 41
                                                                                                     // 42
                                                                                                     // 43
                                                                                                     // 44
                                                                                                     // 45
                                                                                                     // 46
                                                                                                     // 47
(function () {                                                                                       // 48
                                                                                                     // 49
////////////////////////////////////////////////////////////////////////////////////////////////     // 50
//                                                                                            //     // 51
// packages/iron:router/lib/route_controller.js                                               //     // 52
//                                                                                            //     // 53
////////////////////////////////////////////////////////////////////////////////////////////////     // 54
                                                                                              //     // 55
/*****************************************************************************/               // 1   // 56
/* Imports */                                                                                 // 2   // 57
/*****************************************************************************/               // 3   // 58
var Controller = Iron.Controller;                                                             // 4   // 59
var Url = Iron.Url;                                                                           // 5   // 60
var MiddlewareStack = Iron.MiddlewareStack;                                                   // 6   // 61
var assert = Iron.utils.assert;                                                               // 7   // 62
                                                                                              // 8   // 63
/*****************************************************************************/               // 9   // 64
/* RouteController */                                                                         // 10  // 65
/*****************************************************************************/               // 11  // 66
RouteController = Controller.extend({                                                         // 12  // 67
  constructor: function (options) {                                                           // 13  // 68
    RouteController.__super__.constructor.apply(this, arguments);                             // 14  // 69
    options = options || {};                                                                  // 15  // 70
    this.options = options;                                                                   // 16  // 71
    this._onStopCallbacks = [];                                                               // 17  // 72
    this.route = options.route;                                                               // 18  // 73
    this.params = [];                                                                         // 19  // 74
                                                                                              // 20  // 75
    // Sometimes the data property can be defined on route options,                           // 21  // 76
    // or even on the global router config. And people will expect the                        // 22  // 77
    // data function to be available on the controller instance if it                         // 23  // 78
    // is defined anywhere in the chain. This ensure that if we have                          // 24  // 79
    // a data function somewhere in the chain, you can call this.data().                      // 25  // 80
    var data = this.lookupOption('data');                                                     // 26  // 81
                                                                                              // 27  // 82
    if (typeof data === 'function')                                                           // 28  // 83
      this.data = _.bind(data, this);                                                         // 29  // 84
    else if (typeof data !== 'undefined')                                                     // 30  // 85
      this.data = function () { return data; };                                               // 31  // 86
                                                                                              // 32  // 87
    this.init(options);                                                                       // 33  // 88
  }                                                                                           // 34  // 89
});                                                                                           // 35  // 90
                                                                                              // 36  // 91
/**                                                                                           // 37  // 92
 * Returns an option value following an "options chain" which is this path:                   // 38  // 93
 *                                                                                            // 39  // 94
 *   this.options                                                                             // 40  // 95
 *   this (which includes the proto chain)                                                    // 41  // 96
 *   this.route.options                                                                       // 42  // 97
 *   dynamic variable                                                                         // 43  // 98
 *   this.router.options                                                                      // 44  // 99
 */                                                                                           // 45  // 100
RouteController.prototype.lookupOption = function (key) {                                     // 46  // 101
  // this.route.options                                                                       // 47  // 102
  // NOTE: we've debated whether route options should come before controller but              // 48  // 103
  // Tom has convinced me that it's easier for people to think about overriding               // 49  // 104
  // controller stuff at the route option level. However, this has the possibly               // 50  // 105
  // counterintuitive effect that if you define this.someprop = true on the                   // 51  // 106
  // controller instance, and you have someprop defined as an option on your                  // 52  // 107
  // Route, the route option will take precedence.                                            // 53  // 108
  if (this.route && this.route.options && _.has(this.route.options, key))                     // 54  // 109
    return this.route.options[key];                                                           // 55  // 110
                                                                                              // 56  // 111
  // this.options                                                                             // 57  // 112
  if (_.has(this.options, key))                                                               // 58  // 113
    return this.options[key];                                                                 // 59  // 114
                                                                                              // 60  // 115
  // "this" object or its proto chain                                                         // 61  // 116
  if (typeof this[key] !== 'undefined')                                                       // 62  // 117
    return this[key];                                                                         // 63  // 118
                                                                                              // 64  // 119
  // see if we have the CurrentOptions dynamic variable set.                                  // 65  // 120
  var opts = CurrentOptions.get();                                                            // 66  // 121
  if (opts && _.has(opts, key))                                                               // 67  // 122
    return opts[key];                                                                         // 68  // 123
                                                                                              // 69  // 124
  // this.router.options                                                                      // 70  // 125
  if (this.router && this.router.options && _.has(this.router.options, key))                  // 71  // 126
    return this.router.options[key];                                                          // 72  // 127
};                                                                                            // 73  // 128
                                                                                              // 74  // 129
RouteController.prototype.configureFromUrl = function (url, context, options) {               // 75  // 130
  assert(typeof url === 'string', 'url must be a string');                                    // 76  // 131
  context = context || {};                                                                    // 77  // 132
  this.request = context.request || {};                                                       // 78  // 133
  this.response = context.response || {};                                                     // 79  // 134
  this.url = context.url || url;                                                              // 80  // 135
  this.originalUrl = context.originalUrl || url;                                              // 81  // 136
  this.method = this.request.method;                                                          // 82  // 137
  if (this.route) {                                                                           // 83  // 138
    // pass options to that we can set reactive: false                                        // 84  // 139
    this.setParams(this.route.params(url), options);                                          // 85  // 140
  }                                                                                           // 86  // 141
};                                                                                            // 87  // 142
                                                                                              // 88  // 143
/**                                                                                           // 89  // 144
 * Returns an array of hook functions for the given hook names. Hooks are                     // 90  // 145
 * collected in this order:                                                                   // 91  // 146
 *                                                                                            // 92  // 147
 * router global hooks                                                                        // 93  // 148
 * route option hooks                                                                         // 94  // 149
 * prototype of the controller                                                                // 95  // 150
 * this object for the controller                                                             // 96  // 151
 *                                                                                            // 97  // 152
 * For example, this.collectHooks('onBeforeAction', 'before')                                 // 98  // 153
 * will return an array of hook functions where the key is either onBeforeAction              // 99  // 154
 * or before.                                                                                 // 100
 *                                                                                            // 101
 * Hook values can also be strings in which case they are looked up in the                    // 102
 * Iron.Router.hooks object.                                                                  // 103
 *                                                                                            // 104
 * TODO: Add an options last argument which can specify to only collect hooks                 // 105
 * for a particular environment (client, server or both).                                     // 106
 */                                                                                           // 107
RouteController.prototype._collectHooks = function (/* hook1, alias1, ... */) {               // 108
  var self = this;                                                                            // 109
  var hookNames = _.toArray(arguments);                                                       // 110
                                                                                              // 111
  var getHookValues = function (value) {                                                      // 112
    if (!value)                                                                               // 113
      return [];                                                                              // 114
    var lookupHook = self.router.lookupHook;                                                  // 115
    var hooks = _.isArray(value) ? value : [value];                                           // 116
    return _.map(hooks, function (h) { return lookupHook(h); });                              // 117
  };                                                                                          // 118
                                                                                              // 119
  var collectInheritedHooks = function (ctor, hookName) {                                     // 120
    var hooks = [];                                                                           // 121
                                                                                              // 122
    if (ctor.__super__)                                                                       // 123
      hooks = hooks.concat(collectInheritedHooks(ctor.__super__.constructor, hookName));      // 124
                                                                                              // 125
    return _.has(ctor.prototype, hookName) ?                                                  // 126
      hooks.concat(getHookValues(ctor.prototype[hookName])) : hooks;                          // 127
  };                                                                                          // 128
                                                                                              // 129
  var eachHook = function (cb) {                                                              // 130
    for (var i = 0; i < hookNames.length; i++) {                                              // 131
      cb(hookNames[i]);                                                                       // 132
    }                                                                                         // 133
  };                                                                                          // 134
                                                                                              // 135
  var routerHooks = [];                                                                       // 136
  eachHook(function (hook) {                                                                  // 137
    var name = self.route && self.route.getName();                                            // 138
    var hooks = self.router.getHooks(hook, name);                                             // 139
    routerHooks = routerHooks.concat(hooks);                                                  // 140
  });                                                                                         // 141
                                                                                              // 142
  var protoHooks = [];                                                                        // 143
  eachHook(function (hook) {                                                                  // 144
    var hooks = collectInheritedHooks(self.constructor, hook);                                // 145
    protoHooks = protoHooks.concat(hooks);                                                    // 146
  });                                                                                         // 147
                                                                                              // 148
  var thisHooks = [];                                                                         // 149
  eachHook(function (hook) {                                                                  // 150
    if (_.has(self, hook)) {                                                                  // 151
      var hooks = getHookValues(self[hook]);                                                  // 152
      thisHooks = thisHooks.concat(hooks);                                                    // 153
    }                                                                                         // 154
  });                                                                                         // 155
                                                                                              // 156
  var routeHooks = [];                                                                        // 157
  if (self.route) {                                                                           // 158
    eachHook(function (hook) {                                                                // 159
      var hooks = getHookValues(self.route.options[hook]);                                    // 160
      routeHooks = routeHooks.concat(hooks);                                                  // 161
    });                                                                                       // 162
  }                                                                                           // 163
                                                                                              // 164
  var allHooks = routerHooks                                                                  // 165
    .concat(routeHooks)                                                                       // 166
    .concat(protoHooks)                                                                       // 167
    .concat(thisHooks);                                                                       // 168
                                                                                              // 169
  return allHooks;                                                                            // 170
};                                                                                            // 171
                                                                                              // 172
/**                                                                                           // 173
 * Runs each hook and returns the number of hooks that were run.                              // 174
 */                                                                                           // 175
RouteController.prototype.runHooks = function (/* hook, alias1, ...*/ ) {                     // 176
  var hooks = this._collectHooks.apply(this, arguments);                                      // 177
  for (var i = 0, l = hooks.length; i < l; i++) {                                             // 178
    var h = hooks[i];                                                                         // 179
    h.call(this);                                                                             // 180
  }                                                                                           // 181
  return hooks.length;                                                                        // 182
};                                                                                            // 183
                                                                                              // 184
RouteController.prototype.getParams = function () {                                           // 185
  return this.params;                                                                         // 186
};                                                                                            // 187
                                                                                              // 188
RouteController.prototype.setParams = function (value) {                                      // 189
  this.params = value;                                                                        // 190
  return this;                                                                                // 191
};                                                                                            // 192
                                                                                              // 193
Iron.RouteController = RouteController;                                                       // 194
                                                                                              // 195
////////////////////////////////////////////////////////////////////////////////////////////////     // 251
                                                                                                     // 252
}).call(this);                                                                                       // 253
                                                                                                     // 254
                                                                                                     // 255
                                                                                                     // 256
                                                                                                     // 257
                                                                                                     // 258
                                                                                                     // 259
(function () {                                                                                       // 260
                                                                                                     // 261
////////////////////////////////////////////////////////////////////////////////////////////////     // 262
//                                                                                            //     // 263
// packages/iron:router/lib/route_controller_server.js                                        //     // 264
//                                                                                            //     // 265
////////////////////////////////////////////////////////////////////////////////////////////////     // 266
                                                                                              //     // 267
/*****************************************************************************/               // 1   // 268
/* Imports */                                                                                 // 2   // 269
/*****************************************************************************/               // 3   // 270
var Fiber = Npm.require('fibers');                                                            // 4   // 271
var Controller = Iron.Controller;                                                             // 5   // 272
var Url = Iron.Url;                                                                           // 6   // 273
var MiddlewareStack = Iron.MiddlewareStack;                                                   // 7   // 274
                                                                                              // 8   // 275
/*****************************************************************************/               // 9   // 276
/* RouteController */                                                                         // 10  // 277
/*****************************************************************************/               // 11  // 278
                                                                                              // 12  // 279
/**                                                                                           // 13  // 280
 * Server specific initialization.                                                            // 14  // 281
 */                                                                                           // 15  // 282
RouteController.prototype.init = function (options) {};                                       // 16  // 283
                                                                                              // 17  // 284
/**                                                                                           // 18  // 285
 * Let this controller run a dispatch process. This function will be called                   // 19  // 286
 * from the router. That way, any state associated with the dispatch can go on                // 20  // 287
 * the controller instance. Note: no result returned from dispatch because its                // 21  // 288
 * run inside its own fiber. Might at some point move the fiber stuff to a                    // 22  // 289
 * higher layer.                                                                              // 23  // 290
 */                                                                                           // 24  // 291
RouteController.prototype.dispatch = function (stack, url, done) {                            // 25  // 292
  var self = this;                                                                            // 26  // 293
  Fiber(function () {                                                                         // 27  // 294
    stack.dispatch(url, self, done);                                                          // 28  // 295
  }).run();                                                                                   // 29  // 296
};                                                                                            // 30  // 297
                                                                                              // 31  // 298
/**                                                                                           // 32  // 299
 * Run a route on the server. When the router runs its middleware stack, it                   // 33  // 300
 * can run regular middleware functions or it can run a route. There should                   // 34  // 301
 * only one route object per path as where there may be many middleware                       // 35  // 302
 * functions.                                                                                 // 36  // 303
 *                                                                                            // 37  // 304
 * For example:                                                                               // 38  // 305
 *                                                                                            // 39  // 306
 *   "/some/path" => [middleware1, middleware2, route, middleware3]                           // 40  // 307
 *                                                                                            // 41  // 308
 * When a route is dispatched, it tells the controller to _runRoute so that                   // 42  // 309
 * the controller can control the process. At this point we should already be                 // 43  // 310
 * in a dispatch so a computation should already exist.                                       // 44  // 311
 */                                                                                           // 45  // 312
RouteController.prototype._runRoute = function (route, url, done) {                           // 46  // 313
  var self = this;                                                                            // 47  // 314
  var stack = new MiddlewareStack;                                                            // 48  // 315
                                                                                              // 49  // 316
  var onRunHooks = this._collectHooks('onRun', 'load');                                       // 50  // 317
  stack = stack.append(onRunHooks, {where: 'server'});                                        // 51  // 318
                                                                                              // 52  // 319
  var beforeHooks = this._collectHooks('onBeforeAction', 'before');                           // 53  // 320
  stack.append(beforeHooks, {where: 'server'});                                               // 54  // 321
                                                                                              // 55  // 322
  // make sure the action stack has at least one handler on it that defaults                  // 56  // 323
  // to the 'action' method                                                                   // 57  // 324
  if (route._actionStack.length === 0) {                                                      // 58  // 325
    route._actionStack.push(route._path, 'action', route.options);                            // 59  // 326
  }                                                                                           // 60  // 327
                                                                                              // 61  // 328
  stack = stack.concat(route._actionStack);                                                   // 62  // 329
  stack.dispatch(url, this, done);                                                            // 63  // 330
                                                                                              // 64  // 331
  // run the after hooks.                                                                     // 65  // 332
  this.next = function () {};                                                                 // 66  // 333
  this.runHooks('onAfterAction', 'after');                                                    // 67  // 334
};                                                                                            // 68  // 335
                                                                                              // 69  // 336
////////////////////////////////////////////////////////////////////////////////////////////////     // 337
                                                                                                     // 338
}).call(this);                                                                                       // 339
                                                                                                     // 340
                                                                                                     // 341
                                                                                                     // 342
                                                                                                     // 343
                                                                                                     // 344
                                                                                                     // 345
(function () {                                                                                       // 346
                                                                                                     // 347
////////////////////////////////////////////////////////////////////////////////////////////////     // 348
//                                                                                            //     // 349
// packages/iron:router/lib/route.js                                                          //     // 350
//                                                                                            //     // 351
////////////////////////////////////////////////////////////////////////////////////////////////     // 352
                                                                                              //     // 353
var Url = Iron.Url;                                                                           // 1   // 354
var MiddlewareStack = Iron.MiddlewareStack;                                                   // 2   // 355
var assert = Iron.utils.assert;                                                               // 3   // 356
                                                                                              // 4   // 357
/*****************************************************************************/               // 5   // 358
/* Both */                                                                                    // 6   // 359
/*****************************************************************************/               // 7   // 360
Route = function (path, fn, options) {                                                        // 8   // 361
  var route = function (req, res, next) {                                                     // 9   // 362
    var controller = this;                                                                    // 10  // 363
    controller.request = req;                                                                 // 11  // 364
    controller.response = res;                                                                // 12  // 365
    route.dispatch(req.url, controller, next);                                                // 13  // 366
  }                                                                                           // 14  // 367
                                                                                              // 15  // 368
  if (typeof fn === 'object') {                                                               // 16  // 369
    options = fn;                                                                             // 17  // 370
    fn = options.action;                                                                      // 18  // 371
  }                                                                                           // 19  // 372
                                                                                              // 20  // 373
  options = options || {};                                                                    // 21  // 374
                                                                                              // 22  // 375
  if (typeof path === 'string' && path.charAt(0) !== '/') {                                   // 23  // 376
    path = options.path ? options.path : '/' + path                                           // 24  // 377
  }                                                                                           // 25  // 378
                                                                                              // 26  // 379
  // extend the route function with properties from this instance and its                     // 27  // 380
  // prototype.                                                                               // 28  // 381
  _.extend(route, this);                                                                      // 29  // 382
                                                                                              // 30  // 383
  // always good to have options                                                              // 31  // 384
  options = route.options = options || {};                                                    // 32  // 385
                                                                                              // 33  // 386
  // the main action function as well as any HTTP VERB action functions will go               // 34  // 387
  // onto this stack.                                                                         // 35  // 388
  route._actionStack = new MiddlewareStack;                                                   // 36  // 389
                                                                                              // 37  // 390
  // any before hooks will go onto this stack to make sure they get executed                  // 38  // 391
  // before the action stack.                                                                 // 39  // 392
  route._beforeStack = new MiddlewareStack;                                                   // 40  // 393
  route._beforeStack.append(route.options.onBeforeAction);                                    // 41  // 394
  route._beforeStack.append(route.options.before);                                            // 42  // 395
                                                                                              // 43  // 396
  // after hooks get run after the action stack                                               // 44  // 397
  route._afterStack = new MiddlewareStack;                                                    // 45  // 398
  route._afterStack.append(route.options.onAfterAction);                                      // 46  // 399
  route._afterStack.append(route.options.after);                                              // 47  // 400
                                                                                              // 48  // 401
                                                                                              // 49  // 402
  // track which methods this route uses                                                      // 50  // 403
  route._methods = {};                                                                        // 51  // 404
                                                                                              // 52  // 405
  if (typeof fn === 'string') {                                                               // 53  // 406
    route._actionStack.push(path, _.extend(options, {                                         // 54  // 407
      template: fn                                                                            // 55  // 408
    }));                                                                                      // 56  // 409
  } else if (typeof fn === 'function' || typeof fn === 'object') {                            // 57  // 410
    route._actionStack.push(path, fn, options);                                               // 58  // 411
  }                                                                                           // 59  // 412
                                                                                              // 60  // 413
  route._path = path;                                                                         // 61  // 414
  return route;                                                                               // 62  // 415
};                                                                                            // 63  // 416
                                                                                              // 64  // 417
/**                                                                                           // 65  // 418
 * The name of the route is actually stored on the handler since a route is a                 // 66  // 419
 * function that has an unassignable "name" property.                                         // 67  // 420
 */                                                                                           // 68  // 421
Route.prototype.getName = function () {                                                       // 69  // 422
  return this.handler && this.handler.name;                                                   // 70  // 423
};                                                                                            // 71  // 424
                                                                                              // 72  // 425
/**                                                                                           // 73  // 426
 * Returns an appropriate RouteController constructor the this Route.                         // 74  // 427
 *                                                                                            // 75  // 428
 * There are three possibilities:                                                             // 76  // 429
 *                                                                                            // 77  // 430
 *  1. controller option provided as a string on the route                                    // 78  // 431
 *  2. a controller in the global namespace with the converted name of the route              // 79  // 432
 *  3. a default RouteController                                                              // 80  // 433
 *                                                                                            // 81  // 434
 */                                                                                           // 82  // 435
Route.prototype.findControllerConstructor = function () {                                     // 83  // 436
  var self = this;                                                                            // 84  // 437
                                                                                              // 85  // 438
  var resolve = function (name, opts) {                                                       // 86  // 439
    opts = opts || {};                                                                        // 87  // 440
    var C = Iron.utils.resolve(name);                                                         // 88  // 441
    if (!C || !RouteController.prototype.isPrototypeOf(C.prototype)) {                        // 89  // 442
      if (opts.supressErrors !== true)                                                        // 90  // 443
        throw new Error("RouteController '" + name + "' is not defined.");                    // 91  // 444
      else                                                                                    // 92  // 445
        return undefined;                                                                     // 93  // 446
    } else {                                                                                  // 94  // 447
      return C;                                                                               // 95  // 448
    }                                                                                         // 96  // 449
  };                                                                                          // 97  // 450
                                                                                              // 98  // 451
  var convert = function (name) {                                                             // 99  // 452
    return self.router.toControllerName(name);                                                // 100
  };                                                                                          // 101
                                                                                              // 102
  var result;                                                                                 // 103
  var name = this.getName();                                                                  // 104
                                                                                              // 105
  // the controller was set directly                                                          // 106
  if (typeof this.options.controller === 'function')                                          // 107
    return this.options.controller;                                                           // 108
                                                                                              // 109
  // was the controller specified precisely by name? then resolve to an actual                // 110
  // javascript constructor value                                                             // 111
  else if (typeof this.options.controller === 'string')                                       // 112
    return resolve(this.options.controller);                                                  // 113
                                                                                              // 114
  // otherwise do we have a name? try to convert the name to a controller name                // 115
  // and resolve it to a value                                                                // 116
  else if (name && (result = resolve(convert(name), {supressErrors: true})))                  // 117
    return result;                                                                            // 118
                                                                                              // 119
  // otherwise just use an anonymous route controller                                         // 120
  else                                                                                        // 121
    return RouteController;                                                                   // 122
};                                                                                            // 123
                                                                                              // 124
                                                                                              // 125
/**                                                                                           // 126
 * Create a new controller for the route.                                                     // 127
 */                                                                                           // 128
Route.prototype.createController = function (options) {                                       // 129
  options = options || {};                                                                    // 130
  var C = this.findControllerConstructor();                                                   // 131
  options.route = this;                                                                       // 132
  var instance = new C(options);                                                              // 133
  return instance;                                                                            // 134
};                                                                                            // 135
                                                                                              // 136
Route.prototype.setControllerParams = function (controller, url) {                            // 137
};                                                                                            // 138
                                                                                              // 139
/**                                                                                           // 140
 * Dispatch into the route's middleware stack.                                                // 141
 */                                                                                           // 142
Route.prototype.dispatch = function (url, context, done) {                                    // 143
  // call runRoute on the controller which will behave similarly to the previous              // 144
  // version of IR.                                                                           // 145
  assert(context._runRoute, "context doesn't have a _runRoute method");                       // 146
  return context._runRoute(this, url, done);                                                  // 147
};                                                                                            // 148
                                                                                              // 149
/**                                                                                           // 150
 * Returns a relative path for the route.                                                     // 151
 */                                                                                           // 152
Route.prototype.path = function (params, options) {                                           // 153
  return this.handler.resolve(params, options);                                               // 154
};                                                                                            // 155
                                                                                              // 156
/**                                                                                           // 157
 * Return a fully qualified url for the route, given a set of parmeters and                   // 158
 * options like hash and query.                                                               // 159
 */                                                                                           // 160
Route.prototype.url = function (params, options) {                                            // 161
  var path = this.path(params, options);                                                      // 162
  var host = (options && options.host) || Meteor.absoluteUrl();                               // 163
                                                                                              // 164
  if (host.charAt(host.length-1) === '/');                                                    // 165
    host = host.slice(0, host.length-1);                                                      // 166
  return host + path;                                                                         // 167
};                                                                                            // 168
                                                                                              // 169
/**                                                                                           // 170
 * Return a params object for the route given a path.                                         // 171
 */                                                                                           // 172
Route.prototype.params = function (path) {                                                    // 173
  return this.handler.params(path);                                                           // 174
};                                                                                            // 175
                                                                                              // 176
/**                                                                                           // 177
 * Add convenience methods for each HTTP verb.                                                // 178
 *                                                                                            // 179
 * Example:                                                                                   // 180
 *  var route = router.route('/item')                                                         // 181
 *    .get(function () { })                                                                   // 182
 *    .post(function () { })                                                                  // 183
 *    .put(function () { })                                                                   // 184
 */                                                                                           // 185
_.each(HTTP_METHODS, function (method) {                                                      // 186
  Route.prototype[method] = function (fn) {                                                   // 187
    // track the method being used for OPTIONS requests.                                      // 188
    this._methods[method] = true;                                                             // 189
                                                                                              // 190
    this._actionStack.push(this._path, fn, {                                                  // 191
      // give each method a unique name so it doesn't clash with the route's                  // 192
      // name in the action stack                                                             // 193
      name: this.getName() + '_' + method.toLowerCase(),                                      // 194
      method: method,                                                                         // 195
                                                                                              // 196
      // for now just make the handler where the same as the route, presumably a              // 197
      // server route.                                                                        // 198
      where: this.handler.where,                                                              // 199
      mount: false                                                                            // 200
    });                                                                                       // 201
                                                                                              // 202
    return this;                                                                              // 203
  };                                                                                          // 204
});                                                                                           // 205
                                                                                              // 206
Iron.Route = Route;                                                                           // 207
                                                                                              // 208
////////////////////////////////////////////////////////////////////////////////////////////////     // 562
                                                                                                     // 563
}).call(this);                                                                                       // 564
                                                                                                     // 565
                                                                                                     // 566
                                                                                                     // 567
                                                                                                     // 568
                                                                                                     // 569
                                                                                                     // 570
(function () {                                                                                       // 571
                                                                                                     // 572
////////////////////////////////////////////////////////////////////////////////////////////////     // 573
//                                                                                            //     // 574
// packages/iron:router/lib/router.js                                                         //     // 575
//                                                                                            //     // 576
////////////////////////////////////////////////////////////////////////////////////////////////     // 577
                                                                                              //     // 578
/*****************************************************************************/               // 1   // 579
/* Imports */                                                                                 // 2   // 580
/*****************************************************************************/               // 3   // 581
var MiddlewareStack = Iron.MiddlewareStack;                                                   // 4   // 582
var Url = Iron.Url;                                                                           // 5   // 583
var Layout = Iron.Layout;                                                                     // 6   // 584
var warn = Iron.utils.warn;                                                                   // 7   // 585
var assert = Iron.utils.assert;                                                               // 8   // 586
                                                                                              // 9   // 587
Router = function (options) {                                                                 // 10  // 588
  // keep the same api throughout which is:                                                   // 11  // 589
  // fn(url, context, done);                                                                  // 12  // 590
  function router (req, res, next) {                                                          // 13  // 591
    //XXX this assumes no other routers on the parent stack which we should probably fix      // 14  // 592
    router.dispatch(req.url, {                                                                // 15  // 593
      request: req,                                                                           // 16  // 594
      response: res                                                                           // 17  // 595
    }, next);                                                                                 // 18  // 596
  }                                                                                           // 19  // 597
                                                                                              // 20  // 598
  // the main router stack                                                                    // 21  // 599
  router._stack = new MiddlewareStack;                                                        // 22  // 600
                                                                                              // 23  // 601
  // for storing global hooks like before, after, etc.                                        // 24  // 602
  router._globalHooks = {};                                                                   // 25  // 603
                                                                                              // 26  // 604
  // backward compat and quicker lookup of Route handlers vs. regular function                // 27  // 605
  // handlers.                                                                                // 28  // 606
  router.routes = [];                                                                         // 29  // 607
                                                                                              // 30  // 608
  // to make sure we don't have more than one route per path                                  // 31  // 609
  router.routes._byPath = {};                                                                 // 32  // 610
                                                                                              // 33  // 611
  // always good to have options                                                              // 34  // 612
  this.configure.call(router, options);                                                       // 35  // 613
                                                                                              // 36  // 614
  // add proto properties to the router function                                              // 37  // 615
  _.extend(router, this);                                                                     // 38  // 616
                                                                                              // 39  // 617
  // let client and server side routing doing different things here                           // 40  // 618
  this.init.call(router, options);                                                            // 41  // 619
                                                                                              // 42  // 620
  Meteor.startup(function () {                                                                // 43  // 621
    Meteor.defer(function () {                                                                // 44  // 622
      if (router.options.autoStart !== false)                                                 // 45  // 623
        router.start();                                                                       // 46  // 624
    });                                                                                       // 47  // 625
  });                                                                                         // 48  // 626
                                                                                              // 49  // 627
  return router;                                                                              // 50  // 628
};                                                                                            // 51  // 629
                                                                                              // 52  // 630
Router.prototype.init = function (options) {};                                                // 53  // 631
                                                                                              // 54  // 632
Router.prototype.configure = function (options) {                                             // 55  // 633
  var self = this;                                                                            // 56  // 634
                                                                                              // 57  // 635
  options = options || {};                                                                    // 58  // 636
                                                                                              // 59  // 637
  var toArray = function (value) {                                                            // 60  // 638
    if (!value)                                                                               // 61  // 639
      return [];                                                                              // 62  // 640
                                                                                              // 63  // 641
    if (_.isArray(value))                                                                     // 64  // 642
      return value;                                                                           // 65  // 643
                                                                                              // 66  // 644
    return [value];                                                                           // 67  // 645
  };                                                                                          // 68  // 646
                                                                                              // 69  // 647
  // e.g. before: fn OR before: [fn1, fn2]                                                    // 70  // 648
  _.each(Iron.Router.HOOK_TYPES, function eachHookType (type) {                               // 71  // 649
    if (options[type]) {                                                                      // 72  // 650
      _.each(toArray(options[type]), function eachHook (hook) {                               // 73  // 651
        self.addHook(type, hook);                                                             // 74  // 652
      });                                                                                     // 75  // 653
                                                                                              // 76  // 654
      delete options[type];                                                                   // 77  // 655
    }                                                                                         // 78  // 656
  });                                                                                         // 79  // 657
                                                                                              // 80  // 658
  this.options = this.options || {};                                                          // 81  // 659
  _.extend(this.options, options);                                                            // 82  // 660
                                                                                              // 83  // 661
  return this;                                                                                // 84  // 662
};                                                                                            // 85  // 663
                                                                                              // 86  // 664
/**                                                                                           // 87  // 665
 * Just to support legacy calling. Doesn't really serve much purpose.                         // 88  // 666
 */                                                                                           // 89  // 667
Router.prototype.map = function (fn) {                                                        // 90  // 668
  return fn.call(this);                                                                       // 91  // 669
};                                                                                            // 92  // 670
                                                                                              // 93  // 671
/*                                                                                            // 94  // 672
 * XXX removing for now until this is thought about more carefully.                           // 95  // 673
Router.prototype.use = function (path, fn, opts) {                                            // 96  // 674
  if (typeof path === 'function') {                                                           // 97  // 675
    opts = fn || {};                                                                          // 98  // 676
    opts.mount = true;                                                                        // 99  // 677
    opts.where = opts.where || 'server';                                                      // 100
    this._stack.push(path, opts);                                                             // 101
  } else {                                                                                    // 102
    opts = opts || {};                                                                        // 103
    opts.mount = true;                                                                        // 104
    opts.where = opts.where || 'server';                                                      // 105
    this._stack.push(path, fn, opts);                                                         // 106
  }                                                                                           // 107
                                                                                              // 108
  return this;                                                                                // 109
};                                                                                            // 110
*/                                                                                            // 111
                                                                                              // 112
//XXX seems like we could put a params method on the route directly and make it reactive      // 113
Router.prototype.route = function (path, fn, opts) {                                          // 114
  var typeOf = function (val) { return Object.prototype.toString.call(val); };                // 115
  assert(typeOf(path) === '[object String]' || typeOf(path) === '[object RegExp]', "Router.route requires a path that is a string or regular expression.");
                                                                                              // 117
  if (typeof fn === 'object') {                                                               // 118
    opts = fn;                                                                                // 119
    fn = opts.action;                                                                         // 120
  }                                                                                           // 121
                                                                                              // 122
  var route = new Route(path, fn, opts);                                                      // 123
                                                                                              // 124
  opts = opts || {};                                                                          // 125
                                                                                              // 126
  // don't mount the route                                                                    // 127
  opts.mount = false;                                                                         // 128
                                                                                              // 129
  // stack expects a function which is exactly what a new Route returns!                      // 130
  var handler = this._stack.push(path, route, opts);                                          // 131
                                                                                              // 132
  handler.route = route;                                                                      // 133
  route.handler = handler;                                                                    // 134
  route.router = this;                                                                        // 135
                                                                                              // 136
  assert(!this.routes._byPath[handler.path],                                                  // 137
    "A route for the path " + JSON.stringify(handler.path) + " already exists by the name of " + JSON.stringify(handler.name) + ".");
  this.routes._byPath[handler.path] = route;                                                  // 139
                                                                                              // 140
  this.routes.push(route);                                                                    // 141
                                                                                              // 142
  if (typeof handler.name === 'string')                                                       // 143
    this.routes[handler.name] = route;                                                        // 144
                                                                                              // 145
  return route;                                                                               // 146
};                                                                                            // 147
                                                                                              // 148
/**                                                                                           // 149
 * Find the first route for the given url and options.                                        // 150
 */                                                                                           // 151
Router.prototype.findFirstRoute = function (url) {                                            // 152
  var isMatch;                                                                                // 153
  var routeHandler;                                                                           // 154
  for (var i = 0; i < this.routes.length; i++) {                                              // 155
    route = this.routes[i];                                                                   // 156
                                                                                              // 157
    // only matches if the url matches AND the                                                // 158
    // current environment matches.                                                           // 159
    isMatch = route.handler.test(url, {                                                       // 160
      where: Meteor.isServer ? 'server' : 'client'                                            // 161
    });                                                                                       // 162
                                                                                              // 163
    if (isMatch)                                                                              // 164
      return route;                                                                           // 165
  }                                                                                           // 166
                                                                                              // 167
  return null;                                                                                // 168
};                                                                                            // 169
                                                                                              // 170
Router.prototype.path = function (routeName, params, options) {                               // 171
  var route = this.routes[routeName];                                                         // 172
  warn(route, "You called Router.path for a route named " + JSON.stringify(routeName) + " but that route doesn't seem to exist. Are you sure you created it?");
  return route && route.path(params, options);                                                // 174
};                                                                                            // 175
                                                                                              // 176
Router.prototype.url = function (routeName, params, options) {                                // 177
  var route = this.routes[routeName];                                                         // 178
  warn(route, "You called Router.url for a route named " + JSON.stringify(routeName) + " but that route doesn't seem to exist. Are you sure you created it?");
  return route && route.url(params, options);                                                 // 180
};                                                                                            // 181
                                                                                              // 182
/**                                                                                           // 183
 * Create a new controller for a dispatch.                                                    // 184
 */                                                                                           // 185
Router.prototype.createController = function (url, context) {                                 // 186
  // see if there's a route for this url and environment                                      // 187
  // it's possible that we find a route but it's a client                                     // 188
  // route so we don't instantiate its controller and instead                                 // 189
  // use an anonymous controller to run the route.                                            // 190
  var route = this.findFirstRoute(url);                                                       // 191
  var controller;                                                                             // 192
                                                                                              // 193
  context = context || {};                                                                    // 194
                                                                                              // 195
  if (route)                                                                                  // 196
    // let the route decide what controller to use                                            // 197
    controller = route.createController({layout: this._layout});                              // 198
  else                                                                                        // 199
    // create an anonymous controller                                                         // 200
    controller = new RouteController({layout: this._layout});                                 // 201
                                                                                              // 202
  controller.router = this;                                                                   // 203
  controller.configureFromUrl(url, context, {reactive: false});                               // 204
  return controller;                                                                          // 205
};                                                                                            // 206
                                                                                              // 207
Router.prototype.setTemplateNameConverter = function (fn) {                                   // 208
  this._templateNameConverter = fn;                                                           // 209
  return this;                                                                                // 210
};                                                                                            // 211
                                                                                              // 212
Router.prototype.setControllerNameConverter = function (fn) {                                 // 213
  this._controllerNameConverter = fn;                                                         // 214
  return this;                                                                                // 215
};                                                                                            // 216
                                                                                              // 217
Router.prototype.toTemplateName = function (str) {                                            // 218
  if (this._templateNameConverter)                                                            // 219
    return this._templateNameConverter(str);                                                  // 220
  else                                                                                        // 221
    return Iron.utils.classCase(str);                                                         // 222
};                                                                                            // 223
                                                                                              // 224
Router.prototype.toControllerName = function (str) {                                          // 225
  if (this._controllerNameConverter)                                                          // 226
    return this._controllerNameConverter(str);                                                // 227
  else                                                                                        // 228
    return Iron.utils.classCase(str) + 'Controller';                                          // 229
};                                                                                            // 230
                                                                                              // 231
/**                                                                                           // 232
 *                                                                                            // 233
 * Add a hook to all routes. The hooks will apply to all routes,                              // 234
 * unless you name routes to include or exclude via `only` and `except` options               // 235
 *                                                                                            // 236
 * @param {String} [type] one of 'load', 'unload', 'before' or 'after'                        // 237
 * @param {Object} [options] Options to controll the hooks [optional]                         // 238
 * @param {Function} [hook] Callback to run                                                   // 239
 * @return {IronRouter}                                                                       // 240
 * @api public                                                                                // 241
 *                                                                                            // 242
 */                                                                                           // 243
                                                                                              // 244
Router.prototype.addHook = function(type, hook, options) {                                    // 245
  var self = this;                                                                            // 246
                                                                                              // 247
  options = options || {};                                                                    // 248
                                                                                              // 249
  var toArray = function (input) {                                                            // 250
    if (!input)                                                                               // 251
      return [];                                                                              // 252
    else if (_.isArray(input))                                                                // 253
      return input;                                                                           // 254
    else                                                                                      // 255
      return [input];                                                                         // 256
  }                                                                                           // 257
                                                                                              // 258
  if (options.only)                                                                           // 259
    options.only = toArray(options.only);                                                     // 260
  if (options.except)                                                                         // 261
    options.except = toArray(options.except);                                                 // 262
                                                                                              // 263
  var hooks = this._globalHooks[type] = this._globalHooks[type] || [];                        // 264
                                                                                              // 265
  var hookWithOptions = function () {                                                         // 266
    var thisArg = this;                                                                       // 267
    var args = arguments;                                                                     // 268
    // this allows us to bind hooks to options that get looked up when you call               // 269
    // this.lookupOption from within the hook. And it looks better to keep                    // 270
    // plugin/hook related options close to their definitions instead of                      // 271
    // Router.configure. But we use a dynamic variable so we don't have to                    // 272
    // pass the options explicitly as an argument and plugin creators can                     // 273
    // just use this.lookupOption which will follow the proper lookup chain from              // 274
    // "this", local options, dynamic variable options, route, router, etc.                   // 275
    return CurrentOptions.withValue(options, function () {                                    // 276
      return self.lookupHook(hook).apply(thisArg, args);                                      // 277
    });                                                                                       // 278
  };                                                                                          // 279
                                                                                              // 280
  hooks.push({options: options, hook: hookWithOptions});                                      // 281
  return this;                                                                                // 282
};                                                                                            // 283
                                                                                              // 284
/**                                                                                           // 285
 * If the argument is a function return it directly. If it's a string, see if                 // 286
 * there is a function in the Iron.Router.hooks namespace. Throw an error if we               // 287
 * can't find the hook.                                                                       // 288
 */                                                                                           // 289
Router.prototype.lookupHook = function (nameOrFn) {                                           // 290
  var fn = nameOrFn;                                                                          // 291
                                                                                              // 292
  // if we already have a func just return it                                                 // 293
  if (_.isFunction(fn))                                                                       // 294
    return fn;                                                                                // 295
                                                                                              // 296
  // look up one of the out-of-box hooks like                                                 // 297
  // 'loaded or 'dataNotFound' if the nameOrFn is a                                           // 298
  // string                                                                                   // 299
  if (_.isString(fn)) {                                                                       // 300
    if (_.isFunction(Iron.Router.hooks[fn]))                                                  // 301
      return Iron.Router.hooks[fn];                                                           // 302
  }                                                                                           // 303
                                                                                              // 304
  // we couldn't find it so throw an error                                                    // 305
  throw new Error("No hook found named: " + nameOrFn);                                        // 306
};                                                                                            // 307
                                                                                              // 308
/**                                                                                           // 309
 *                                                                                            // 310
 * Fetch the list of global hooks that apply to the given route name.                         // 311
 * Hooks are defined by the .addHook() function above.                                        // 312
 *                                                                                            // 313
 * @param {String} [type] one of IronRouter.HOOK_TYPES                                        // 314
 * @param {String} [name] the name of the route we are interested in                          // 315
 * @return {[Function]} [hooks] an array of hooks to run                                      // 316
 * @api public                                                                                // 317
 *                                                                                            // 318
 */                                                                                           // 319
                                                                                              // 320
Router.prototype.getHooks = function(type, name) {                                            // 321
  var self = this;                                                                            // 322
  var hooks = [];                                                                             // 323
                                                                                              // 324
  _.each(this._globalHooks[type], function(hook) {                                            // 325
    var options = hook.options;                                                               // 326
                                                                                              // 327
    if (options.except && _.include(options.except, name))                                    // 328
      return [];                                                                              // 329
                                                                                              // 330
    if (options.only && ! _.include(options.only, name))                                      // 331
      return [];                                                                              // 332
                                                                                              // 333
    hooks.push(hook.hook);                                                                    // 334
  });                                                                                         // 335
                                                                                              // 336
  return hooks;                                                                               // 337
};                                                                                            // 338
                                                                                              // 339
Router.HOOK_TYPES = [                                                                         // 340
  'onRun',                                                                                    // 341
  'onRerun',                                                                                  // 342
  'onBeforeAction',                                                                           // 343
  'onAfterAction',                                                                            // 344
  'onStop',                                                                                   // 345
                                                                                              // 346
  // not technically a hook but we'll use it                                                  // 347
  // in a similar way. This will cause waitOn                                                 // 348
  // to be added as a method to the Router and then                                           // 349
  // it can be selectively applied to specific routes                                         // 350
  'waitOn',                                                                                   // 351
  'subscriptions',                                                                            // 352
                                                                                              // 353
  // legacy hook types but we'll let them slide                                               // 354
  'load', // onRun                                                                            // 355
  'before', // onBeforeAction                                                                 // 356
  'after', // onAfterAction                                                                   // 357
  'unload' // onStop                                                                          // 358
];                                                                                            // 359
                                                                                              // 360
/**                                                                                           // 361
 * A namespace for hooks keyed by name.                                                       // 362
 */                                                                                           // 363
Router.hooks = {};                                                                            // 364
                                                                                              // 365
                                                                                              // 366
/**                                                                                           // 367
 * A namespace for plugin functions keyed by name.                                            // 368
 */                                                                                           // 369
Router.plugins = {};                                                                          // 370
                                                                                              // 371
/**                                                                                           // 372
 * Auto add helper mtehods for all the hooks.                                                 // 373
 */                                                                                           // 374
                                                                                              // 375
_.each(Router.HOOK_TYPES, function (type) {                                                   // 376
  Router.prototype[type] = function (hook, options) {                                         // 377
    this.addHook(type, hook, options);                                                        // 378
  };                                                                                          // 379
});                                                                                           // 380
                                                                                              // 381
/**                                                                                           // 382
 * Add a plugin to the router instance.                                                       // 383
 */                                                                                           // 384
Router.prototype.plugin = function (nameOrFn, options) {                                      // 385
  var func;                                                                                   // 386
                                                                                              // 387
  if (typeof nameOrFn === 'function')                                                         // 388
    func = nameOrFn;                                                                          // 389
  else if (typeof nameOrFn === 'string')                                                      // 390
    func = Iron.Router.plugins[nameOrFn];                                                     // 391
                                                                                              // 392
  if (!func)                                                                                  // 393
    throw new Error("No plugin found named " + JSON.stringify(nameOrFn));                     // 394
                                                                                              // 395
  // fn(router, options)                                                                      // 396
  func.call(this, this, options);                                                             // 397
                                                                                              // 398
  return this;                                                                                // 399
};                                                                                            // 400
                                                                                              // 401
Iron.Router = Router;                                                                         // 402
                                                                                              // 403
////////////////////////////////////////////////////////////////////////////////////////////////     // 982
                                                                                                     // 983
}).call(this);                                                                                       // 984
                                                                                                     // 985
                                                                                                     // 986
                                                                                                     // 987
                                                                                                     // 988
                                                                                                     // 989
                                                                                                     // 990
(function () {                                                                                       // 991
                                                                                                     // 992
////////////////////////////////////////////////////////////////////////////////////////////////     // 993
//                                                                                            //     // 994
// packages/iron:router/lib/hooks.js                                                          //     // 995
//                                                                                            //     // 996
////////////////////////////////////////////////////////////////////////////////////////////////     // 997
                                                                                              //     // 998
if (typeof Template !== 'undefined') {                                                        // 1   // 999
  /**                                                                                         // 2   // 1000
   * The default anonymous loading template.                                                  // 3   // 1001
   */                                                                                         // 4   // 1002
  var defaultLoadingTemplate = new Template('DefaultLoadingTemplate', function () {           // 5   // 1003
    return 'Loading...';                                                                      // 6   // 1004
  });                                                                                         // 7   // 1005
                                                                                              // 8   // 1006
  /**                                                                                         // 9   // 1007
   * The default anonymous data not found template.                                           // 10  // 1008
   */                                                                                         // 11  // 1009
  var defaultDataNotFoundTemplate = new Template('DefaultDataNotFoundTemplate', function () { // 12  // 1010
    return 'Data not found...';                                                               // 13  // 1011
  });                                                                                         // 14  // 1012
}                                                                                             // 15  // 1013
                                                                                              // 16  // 1014
/**                                                                                           // 17  // 1015
 * Automatically render a loading template into the main region if the                        // 18  // 1016
 * controller is not ready (i.e. this.ready() is false). If no loadingTemplate                // 19  // 1017
 * is defined use some default text.                                                          // 20  // 1018
 */                                                                                           // 21  // 1019
                                                                                              // 22  // 1020
Router.hooks.loading = function () {                                                          // 23  // 1021
  // if we're ready just pass through                                                         // 24  // 1022
  if (this.ready()) {                                                                         // 25  // 1023
    this.next();                                                                              // 26  // 1024
    return;                                                                                   // 27  // 1025
  }                                                                                           // 28  // 1026
                                                                                              // 29  // 1027
  var template = this.lookupOption('loadingTemplate');                                        // 30  // 1028
  this.render(template || defaultLoadingTemplate);                                            // 31  // 1029
  this.renderRegions();                                                                       // 32  // 1030
};                                                                                            // 33  // 1031
                                                                                              // 34  // 1032
/**                                                                                           // 35  // 1033
 * Render a "data not found" template if a global data function returns a falsey              // 36  // 1034
 * value                                                                                      // 37  // 1035
 */                                                                                           // 38  // 1036
Router.hooks.dataNotFound = function () {                                                     // 39  // 1037
  if (!this.ready()) {                                                                        // 40  // 1038
    this.next();                                                                              // 41  // 1039
    return;                                                                                   // 42  // 1040
  }                                                                                           // 43  // 1041
                                                                                              // 44  // 1042
  var data = this.lookupOption('data');                                                       // 45  // 1043
  var dataValue;                                                                              // 46  // 1044
  var template = this.lookupOption('notFoundTemplate');                                       // 47  // 1045
                                                                                              // 48  // 1046
  if (typeof data === 'function') {                                                           // 49  // 1047
    if (!(dataValue = data.call(this))) {                                                     // 50  // 1048
      this.render(template || defaultDataNotFoundTemplate);                                   // 51  // 1049
      this.renderRegions();                                                                   // 52  // 1050
      return;                                                                                 // 53  // 1051
    }                                                                                         // 54  // 1052
  }                                                                                           // 55  // 1053
                                                                                              // 56  // 1054
  // okay never mind just pass along now                                                      // 57  // 1055
  this.next();                                                                                // 58  // 1056
};                                                                                            // 59  // 1057
                                                                                              // 60  // 1058
////////////////////////////////////////////////////////////////////////////////////////////////     // 1059
                                                                                                     // 1060
}).call(this);                                                                                       // 1061
                                                                                                     // 1062
                                                                                                     // 1063
                                                                                                     // 1064
                                                                                                     // 1065
                                                                                                     // 1066
                                                                                                     // 1067
(function () {                                                                                       // 1068
                                                                                                     // 1069
////////////////////////////////////////////////////////////////////////////////////////////////     // 1070
//                                                                                            //     // 1071
// packages/iron:router/lib/helpers.js                                                        //     // 1072
//                                                                                            //     // 1073
////////////////////////////////////////////////////////////////////////////////////////////////     // 1074
                                                                                              //     // 1075
/*****************************************************************************/               // 1   // 1076
/* Imports */                                                                                 // 2   // 1077
/*****************************************************************************/               // 3   // 1078
var warn = Iron.utils.warn;                                                                   // 4   // 1079
var DynamicTemplate = Iron.DynamicTemplate;                                                   // 5   // 1080
var debug = Iron.utils.debug('iron:router <helpers>');                                        // 6   // 1081
                                                                                              // 7   // 1082
/*****************************************************************************/               // 8   // 1083
/* UI Helpers */                                                                              // 9   // 1084
/*****************************************************************************/               // 10  // 1085
                                                                                              // 11  // 1086
/**                                                                                           // 12  // 1087
 * Render the Router to a specific location on the page instead of the                        // 13  // 1088
 * document.body.                                                                             // 14  // 1089
 */                                                                                           // 15  // 1090
UI.registerHelper('Router', new Blaze.Template('Router', function () {                        // 16  // 1091
  return Router.createView();                                                                 // 17  // 1092
}));                                                                                          // 18  // 1093
                                                                                              // 19  // 1094
/**                                                                                           // 20  // 1095
 * Returns a relative path given a route name, data context and optional query                // 21  // 1096
 * and hash parameters.                                                                       // 22  // 1097
 */                                                                                           // 23  // 1098
UI.registerHelper('pathFor', function (options) {                                             // 24  // 1099
  var routeName;                                                                              // 25  // 1100
                                                                                              // 26  // 1101
  if (arguments.length > 1) {                                                                 // 27  // 1102
    routeName = arguments[0];                                                                 // 28  // 1103
    options = arguments[1] || {};                                                             // 29  // 1104
  }                                                                                           // 30  // 1105
                                                                                              // 31  // 1106
  var opts = options && options.hash;                                                         // 32  // 1107
                                                                                              // 33  // 1108
  opts = opts || {};                                                                          // 34  // 1109
                                                                                              // 35  // 1110
  var path = '';                                                                              // 36  // 1111
  var query = opts.query;                                                                     // 37  // 1112
  var hash = opts.hash;                                                                       // 38  // 1113
  var routeName = routeName || opts.route;                                                    // 39  // 1114
  var data = _.extend({}, opts.data || this);                                                 // 40  // 1115
                                                                                              // 41  // 1116
  var route = Router.routes[routeName];                                                       // 42  // 1117
  warn(route, "pathFor couldn't find a route named " + JSON.stringify(routeName));            // 43  // 1118
                                                                                              // 44  // 1119
  if (route) {                                                                                // 45  // 1120
    _.each(route.handler.compiledUrl.keys, function (keyConfig) {                             // 46  // 1121
      var key = keyConfig.name;                                                               // 47  // 1122
      if (_.has(opts, key)) {                                                                 // 48  // 1123
        data[key] = EJSON.clone(opts[key]);                                                   // 49  // 1124
                                                                                              // 50  // 1125
        // so the option doesn't end up on the element as an attribute                        // 51  // 1126
        delete opts[key];                                                                     // 52  // 1127
      }                                                                                       // 53  // 1128
    });                                                                                       // 54  // 1129
                                                                                              // 55  // 1130
    path = route.path(data, {query: query, hash: hash});                                      // 56  // 1131
  }                                                                                           // 57  // 1132
                                                                                              // 58  // 1133
  return path;                                                                                // 59  // 1134
});                                                                                           // 60  // 1135
                                                                                              // 61  // 1136
/**                                                                                           // 62  // 1137
 * Returns a relative path given a route name, data context and optional query                // 63  // 1138
 * and hash parameters.                                                                       // 64  // 1139
 */                                                                                           // 65  // 1140
UI.registerHelper('urlFor', function (options) {                                              // 66  // 1141
  var routeName;                                                                              // 67  // 1142
                                                                                              // 68  // 1143
  if (arguments.length > 1) {                                                                 // 69  // 1144
    routeName = arguments[0];                                                                 // 70  // 1145
    options = arguments[1] || {};                                                             // 71  // 1146
  }                                                                                           // 72  // 1147
                                                                                              // 73  // 1148
  var opts = options && options.hash;                                                         // 74  // 1149
                                                                                              // 75  // 1150
  opts = opts || {};                                                                          // 76  // 1151
  var url = '';                                                                               // 77  // 1152
  var query = opts.query;                                                                     // 78  // 1153
  var hash = opts.hash;                                                                       // 79  // 1154
  var routeName = routeName || opts.route;                                                    // 80  // 1155
  var data = _.extend({}, opts.data || this);                                                 // 81  // 1156
                                                                                              // 82  // 1157
  var route = Router.routes[routeName];                                                       // 83  // 1158
  warn(route, "urlFor couldn't find a route named " + JSON.stringify(routeName));             // 84  // 1159
                                                                                              // 85  // 1160
  if (route) {                                                                                // 86  // 1161
    _.each(route.handler.compiledUrl.keys, function (keyConfig) {                             // 87  // 1162
      var key = keyConfig.name;                                                               // 88  // 1163
      if (_.has(opts, key)) {                                                                 // 89  // 1164
        data[key] = EJSON.clone(opts[key]);                                                   // 90  // 1165
                                                                                              // 91  // 1166
        // so the option doesn't end up on the element as an attribute                        // 92  // 1167
        delete opts[key];                                                                     // 93  // 1168
      }                                                                                       // 94  // 1169
    });                                                                                       // 95  // 1170
                                                                                              // 96  // 1171
    url = route.url(data, {query: query, hash: hash});                                        // 97  // 1172
  }                                                                                           // 98  // 1173
                                                                                              // 99  // 1174
  return url;                                                                                 // 100
});                                                                                           // 101
                                                                                              // 102
/**                                                                                           // 103
 * Create a link with optional content block.                                                 // 104
 *                                                                                            // 105
 * Example:                                                                                   // 106
 *   {{#linkTo route="one" query="query" hash="hash" class="my-cls"}}                         // 107
 *    <div>My Custom Link Content</div>                                                       // 108
 *   {{/linkTo}}                                                                              // 109
 */                                                                                           // 110
UI.registerHelper('linkTo', new Blaze.Template('linkTo', function () {                        // 111
  var self = this;                                                                            // 112
  var opts = DynamicTemplate.getInclusionArguments(this);                                     // 113
                                                                                              // 114
  if (typeof opts !== 'object')                                                               // 115
    throw new Error("linkTo options must be key value pairs such as {{#linkTo route='my.route.name'}}. You passed: " + JSON.stringify(opts));
                                                                                              // 117
  opts = opts || {};                                                                          // 118
  var path = '';                                                                              // 119
  var query = opts.query;                                                                     // 120
  var hash = opts.hash;                                                                       // 121
  var routeName = opts.route;                                                                 // 122
  var data = _.extend({}, opts.data || DynamicTemplate.getParentDataContext(this));           // 123
  var route = Router.routes[routeName];                                                       // 124
  var paramKeys;                                                                              // 125
                                                                                              // 126
  warn(route, "linkTo couldn't find a route named " + JSON.stringify(routeName));             // 127
                                                                                              // 128
  if (route) {                                                                                // 129
    _.each(route.handler.compiledUrl.keys, function (keyConfig) {                             // 130
      var key = keyConfig.name;                                                               // 131
      if (_.has(opts, key)) {                                                                 // 132
        data[key] = EJSON.clone(opts[key]);                                                   // 133
                                                                                              // 134
        // so the option doesn't end up on the element as an attribute                        // 135
        delete opts[key];                                                                     // 136
      }                                                                                       // 137
    });                                                                                       // 138
                                                                                              // 139
    path = route.path(data, {query: query, hash: hash});                                      // 140
  }                                                                                           // 141
                                                                                              // 142
  // anything that isn't one of our keywords we'll assume is an attributed                    // 143
  // intended for the <a> tag                                                                 // 144
  var attrs = _.omit(opts, 'route', 'query', 'hash', 'data');                                 // 145
  attrs.href = path;                                                                          // 146
                                                                                              // 147
  return Blaze.With(function () {                                                             // 148
    return DynamicTemplate.getParentDataContext(self);                                        // 149
  }, function () {                                                                            // 150
    return HTML.A(attrs, self.templateContentBlock);                                          // 151
  });                                                                                         // 152
}));                                                                                          // 153
                                                                                              // 154
////////////////////////////////////////////////////////////////////////////////////////////////     // 1230
                                                                                                     // 1231
}).call(this);                                                                                       // 1232
                                                                                                     // 1233
                                                                                                     // 1234
                                                                                                     // 1235
                                                                                                     // 1236
                                                                                                     // 1237
                                                                                                     // 1238
(function () {                                                                                       // 1239
                                                                                                     // 1240
////////////////////////////////////////////////////////////////////////////////////////////////     // 1241
//                                                                                            //     // 1242
// packages/iron:router/lib/body_parser_server.js                                             //     // 1243
//                                                                                            //     // 1244
////////////////////////////////////////////////////////////////////////////////////////////////     // 1245
                                                                                              //     // 1246
Router.bodyParser = Npm.require('body-parser');                                               // 1   // 1247
                                                                                              // 2   // 1248
////////////////////////////////////////////////////////////////////////////////////////////////     // 1249
                                                                                                     // 1250
}).call(this);                                                                                       // 1251
                                                                                                     // 1252
                                                                                                     // 1253
                                                                                                     // 1254
                                                                                                     // 1255
                                                                                                     // 1256
                                                                                                     // 1257
(function () {                                                                                       // 1258
                                                                                                     // 1259
////////////////////////////////////////////////////////////////////////////////////////////////     // 1260
//                                                                                            //     // 1261
// packages/iron:router/lib/router_server.js                                                  //     // 1262
//                                                                                            //     // 1263
////////////////////////////////////////////////////////////////////////////////////////////////     // 1264
                                                                                              //     // 1265
var assert = Iron.utils.assert;                                                               // 1   // 1266
                                                                                              // 2   // 1267
var env = process.env.NODE_ENV || 'development';                                              // 3   // 1268
                                                                                              // 4   // 1269
/**                                                                                           // 5   // 1270
 * Server specific initialization.                                                            // 6   // 1271
 */                                                                                           // 7   // 1272
Router.prototype.init = function (options) {};                                                // 8   // 1273
                                                                                              // 9   // 1274
/**                                                                                           // 10  // 1275
 * Give people a chance to customize the body parser                                          // 11  // 1276
 * behavior.                                                                                  // 12  // 1277
 */                                                                                           // 13  // 1278
Router.prototype.configureBodyParsers = function () {                                         // 14  // 1279
  Router.onBeforeAction(Iron.Router.bodyParser.json());                                       // 15  // 1280
  Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({extended: false}));                // 16  // 1281
};                                                                                            // 17  // 1282
                                                                                              // 18  // 1283
/**                                                                                           // 19  // 1284
 * Add the router to the server connect handlers.                                             // 20  // 1285
 */                                                                                           // 21  // 1286
Router.prototype.start = function () {                                                        // 22  // 1287
  WebApp.connectHandlers.use(this);                                                           // 23  // 1288
  this.configureBodyParsers();                                                                // 24  // 1289
};                                                                                            // 25  // 1290
                                                                                              // 26  // 1291
/**                                                                                           // 27  // 1292
 * Create a new controller and dispatch into the stack.                                       // 28  // 1293
 */                                                                                           // 29  // 1294
Router.prototype.dispatch = function (url, context, done) {                                   // 30  // 1295
  var self = this;                                                                            // 31  // 1296
                                                                                              // 32  // 1297
  assert(typeof url === 'string', "expected url string in router dispatch");                  // 33  // 1298
  assert(typeof context === 'object', "expected context object in router dispatch");          // 34  // 1299
                                                                                              // 35  // 1300
  // assumes there is only one router                                                         // 36  // 1301
  // XXX need to initialize controller either from the context itself or if the               // 37  // 1302
  // context already has a controller on it, just use that one.                               // 38  // 1303
  var controller = this.createController(url, context);                                       // 39  // 1304
                                                                                              // 40  // 1305
  controller.dispatch(this._stack, url, function (err) {                                      // 41  // 1306
    var res = this.response;                                                                  // 42  // 1307
    var req = this.request;                                                                   // 43  // 1308
    var msg;                                                                                  // 44  // 1309
                                                                                              // 45  // 1310
    if (err) {                                                                                // 46  // 1311
      if (res.statusCode < 400)                                                               // 47  // 1312
        res.statusCode = 500;                                                                 // 48  // 1313
                                                                                              // 49  // 1314
      if (err.status)                                                                         // 50  // 1315
        res.statusCode = err.status;                                                          // 51  // 1316
                                                                                              // 52  // 1317
      if (env === 'development')                                                              // 53  // 1318
        msg = (err.stack || err.toString()) + '\n';                                           // 54  // 1319
      else                                                                                    // 55  // 1320
        //XXX get this from standard dict of error messages?                                  // 56  // 1321
        msg = 'Server error.';                                                                // 57  // 1322
                                                                                              // 58  // 1323
      console.error(err.stack || err.toString());                                             // 59  // 1324
                                                                                              // 60  // 1325
      if (res.headersSent)                                                                    // 61  // 1326
        return req.socket.destroy();                                                          // 62  // 1327
                                                                                              // 63  // 1328
      res.setHeader('Content-Type', 'text/html');                                             // 64  // 1329
      res.setHeader('Content-Length', Buffer.byteLength(msg));                                // 65  // 1330
      if (req.method === 'HEAD')                                                              // 66  // 1331
        return res.end();                                                                     // 67  // 1332
      res.end(msg);                                                                           // 68  // 1333
      return;                                                                                 // 69  // 1334
    }                                                                                         // 70  // 1335
                                                                                              // 71  // 1336
    // if there are no client or server handlers for this dispatch                            // 72  // 1337
    // then send a 404.                                                                       // 73  // 1338
    // XXX we need a solution here for 404s on bad routes.                                    // 74  // 1339
    //     one solution might be to provide a custom 404 page in the public                   // 75  // 1340
    //     folder. But we need a proper way to handle 404s for search engines.                // 76  // 1341
    // XXX might be a PR to Meteor to use an existing status code if it's set                 // 77  // 1342
    if (!controller.isHandled() && !controller.willBeHandledOnClient()) {                     // 78  // 1343
      return done();                                                                          // 79  // 1344
      /*                                                                                      // 80  // 1345
      res.statusCode = 404;                                                                   // 81  // 1346
      res.setHeader('Content-Type', 'text/html');                                             // 82  // 1347
      msg = req.method + ' ' + req.originalUrl + ' not found.';                               // 83  // 1348
      console.error(msg);                                                                     // 84  // 1349
      if (req.method == 'HEAD')                                                               // 85  // 1350
        return res.end();                                                                     // 86  // 1351
      res.end(msg + '\n');                                                                    // 87  // 1352
      return;                                                                                 // 88  // 1353
      */                                                                                      // 89  // 1354
    }                                                                                         // 90  // 1355
                                                                                              // 91  // 1356
    // if for some reason there was a server handler but no client handler                    // 92  // 1357
    // and the server handler called next() we might end up here. We                          // 93  // 1358
    // want to make sure to end the response so it doesn't hang.                              // 94  // 1359
    if (controller.isHandled() && !controller.willBeHandledOnClient()) {                      // 95  // 1360
      res.setHeader('Content-Type', 'text/html');                                             // 96  // 1361
      if (req.method === 'HEAD')                                                              // 97  // 1362
        res.end();                                                                            // 98  // 1363
      res.end("<p>It looks like you don't have any client routes defined, but you had at least one server handler. You probably want to define some client side routes!</p>\n");
    }                                                                                         // 100
                                                                                              // 101
    // we'll have Meteor load the normal application so long as                               // 102
    // we have at least one client route/handler and the done() iterator                      // 103
    // function has been passed to us, presumably from Connect.                               // 104
    if (controller.willBeHandledOnClient() && done)                                           // 105
      return done(err);                                                                       // 106
  });                                                                                         // 107
};                                                                                            // 108
                                                                                              // 109
////////////////////////////////////////////////////////////////////////////////////////////////     // 1375
                                                                                                     // 1376
}).call(this);                                                                                       // 1377
                                                                                                     // 1378
                                                                                                     // 1379
                                                                                                     // 1380
                                                                                                     // 1381
                                                                                                     // 1382
                                                                                                     // 1383
(function () {                                                                                       // 1384
                                                                                                     // 1385
////////////////////////////////////////////////////////////////////////////////////////////////     // 1386
//                                                                                            //     // 1387
// packages/iron:router/lib/plugins.js                                                        //     // 1388
//                                                                                            //     // 1389
////////////////////////////////////////////////////////////////////////////////////////////////     // 1390
                                                                                              //     // 1391
/**                                                                                           // 1   // 1392
 * Simple plugin wrapper around the loading hook.                                             // 2   // 1393
 */                                                                                           // 3   // 1394
Router.plugins.loading = function (router, options) {                                         // 4   // 1395
  router.onBeforeAction('loading', options);                                                  // 5   // 1396
};                                                                                            // 6   // 1397
                                                                                              // 7   // 1398
/**                                                                                           // 8   // 1399
 * Simple plugin wrapper around the dataNotFound hook.                                        // 9   // 1400
 */                                                                                           // 10  // 1401
Router.plugins.dataNotFound = function (router, options) {                                    // 11  // 1402
  router.onBeforeAction('dataNotFound', options);                                             // 12  // 1403
};                                                                                            // 13  // 1404
                                                                                              // 14  // 1405
////////////////////////////////////////////////////////////////////////////////////////////////     // 1406
                                                                                                     // 1407
}).call(this);                                                                                       // 1408
                                                                                                     // 1409
                                                                                                     // 1410
                                                                                                     // 1411
                                                                                                     // 1412
                                                                                                     // 1413
                                                                                                     // 1414
(function () {                                                                                       // 1415
                                                                                                     // 1416
////////////////////////////////////////////////////////////////////////////////////////////////     // 1417
//                                                                                            //     // 1418
// packages/iron:router/lib/global_router.js                                                  //     // 1419
//                                                                                            //     // 1420
////////////////////////////////////////////////////////////////////////////////////////////////     // 1421
                                                                                              //     // 1422
Router = new Iron.Router;                                                                     // 1   // 1423
                                                                                              // 2   // 1424
////////////////////////////////////////////////////////////////////////////////////////////////     // 1425
                                                                                                     // 1426
}).call(this);                                                                                       // 1427
                                                                                                     // 1428
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['iron:router'] = {
  Router: Router,
  RouteController: RouteController
};

})();

//# sourceMappingURL=iron_router.js.map
