import React, { ReactNode, RefObject, useCallback, useContext, useMemo, useState } from "react";
import PartialContext, { PartialContextType } from "../context";
import { PartialPropTypes } from "./partial";

export type PartialProviderPropTypes = {
    types: (string|symbol)[],
    children?: ReactNode|ReactNode[]
};

export type K = RefObject<PartialPropTypes>;
export type V = string|symbol;

export default function PartialProvider(props: PartialProviderPropTypes) {
    const [partials, setPartials] = useState<Map<K, V>>(new Map<K, V>());
    const context = useContext(PartialContext);

    const addPartial = useCallback((key: K, value: V): void => {
        setPartials(new Map<K, V>([...partials, [key, value]]));
    }, [partials, setPartials]);

    const removePartial = useCallback((_key: K): void => {
        setPartials(new Map<K, V>([...partials].filter(([key]) => key !== _key)));
    }, [partials, setPartials]);

    const store = useMemo<PartialContextType>(() => ({
        add: (ref) => {
            if (!ref.current) return;
            const { type } = ref.current;
            if (props.types.includes(type)) addPartial(ref, type);
            if (context) context.add(ref);
        },
        init: (ref) => {
            // Just add to map
            store.add(ref)
        },
        remove: (ref) => {
            if (!ref.current) return;
            const { type } = ref.current;
            if (props.types.includes(type)) removePartial(ref);
            if (context) context.remove(ref);
        },
        render: (type) => {
            const partial = [...partials].reduce((accu: ReactNode[], [ref, _type]) => {
                if (type !== _type) return accu;
                if (!ref.current) return accu;
                if (!ref.current.children) return accu;
                return [...accu, ref.current.children];
            }, []);

            if (!partial.length) return null;
            return partial;
        },
    }), [partials, addPartial, removePartial]);

    return <PartialContext.Provider value={store}>
        {props.children}
    </PartialContext.Provider>;
}
