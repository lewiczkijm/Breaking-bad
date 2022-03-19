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