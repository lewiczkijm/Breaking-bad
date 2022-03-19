import {useCallback, useMemo} from "react";

export type PagesType = {
    all:number,
    active:number,
    onChange:(page:number)=>void
}

type pageType = {
    page: number,
    isActive:boolean
}
export const Pages = ({all, active, onChange}:PagesType)=>{

    const setPage = (page:number | "prev" | "next")=>{
        if(typeof page === "number") {
            onChange(page);
            return
        }
        if(page === "prev"){
            onChange(active - 1)
            return;
        }
        if(page === "next"){
            onChange(active + 1)
            return;
        }
    }

    const pages = useMemo(()=>{
        let pages:pageType[] = []
        for(let i = 1;i <= all; i ++) pages.push({page:i, isActive: i === active})
        return pages
    },[all,active])

    const setPageCallback = useCallback(setPage,[all,active,setPage])

    return <nav className={"block pagination"}>
        <button onClick={()=>setPageCallback("prev")} disabled={active === 1} className="pagination-previous">Previous</button>
        <button onClick={()=>setPageCallback("next")} disabled={active === all} className="pagination-next">Next page</button>
        <ul className="pagination-list">
            {pages.map(page=><li key={page.page}>
                <button
                    className={page.isActive?"pagination-link is-current":"pagination-link"}
                    aria-label={`Goto page ${page.page}`}
                    onClick={()=>setPageCallback(page.page)}
                >{page.page}</button>
            </li>)}
        </ul>
    </nav>
}