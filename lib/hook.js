"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePartials = exports.isPartial = exports.findPartials = void 0;
const react_1 = require("react");
const component_1 = __importDefault(require("./component"));
const findPartials = (children, type) => {
    const results = [];
    for (let idx = 0; idx < children.length; idx++) {
        const child = children[idx];
        if (!isReactElement(child))
            continue;
        if ((0, exports.isPartial)(child, type))
            results.push(child);
        results.push(...(0, exports.findPartials)(child.props.children));
    }
    return results;
};
exports.findPartials = findPartials;
const getChildren = (children, type) => {
    return (function closure(children) {
        return react_1.Children.toArray(children).filter((child) => {
            if ((0, exports.isPartial)(child, type))
                return false;
            if (!isReactElement(child))
                return child;
            return (0, react_1.cloneElement)(child, child.props, closure(child.props.children));
        });
    })(children);
};
const isPartial = (child, type) => {
    if (!isReactElement(child))
        return false;
    if (!(child.type instanceof component_1.default))
        return false;
    if (!type)
        return true;
    if (!child.props)
        return false;
    return child.props.type === type;
};
exports.isPartial = isPartial;
function usePartial(children, type, opts) {
    if (!Array.isArray(children))
        children = react_1.Children.toArray(children);
    if (!('length' in children))
        return [[], null];
    const partials = (0, exports.findPartials)(children, type);
    return [
        getChildren(children, type),
        partials.length ? partials.map((partial) => partial.props.children) : null,
    ];
}
exports.default = usePartial;
function usePartials(children, types = []) {
    if (!Array.isArray(children))
        children = react_1.Children.toArray(children);
    if (!('length' in children))
        return [[], types.reduce((accu, key) => ({ ...accu, [key]: null }), {})];
    const nodes = (0, exports.findPartials)(children);
    if (!types.length) {
        types = nodes.map((partial) => partial.props.type).filter((type, idx, types) => types.indexOf(type) === idx);
    }
    return [
        types.reduce((accu, type) => getChildren(accu, type), children),
        types.reduce((accu, name) => {
            const partials = nodes.filter((partial) => partial.props.type === name);
            return { ...accu, [name]: partials.length ? partials : null };
        }, {}),
    ];
}
exports.usePartials = usePartials;
//# sourceMappingURL=hook.js.map