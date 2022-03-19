import {Link} from "react-router-dom";
import {Skeleton} from "../helpers";

export type episodeItemType = {id?:number,title?:string,airDate?:string}
export const EpisodeItem = ({id,title,airDate}:episodeItemType)=><div className="panel-block columns">
    <div className={"column is-3"}>
        {!!title?
            <Link style={{fontSize:"1.2rem"}} to={`/episode/${id}`}>
                {title}
            </Link>:
            <Skeleton style={{fontSize:"1.2rem"}}><>Fake hidden name</></Skeleton>
        }
    </div>
    <div className={"column"}>{airDate || <Skeleton><>without date</></Skeleton>}</div>
</div>
