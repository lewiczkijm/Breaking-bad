import React from "react";
import Icon from "@mdi/react";
import {mdiCloseOctagon} from "@mdi/js";

export type skeletonType = {
    children?:JSX.Element,
    style?:React.CSSProperties
    className?:string
}
export const Skeleton = ({children,style}:skeletonType)=><span
    style={style}
    className={"skeleton"}
>{children}</span>

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
