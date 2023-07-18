import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ls from 'localstorage-slim';
//import "./styles.css";
window.addEventListener('beforeunload', (_) => {
    ls.set("LastTimeOnline", new Date());
});
let olddate = ls.get("LastTimeOnline");
if (olddate instanceof Date && !isNaN(olddate.valueOf())) {
    let datediff = Math.abs(olddate.valueOf() - new Date().valueOf());
    const THREE_MONTHS = 1000 * 60 * 60 * 24 * 90;
    const ID_DATE_OLDER_THAN_THREE_MONTHS: boolean = Math.floor(datediff / THREE_MONTHS) >= 1
    if ((ls.get("LastTimeOnline")) && ID_DATE_OLDER_THAN_THREE_MONTHS) {
        ls.clear()
    }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
