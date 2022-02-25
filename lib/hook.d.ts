import { ReactElement, ReactNode } from "react";
declare type OptionType = {
    mergeClassNames?: boolean;
    mergeDatasets?: boolean;
    mergeStyles?: boolean;
    skipListeners?: boolean;
};
export declare const findPartials: (children: ReactNode[], type?: string | Symbol | undefined) => ReactElement[];
export declare const isPartial: (child?: ReactNode, type?: string | Symbol | undefined) => boolean;
export default function usePartial(children: ReactNode | ReactNode[], type: string | Symbol, opts: OptionType): [ReactNode[], ReactNode[] | undefined];
export declare function usePartials(children: ReactNode | ReactNode[], types?: string[]): [ReactNode[], {
    [key: string]: ReactNode[] | undefined;
}];
export {};
