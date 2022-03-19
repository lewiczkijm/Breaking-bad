import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {EpisodeItem} from "./EpisodeItem";
import React from "react";
import {SelectSeason} from "./SelectSeason";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

let container = null; let arrowBack;
beforeEach(()=>{
    container = document.createElement("div");
    document.body.appendChild(container);
})

afterEach(()=>{
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

test("check output values",()=>{
    act(()=>{
        render(<SelectSeason value={""} onChange={()=>{}} values={[1,2,3]}/>,container)
    })
    expect(screen.getByText("all"))
    expect(screen.getByText("1"))
    expect(screen.queryByText("4")).toBeNull()
})

test("select 1",()=> {
    let value;
    act(() => {
        render(<SelectSeason value={""} onChange={(val) => {value = val}}
                             values={[1, 2, 3]}/>, container)
    })
    userEvent.selectOptions(document.body.querySelector("select"),["1"])
    expect(value).toBe("1")
})

test("select all",()=> {
    let value
    act(() => {
        render(<SelectSeason value={""} onChange={(val) => {value = val}}
                             values={[1, 2, 3]}/>, container)
    })
    userEvent.selectOptions(document.body.querySelector("select"),["all"])
    expect(value).toBe("")

})
