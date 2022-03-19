import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {MemoryRouter, Outlet, Route, Routes} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {EpisodeItem} from "./EpisodeItem";
import React from "react";

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

test("output skeleton",()=>{
    act(()=>{
        render(<EpisodeItem/>,container)
    })
    expect(container.textContent).toContain("Fake hidden name")
    expect(container.textContent).toContain("without date")
})

test("output correctly data",()=>{
    act(()=>{
        render(<MemoryRouter><EpisodeItem title={"Pilot"} airDate={"01-20-2008"} id={1}/></MemoryRouter>,container)
    })
    expect(container.textContent).toContain("Pilot")
    expect(container.textContent).toContain("01-20-2008")
})

test("check link",()=>{
    act(()=>{
        render(<MemoryRouter>
            <EpisodeItem title={"Pilot"} airDate={"01-20-2008"} id={1}/>
            <Routes>
                <Route path={"/"} element={<>Main</>}/>
                <Route path={"/episode/1"} element={<>Pilot page</>}/>
            </Routes>
            <Outlet/>
        </MemoryRouter>,container)
    })
    userEvent.click(document.body.querySelector("a"))
    expect(container.textContent).toContain("Pilot page")
})