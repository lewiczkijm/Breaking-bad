import {useEffect, useMemo, useState} from "react";
import {EpisodeItem} from "./EpisodeItem";
import {generateArray} from "../helpers";

const ITEMS_PER_PAGE = 10

const getEpisodes = async ():Promise<Array<any> | undefined> =>{
    let res = await fetch(`/episodes`).catch(()=>undefined)
    if(!res || !res.ok) return
    return await res.json()
}

export const Main = ()=>{
    const [episodes,setEpisodes] = useState<Array<any>>(()=>generateArray({},10))
    const [page, setPage] = useState(1)
    const [season, setSeason] = useState<string | undefined>(undefined)

    const getAllEpisodes = async ()=>{
        const episodes = await getEpisodes();
        if(!episodes) return // error processing
        setEpisodes(episodes)
    }

    useEffect(()=>{
        getAllEpisodes()
    },[])

    const presentEpisodes = useMemo(
        ()=>episodes.filter(episode=>season?episode.season === season:true)
            .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
        ,[episodes,page,season])

    return <div style={{marginLeft:10,marginRight:10}}>
        <div className={"block"}></div>
        {presentEpisodes.map(episode=><EpisodeItem id={episode.episode_id} title={episode.title} airDate={episode.air_date} key={episode.episode_id}/>)}
    </div>
}