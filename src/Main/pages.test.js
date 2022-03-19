import {unmountComponentAtNode} from "react-dom";
import {render,screen} from "@testing-library/react";
import {Pages} from "./Pages";
import {act} from "react-dom/test-utils";
import {useState} from "react";
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

test("output 10 pages",()=>{
    act(()=>{
        render(<Pages all={10} active={5} onChange={()=>{}}/>,container)
    })
    expect(screen.getByText("Previous"))
    expect(screen.getByText("Next page"))
    expect(document.body.querySelector("ul.pagination-list").children.length).toBe(10)
    expect(screen.getByText("5")).toHaveClass("is-current")
    expect(screen.getByText("5")).toHaveAttribute("aria-label","Page 5")
})

test("first page",()=>{
    act(()=>{
        render(<Pages all={10} active={1} onChange={()=>{}}/>,container)
    })
    expect(screen.getByText("1")).toHaveClass("is-current")
    expect(screen.getByText("Previous")).toHaveAttribute("disabled")
    expect(screen.getByText("Next page")).not.toHaveAttribute("disabled")
})

test("last page",()=>{
    act(()=>{
        render(<Pages all={10} active={10} onChange={()=>{}}/>,container)
    })
    expect(screen.getByText("10")).toHaveClass("is-current")
    expect(screen.getByText("Previous"))
    expect(screen.getByText("Next page"))
    expect(screen.getByText("Previous")).not.toHaveAttribute("disabled")
    expect(screen.getByText("Next page")).toHaveAttribute("disabled")

})

test("select page 4",()=>{
    let value = 0
    act(()=>{
        render(<Pages all={10} active={1} onChange={(val)=>{value = val}}/>,container)
    })
    userEvent.click(screen.getByText("4"))
    expect(value).toBe(4)
})

test("select previous",()=>{
    let value = 0
    act(()=>{
        render(<Pages all={10} active={2} onChange={(val)=>{value = val}}/>,container)
    })
    userEvent.click(screen.getByText("Previous"))
    expect(value).toBe(1)
})

test("select last",()=>{
    let value = 0
    act(()=>{
        render(<Pages all={10} active={1} onChange={(val)=>{value = val}}/>,container)
    })
    userEvent.click(screen.getByText("Next page"))
    expect(value).toBe(2)
})
