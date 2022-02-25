import { ReactElement, ReactNode } from "react";
import { Children, cloneElement } from "react";
import Partial from "./component";

declare function isReactElement(element: any): element is ReactElement;

type OptionType = {
    mergeClassNames?: boolean,
    mergeDatasets?: boolean,
    mergeStyles?: boolean
    skipListeners?: boolean,
};

export const findPartials = (children: ReactNode[], type?: string|Symbol): ReactElement[] => {
    const results = [];

    for (let idx = 0; idx < children.length; idx++) {
        const child = children[idx];
        if (!isReactElement(child)) continue;
        if (isPartial(child, type)) results.push(child);
        results.push(...findPartials(child.props.children));
    }
    return results;
};

const getChildren = (children: ReactNode[], type: string|Symbol): ReactNode[] => {
    return (function closure(children): ReactNode[] {
        return Children.toArray(children).filter((child) => {
            if (isPartial(child, type)) return false;
            if (!isReactElement(child)) return child;
            return cloneElement(child, child.props, closure(child.props.children));
        })
    })(children);
};

export const isPartial = (child?: ReactNode, type?: string|Symbol) => {
    if (!isReactElement(child)) return false;
    if (!(child.type instanceof Partial)) return false;
    if (!type) return true;
    if (!child.props) return false;
    return child.props.type === type;
};

export default function usePartial(children: ReactNode|ReactNode[], type: string|Symbol, opts: OptionType): [ReactNode[], ReactNode[]|undefined] {
    if (!Array.isArray(children)) children = Children.toArray(children);
    if (!('length' in children)) return [[], undefined];
    const partials = findPartials(children, type);

    return [
        getChildren(children, type),
        partials.length ? partials.map((partial) => partial.props.children) : undefined,
    ];
}

export function usePartials(children: ReactNode|ReactNode[], types: string[] = []): [ReactNode[], { [key: string]: ReactNode[]|undefined }] {
    if (!Array.isArray(children)) children = Children.toArray(children);
    if (!('length' in children)) return [[], {}];
    const nodes = findPartials(children);
    if (!types.length) {
        types = nodes.map((partial) => partial.props.type).filter((type, idx, types) => types.indexOf(type) === idx);
    }

    return [
        types.reduce((accu, type) => getChildren(accu, type), children),
        types.reduce((accu, name) => {
            const partials = nodes.filter((partial) => partial.props.type === name);
            return { ...accu, [name]: partials.length ? partials : undefined };
        }, {}),
    ];
}
