import React from "react";

export type skeletonType = {
    children?:JSX.Element,
    style?:React.CSSProperties
    className?:string
}
export const Skeleton = ({children,style}:skeletonType)=><span
    style={style}
    className={"skeleton"}
>{children}</span>

// Generation array with default element value and declared size. Object value will link copy
export function generateArray<T>(val:T, count:number):T[]{
    let arr = []
    for(let i = 0; i < count;i ++){
        arr.push(val)
    }
    return arr
}