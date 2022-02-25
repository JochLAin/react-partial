import { createContext, ReactNode, RefObject } from "react";
import { PartialPropTypes } from "./components/partial";

export type PartialContextType = {
    add: (partial: RefObject<PartialPropTypes>) => void,
    init: (partial: RefObject<PartialPropTypes>) => void,
    remove: (partial: RefObject<PartialPropTypes>) => void,
    render: (type: string|symbol) => ReactNode|ReactNode[]|null,
};

export default createContext<PartialContextType>({
    add: () => {},
    init: () => {},
    remove: () => {},
    render: () => null,
});
