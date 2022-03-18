import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {Header} from "./Header";
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";

let container = null; let arrowBack;
beforeEach(()=>{
    container = document.createElement("div");
    document.body.appendChild(container);
    act(()=>{
        render(<MemoryRouter>
                <Header/>
            </MemoryRouter>
            ,container)
    })

})

afterEach(()=>{
    unmountComponentAtNode(container);
    container.remove();
    container = null;

})

test("text contents",()=>{
    expect(container.textContent).toContain("Series")
    expect(container.textContent).toContain("About")
})

test("go to about end to main page",()=>{
    arrowBack = document.body.querySelector("svg.icon")
    // find link (icon arrow back)
    expect(arrowBack).toBeNull()
    const aboutLink = document.body.querySelector("a[href='/about']")
    userEvent.click(aboutLink)  // go to /about
    arrowBack = document.body.querySelector("svg.icon")
    expect(arrowBack).not.toBeNull() // is arrow back
    userEvent.click(arrowBack.parentNode) // go to /
    arrowBack = document.body.querySelector("svg.icon")
    expect(arrowBack).toBeNull() // is not arrow back
})
