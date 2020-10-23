"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// buildReducer :: (State, {Function}) -> (State, Action) -> State
function buildReducer(initialState, handlers) {
    return function (state, action) {
        if (state === void 0) { state = initialState; }
        var handler = handlers[action.type];
        return handler ? handler(state, action) : state;
    };
}
exports.default = buildReducer;
//# sourceMappingURL=buildReducer.js.map