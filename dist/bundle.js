'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _buildReducer;

var _actions = require('./actions');

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});

var _selectors = require('./selectors');

Object.keys(_selectors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _selectors[key];
    }
  });
});

var _dotPropImmutable = require('dot-prop-immutable');

var _dotPropImmutable2 = _interopRequireDefault(_dotPropImmutable);

var _buildReducer2 = require('./buildReducer');

var _actionTypes = require('./actionTypes');

var ActionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducer = (0, _buildReducer2.buildReducer)({}, (_buildReducer = {}, _defineProperty(_buildReducer, ActionTypes.HSET, function (state, action) {
  var _action$payload = action.payload,
      value = _action$payload.value,
      path = _action$payload.path;

  return _dotPropImmutable2.default.set(state, path, value);
}), _defineProperty(_buildReducer, ActionTypes.HDEL, function (state, action) {
  var path = action.payload.path;

  return _dotPropImmutable2.default.delete(state, path);
}), _defineProperty(_buildReducer, ActionTypes.HMSET, function (state, action) {
  var _action$payload2 = action.payload,
      value = _action$payload2.value,
      path = _action$payload2.path;

  return _dotPropImmutable2.default.merge(state, path, value);
}), _defineProperty(_buildReducer, ActionTypes.HINCRBY, function (state, action) {
  var _action$payload3 = action.payload,
      value = _action$payload3.value,
      path = _action$payload3.path;

  if (_dotPropImmutable2.default.get(state, path)) {
    return _dotPropImmutable2.default.set(state, path, function (v) {
      return (Number(v) || 0) + value;
    });
  } else {
    return _dotPropImmutable2.default.set(state, path, value);
  }
}), _defineProperty(_buildReducer, ActionTypes.HTOGGLE, function (state, action) {
  var path = action.payload.path;

  var currentValue = Boolean(_dotPropImmutable2.default.get(state, path));
  return _dotPropImmutable2.default.set(state, path, !currentValue);
}), _buildReducer));

exports.default = reducer;
