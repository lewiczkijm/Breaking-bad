export type selectSeasonType = {
    values: string[],
    value: string,
    onChange:(value:string)=>void
}
export const SelectSeason = ({values, onChange, value}:selectSeasonType)=>{
    return <div className={"is-flex is-align-items-center"} style={{padding:20}}>
        <label className="label" style={{paddingRight: 20}}>Select season</label>
        <div className="select is-small">
            <select value={value} onChange={(e)=>onChange(e.target.value)}>
                <option value={""}>all</option>
                {
                    values.map((val, i)=>
                        <option value={val} key={i}>{val}</option>
                    )
                }
            </select>
        </div>
    </div>

}