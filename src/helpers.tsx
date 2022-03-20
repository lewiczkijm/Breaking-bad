import React, {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiCloseOctagon} from "@mdi/js";
import {characterType, episodeType} from "./api";

export type skeletonType = {
    value?:string | JSX.Element | undefined,
    style?:React.CSSProperties,
    className?:string,
}
export const Skeleton = ({value,style}:skeletonType)=> {

    const [showValue,setShowValue] = useState(false)
    const [showStub,setShowStub] = useState(true)

    useEffect(()=>{
        if(value){
            setShowStub(false)
            setTimeout(()=>setShowValue(true),100)
            return
        }
        setShowStub(true)
        setTimeout(()=>setShowValue(false),100)
    },[value])

    return <span style={style} className={"skeleton-wrapper"}>
        <span
            style={style}
            className={showStub?"skeleton visible":"skeleton"}
        >
            Fake hidden name
        </span>
        {!showStub?<span className={showValue?"skeleton-element visible":"skeleton-element"}>{value}</span> : <span className={"hidden"}>hidden</span>}
    </span>
}

export const ErrorMessage = ({children}:{children:JSX.Element})=><div className="notification is-danger is-flex is-align-items-center">
    <Icon
        path={mdiCloseOctagon}
        title="Error"
        size={5}
        color="white"
    />
    <div style={{paddingLeft:24}}>
        <h2 className={"title"}>Error!</h2>
        {children}
    </div>
</div>


// Generation array with default element value and declared size. Object value will link copy
export function generateArray<T>(val:T, count:number):T[]{
    let arr = []
    for(let i = 0; i < count;i ++){
        arr.push(val)
    }
    return arr
}

// added as stub, while episode not loaded
export const emptyEpisode: episodeType = {
    air_date: "",
    characters: ["","","","",""],
    episode: "",
    episode_id: 0,
    season: "",
    series: "",
    title: "",

}

export const emptyCharacter:characterType = {
    appearance:[],
    better_call_saul_appearance:[],
    birthday:"",
    category:"",
    char_id:0,
    img:"",
    name:"",
    nickname:"",
    occupation:[],
    portrayed:"",
    status:""
}

export const ITEMS_PER_PAGE = 10