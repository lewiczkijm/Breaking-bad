export type episodeType = {
    air_date: string,
    characters: string[],
    episode: string,
    episode_id: number,
    season: string,
    series: string
    title: string,
}

export type characterType = {
    appearance: number[]
    better_call_saul_appearance: string[]
    birthday: string
    category: string
    char_id: number
    img: string
    name: string
    nickname: string
    occupation: string[]
    portrayed: string
    status: string
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

// get character by name
export const getCharacterByName = async (name:string):Promise<characterType | undefined> =>{
    const names = name.split(" ").join("+")
    let res = await fetch(`/characters?name=${names}`).catch(()=>undefined)
    if(!res || !res.ok) return
    res = await res.json()
    if(res instanceof(Array)) return res[0]
}