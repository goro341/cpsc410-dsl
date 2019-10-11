import {
    useLocation
} from "react-router-dom";
import React from "react";

export default function NoMatch() {
    let location = useLocation();

    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}
