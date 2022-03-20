import {Link} from "react-router-dom";
import {Skeleton} from "../helpers";

export type episodeItemType = {id?:number,title?:string,airDate?:string}
export const EpisodeItem = ({id,title,airDate}:episodeItemType)=><div className="panel-block columns">
    <div className={"column is-3"}>
            <Skeleton
                value={title && <Link style={{fontSize:"1.2rem"}} to={`/episode/${id}`}>
                    {title}
                </Link>}
                style={{fontSize:"1.2rem"}}></Skeleton>
    </div>
    <div className={"column"}><Skeleton value={airDate}></Skeleton></div>
</div>
