import { Children, cloneElement } from "react";
import Partial from "./component";
export const findPartials = (children, type) => {
    const results = [];
    for (let idx = 0; idx < children.length; idx++) {
        const child = children[idx];
        if (!isReactElement(child))
            continue;
        if (isPartial(child, type))
            results.push(child);
        results.push(...findPartials(child.props.children));
    }
    return results;
};
const getChildren = (children, type) => {
    return (function closure(children) {
        return Children.toArray(children).filter((child) => {
            if (isPartial(child, type))
                return false;
            if (!isReactElement(child))
                return child;
            return cloneElement(child, child.props, closure(child.props.children));
        });
    })(children);
};
export const isPartial = (child, type) => {
    if (!isReactElement(child))
        return false;
    if (!(child.type instanceof Partial))
        return false;
    if (!type)
        return true;
    if (!child.props)
        return false;
    return child.props.type === type;
};
export default function usePartial(children, type, opts) {
    if (!Array.isArray(children))
        children = Children.toArray(children);
    if (!('length' in children))
        return [[], null];
    const partials = findPartials(children, type);
    return [
        getChildren(children, type),
        partials.length ? partials.map((partial) => partial.props.children) : null,
    ];
}
export function usePartials(children, types = []) {
    if (!Array.isArray(children))
        children = Children.toArray(children);
    if (!('length' in children))
        return [[], types.reduce((accu, key) => ({ ...accu, [key]: null }), {})];
    const nodes = findPartials(children);
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
//# sourceMappingURL=hook.js.map