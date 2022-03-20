import {useEffect, useMemo, useState} from "react";
import {EpisodeItem} from "./EpisodeItem";
import {emptyEpisode, ErrorMessage, generateArray, ITEMS_PER_PAGE} from "../helpers";
import {Pages} from "./Pages";
import {SelectSeason} from "./SelectSeason";
import {episodeType, getEpisodes} from "../api";

export const Main = ()=>{
    const [episodes,setEpisodes] = useState<Array<episodeType> | undefined>(()=>generateArray(emptyEpisode,ITEMS_PER_PAGE))
    const [page, setPage] = useState(1)
    const [season, setSeason] = useState<string>("")

    // fetch data
    const getAllEpisodes = async ()=>{
        const episodes = await getEpisodes();
        setEpisodes(episodes)
    }

    useEffect(()=>{
        getAllEpisodes()
    },[])

    // filter by seasons
    const filteredEpisodes = useMemo(()=>episodes?.filter(episode=>season?episode.season === season:true)
        ,[season,episodes])

    // get page elements
    const presentEpisodes = useMemo(
        ()=>filteredEpisodes?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
        ,[filteredEpisodes,page])

    // get list of seasons
    const seasons = useMemo(()=>{
        const seasons:any ={}
        episodes?.forEach(episode=>seasons[Number(episode.season)] = null)
        return Object.keys(seasons)
    },[episodes])

    return <div style={{marginLeft:10,marginRight:10}}>
        <SelectSeason values={seasons} value={season} onChange={setSeason} />

        {presentEpisodes?.map((episode, i)=><EpisodeItem
            id={episode.episode_id}     title={episode.title}
            airDate={episode.air_date}  key={episode.episode_id || i + 100 }
        />)}
        {
            !episodes && <ErrorMessage><>
                <p>It was some problem with network or our API. Please check connection end try again</p>
                <p>If You sea it again, contact the address <a href="mailto:example@example.com">example@example.com</a></p>
            </></ErrorMessage>
        }
        <div style={{paddingBottom:8}}>
            {
                filteredEpisodes && filteredEpisodes.length > ITEMS_PER_PAGE &&
                <Pages all={Math.ceil(filteredEpisodes.length / ITEMS_PER_PAGE)} active={page} onChange={setPage}/>
            }
        </div>
    </div>
}