import {useState } from "react"

export const SearchBar = () => {
    const [searchFocus,setSearchFocus] = useState(false);
    const [searchString,setSearchString] = useState("");
    return (
        <>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">🔎</span>
                </div>
                <input type="text"
                value = {searchString}
                onChange = {(e)=>setSearchString(e.target.value)}
                onFocus = {()=>setSearchFocus(true)}
                onBlur = {()=>setSearchFocus(false)}
                className="form-control" aria-label="Item to be searched" />
                <div className="input-group-append">
                    <span className="input-group-text btn btn-warning">search</span>
                </div>
            </div>
            <div className={`collapse overlay-collapse mt-0 px-1 ${searchFocus ? 'show':''}`} id="searchCollapse">
                <div className="card card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                </div>
            </div>
        </>
    )
}