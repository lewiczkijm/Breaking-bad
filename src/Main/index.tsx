import {useEffect, useState} from "react";
import {EpisodeItem} from "./EpisodeItem";

const getEpisodes = async ():Promise<Array<any> | undefined> =>{
    let res = await fetch(`/episodes`).catch(()=>undefined)
    if(!res || !res.ok) return
    return await res.json()
}


export const Main = ()=>{
    const [episodes,setEpisodes] = useState<Array<any>>([])
    const getAllEpisodes = async ()=>{
        const episodes = await getEpisodes();
        if(!episodes) return // error processing
        setEpisodes(episodes)
    }
    useEffect(()=>{
        getAllEpisodes()
    },[])
    return <div style={{marginLeft:10,marginRight:10}}>
        <div className={"block"}></div>
        <EpisodeItem />
        {episodes.map(episode=><EpisodeItem id={episode.episode_id} title={episode.title} airDate={episode.air_date} key={episode.episode_id}/>)}
    </div>
}