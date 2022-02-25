import React from "react";
import renderer from "react-test-renderer";
import Select, { SelectMenu, SelectToggle } from "./select";

renderer.create(
    <Select>
        <SelectToggle>Choose an item</SelectToggle>
        <SelectMenu>Menu</SelectMenu>
    </Select>
).toJSON();
