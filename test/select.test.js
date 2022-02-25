import React from "react";
import renderer from "react-test-renderer";
import Select, { SelectMenu, SelectToggle } from "./select";

test('Select partial', () => {
    const component = renderer.create(
        <Select>
            <SelectToggle>Choose an item</SelectToggle>
            <SelectMenu>Menu</SelectMenu>
        </Select>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // // manually trigger the callback
    // tree.props.onMouseEnter();
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();

    // // manually trigger the callback
    // tree.props.onMouseLeave();
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
});
