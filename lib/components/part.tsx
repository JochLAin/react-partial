import React, { useContext, useMemo } from "react";
import PartialContext from "../context";

export type PartPropTypes = {
    type: string|symbol,
};

export default function Part({ type }: PartPropTypes) {
    const context = useContext(PartialContext);
    const children = useMemo(() => {
        return context.render(type);
    }, [context, type]);

    if (!children) return null;
    return <>{children}</>;
}
