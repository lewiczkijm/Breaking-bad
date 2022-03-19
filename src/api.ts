export type episodeType = {
    air_date: string,
    characters: string[],
    episode: string,
    episode_id: number,
    season: string,
    series: string
    title: string,
}
export const getEpisodes = async ():Promise<Array<episodeType> | undefined> =>{
    let res = await fetch(`/episodes`).catch(()=>undefined)
    if(!res || !res.ok) return
    return await res.json()
}
