import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import React from "react";
import {emptyEpisode, Main} from "./index";
import {ErrorMessage, generateArray} from "../helpers";

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

// Mocks of components
const pagesProps = []
jest.mock("./Pages",()=>({
    Pages: (props) => {
        pagesProps.push(props)
        return <div></div>;
    }
}))

const errorCalls = []
jest.mock("../helpers",()=>({
    ...jest.requireActual("../helpers"),
    ErrorMessage: (props) => {
        errorCalls.push(props)
        return <div></div>;
    }
}))


const episodeProps = []
jest.mock("./EpisodeItem",()=>({
    EpisodeItem: (props) => {
        episodeProps.push(props)
        return <div></div>;
    }
}))

// mock
const mockGetEpisodes = jest.fn([{
    air_date:"date",
    characters:[],
    episode:"",
    episode_id:0,
    season:"",
    series:"",
    title:"title",
}])

jest.mock("../api",()=>({
    getEpisodes: ()=>{
        // console.log(1)
        const mock = jest.fn()
        mock.mockReturnValueOnce([{
                air_date:"date",
                characters:[],
                episode:"",
                episode_id:0,
                season:"",
                series:"",
                title:"title",

        }])
        return mock
    }
}))

describe("Main",()=>{
    test("output skeleton (10 empty )",async ()=> {

        jest.mock("../api",()=>({
            getEpisodes: ()=>{
                // console.log(1)
                const mock = jest.fn()
                mock.mockReturnValueOnce([{
                    air_date:"date",
                    characters:[],
                    episode:"",
                    episode_id:0,
                    season:"",
                    series:"",
                    title:"title",

                }])
                return mock
            }
        }))

        await act(async () => {
            render(<Main/>, container)
        })

        // Component Episodes called 10 times with empty props
        expect(episodeProps[0].title).toBe(""); expect(episodeProps[9].title).toBe("")
        expect(errorCalls.length).toBe(0)
        // correctly output returned value
        expect(episodeProps[10].title).toBe("title")
    })


    test("api error",async ()=> {
        // not work because jest.mock returns same value (not undefined)
        jest.mock("../api",()=>({
            getEpisodes: ()=>{
                return ()=>undefined
            }
        }))


        await act(async () => {
            render(<Main/>, container)
        })

        // Component Episodes called 10 times with empty props
        expect(errorCalls.length).toBe(1)
    })
})
