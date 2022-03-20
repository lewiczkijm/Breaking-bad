export type episodeType = {
    air_date: string,
    characters: string[],
    episode: string,
    episode_id: number,
    season: string,
    series: string
    title: string,
}

// get list of episodes
export const getEpisodes = async ():Promise<Array<episodeType> | undefined> =>{
    let res = await fetch(`/episodes`).catch(()=>undefined)
    if(!res || !res.ok) return
    return await res.json()
}

// get episode by id
export const getEpisodeById = async (id:string):Promise<episodeType | undefined> =>{
    let res = await fetch(`/episodes/${id}`).catch(()=>undefined)
    if(!res || !res.ok) return
    res = await res.json()
    if(res instanceof(Array)) return res[0]
}