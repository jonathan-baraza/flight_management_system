import React from "react";
import "../../css/loading.css";
function Loading() {
    return (
        <div id="loadingDiv">
            <div
                id="loading"
                className="spinner-border text-white"
                role="status"
            ></div>
            <h3>Please wait</h3>
        </div>
    );
}

export default Loading;
