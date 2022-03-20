import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {characterType, getCharacterByName} from "../api";
import {emptyCharacter, ErrorMessage, Skeleton} from "../helpers";

export const Character = ()=>{
    const [character,setCharacter] = useState<characterType | undefined>(emptyCharacter)

    const {name} = useParams()

    const getCharacter = async ()=>{
        if(!name){
            setCharacter(undefined)
            return
        }
        const character = await getCharacterByName(name)
        setCharacter(character)
    }

    useEffect(()=>{
        getCharacter()
    },[name])

    return <div>
        {character?
            <div style={{padding:20}} className={"is-flex"}>
                <div
                    className={"box"}
                    style={{width:340,maxHeight:500,overflowY:"hidden"}}
                >
                    <figure className={"image"}>
                        <Skeleton style={{width:300, height:400}} value={character.img && <img alt={""} width={320} src={character.img}/>}/>
                    </figure>
                </div>
                <div style={{paddingTop:32,paddingLeft:32}}>
                    <h1 className={"title"}><Skeleton value={character.name}/></h1>
                    <table className={"table is-narrow"}>
                        <tr><td className={"has-text-weight-bold"}>birthday</td><td><Skeleton value={character.birthday}/></td></tr>
                        <tr><td className={"has-text-weight-bold"}>nickname</td><td><Skeleton value={character.nickname}/></td></tr>
                        <tr><td className={"has-text-weight-bold"}>status</td><td><Skeleton value={character.status}/></td></tr>
                    </table>
                    <h2 className={"title is-4"}>Occupations</h2>
                        <Skeleton
                            value={character.occupation.length?<>{character.occupation.map(occupation=> <span style={{marginRight:8}} className={"tag"}>{occupation}</span>)}</>:""}
                        />
                </div>
            </div>:
            <ErrorMessage><>
                <p>Something went wrong. Maybe this episode not exists or api not available.</p>
                <p>If You sea it again, contact the address <a href="mailto:example@example.com">example@example.com</a></p>
            </></ErrorMessage>
        }
    </div>
}