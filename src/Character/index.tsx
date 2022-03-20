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
                        {
                            character.img? <img width={320} src={character.img}/>:
                                <Skeleton style={{width:300, height:400,display:"block"}}><>Fake hidden name</></Skeleton>
                        }
                    </figure>
                </div>
                <div style={{paddingTop:32,paddingLeft:32}}>
                    <h1 className={"title"}>{character.name || <Skeleton><>Fake hidden name</></Skeleton>}</h1>
                    <table className={"table is-narrow"}>
                        <tr><td className={"has-text-weight-bold"}>birthday</td><td>{character.birthday || <Skeleton><>Fake hidden name</></Skeleton>}</td></tr>
                        <tr><td className={"has-text-weight-bold"}>nickname</td><td>{character.nickname || <Skeleton><>Fake hidden name</></Skeleton>}</td></tr>
                        <tr><td className={"has-text-weight-bold"}>status</td><td>{character.status || <Skeleton><>Fake hidden name</></Skeleton>}</td></tr>
                    </table>
                    <h2 className={"title is-4"}>Occupations</h2>
                    {
                        !!character.occupation.length ?character.occupation.map(occupation=> <span style={{marginRight:8}} className={"tag"}>{occupation}</span>):
                            <Skeleton><>Fake hidden name</></Skeleton>
                    }
                </div>
            </div>:
            <ErrorMessage><>
                <p>Something went wrong. Maybe this episode not exists or api not available.</p>
                <p>If You sea it again, contact the address <a href="mailto:example@example.com">example@example.com</a></p>
            </></ErrorMessage>
        }
    </div>
}