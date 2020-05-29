import React, { useContext } from "react";
import AppContext from "../AppContext";

import "./styles.css";

const Pages = () => {
    const context = useContext(AppContext);

    return (
        <div className="Pages">
            {context.page.get !== 1 ? <div className="PageButton" onClick={() => {context.page.set(context.page.get - 1);
                context.planetMode.set(false);}}>Previous Page</div> : null}
            <div className="CurrentPage">{context.page.get} / {context.maxPages.get}</div>
            {context.page.get !== context.maxPages.get ? <div className="PageButton" onClick={() =>
                {context.page.set(context.page.get + 1); context.planetMode.set(false);}}>Next Page</div> : null}
        </div>
    )
}

export default Pages;