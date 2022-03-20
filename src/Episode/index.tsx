import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {emptyEpisode, ErrorMessage, Skeleton} from "../helpers";
import {episodeType, getEpisodeById} from "../api";

export const Episode = ()=>{
    const [episode,setEpisode] = useState<episodeType | undefined>(emptyEpisode)

    const {id} = useParams()

    const getEpisode = async ()=>{
        if(!id) { setEpisode(undefined); return }
        const episode = await getEpisodeById(id)
        setEpisode(episode)
    }

    useEffect(()=>{
        getEpisode()
    },[id])

    return <div>
        {episode ?
            <div style={{padding:20}}>

                <h1 className={"title is-1"}><Skeleton value={episode.title}/></h1>

                <p className={"subtitle is-5"} style={{padding:"16px 0px"}}>
                    <Skeleton value={episode.air_date}/>
                </p>

                <h2 className="title is-2">Characters</h2>

                    {episode.characters.map(character=>
                        <div className={"panel-block"}>
                            <Skeleton value={character && <Link to={`/characters/${character}`}>{character}</Link>}/>
                        </div>
                    )}

            </div> :

            <ErrorMessage><>
                <p>Something went wrong. Maybe this episode not exists or api not available.</p>
                <p>If You sea it again, contact the address <a href="mailto:example@example.com">example@example.com</a></p>
            </></ErrorMessage>
        }
    </div>
}