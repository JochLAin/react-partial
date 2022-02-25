import React from "react";
import Partial, { PartialProvider, PartialPart } from "../index";

const SymbolSelectMenu = Symbol('select-menu');
const SymbolSelectToggle = Symbol('select-toggle');
const symbols = [SymbolSelectMenu, SymbolSelectToggle];

export default function Select(props) {
    return <PartialProvider types={symbols}>
        {props.children}
        <PartialPart type={SymbolSelectToggle} />
        <PartialPart type={SymbolSelectMenu} />
    </PartialProvider>;
}

export function SelectToggle() {
    return <Partial type={SymbolSelectToggle}>
        <div className="select-toggle" />
    </Partial>;
}

export function SelectMenu() {
    return <Partial type={SymbolSelectMenu}>
        <div className="select-menu" />
    </Partial>;
}
