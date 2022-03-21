import fetchMock from "jest-fetch-mock"
import {getCharacterByName, getEpisodeById, getEpisodes} from "./api";
import fakeEpisodesList from "./episodes.json"

const fakeCharacter = [
    {
        "char_id":1,
        "name":"Walter White"
        ,"birthday":"09-07-1958",
        "occupation":["High School Chemistry Teacher","Meth King Pin"],
        "img":"https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg",
        "status":"Presumed dead",
        "nickname":"Heisenberg",
        "appearance":[1,2,3,4,5],
        "portrayed":"Bryan Cranston",
        "category":"Breaking Bad",
        "better_call_saul_appearance":[]
    }]



beforeEach(()=>{
    fetchMock.enableMocks()
    fetchMock.dontMock()
})

afterEach(()=>{

})

describe("Api",()=>{
    test("getEpisodes get data",()=>{
        fetchMock.mockResponse(fakeEpisodesList)
        getEpisodes().then(res=>{
            expect(res.length).toBe(102)
        })
        expect(fetchMock.mock.calls.length).toBe(1)
        expect(fetchMock.mock.calls[0][0]).toBe("/episodes")
    })
    test("getEpisodes negative",()=>{
        fetchMock.mockReject()
        getEpisodes().then(res=>{
            expect(res).toBe(undefined)
        })
        expect(fetchMock.mock.calls.length).toBe(1)
        expect(fetchMock.mock.calls[0][0]).toBe("/episodes")
    })
    test("getEpisodeById",()=>{
        fetchMock.mockResponse(fakeEpisodesList)
        getEpisodeById(1).then(res=>{
            expect(res[0].title).toBe("Pilot")
        })
        expect(fetchMock.mock.calls.length).toBe(1)
        expect(fetchMock.mock.calls[0][0]).toBe("/episodes/1")

    })
    test("getEpisodeById negative",()=>{
        fetchMock.mockReject()
        getEpisodeById(1).then(res=>{
            expect(res).toBe(undefined)
        })
        expect(fetchMock.mock.calls.length).toBe(1)
        expect(fetchMock.mock.calls[0][0]).toBe("/episodes/1")

    })
    test("getCharacterByName",()=>{
        fetchMock.mockResponse(fakeCharacter)

        getCharacterByName("Walter+White").then(res=>{
            expect(res[0].name).toBe("Walter White")
        })
        expect(fetchMock.mock.calls[0][0]).toBe("/characters?name=Walter+White")
    })
    test("getCharacterByName negative",()=>{
        fetchMock.mockReject()
        getCharacterByName("Walter+White").then(res=>{
            expect(res).toBe(undefined)
        })
    })
})