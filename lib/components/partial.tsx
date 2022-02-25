import { ReactNode, useContext, useEffect, useRef } from "react";
import PartialContext from "../context";

export type PartialPropTypes = {
    type: string|symbol,
    children?: ReactNode|ReactNode[],
};

export default function Partial({ type, children }: PartialPropTypes) {
    const ref = useRef<PartialPropTypes>({ type, children });
    const context = useContext(PartialContext);
    context.init(ref);

    useEffect(() => {
        context.add(ref);
        return () => {
            context.remove(ref);
        };
    }, [type, children]);

    return null;
}
