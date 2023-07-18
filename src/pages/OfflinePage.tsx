import { fontSize } from "@mui/system";
import React from "react";
import './OfflinePage.css'


const OfflinePage = () => {

    const startMinecraft = () => {

    }

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexWrap: "nowrap", flexFlow: "column" }}>
            <main id="mainOffline" style={{ width: "auto", flexBasis: "85%", display: "flex", flexFlow: "column", flexWrap: "nowrap", order: "1", justifyContent: "center" }}>
                <p style={{
                    color: "red",
                    fontSize: "100px",
                    textAlign: "center",
                }}>Launcher offline</p>
            </main>
            <footer style={{ order: "2", flexBasis: "15%", display: "grid", width: "auto"}}>
                <button className="play-button" onClick={startMinecraft}>PLAY</button>
            </footer>
        </div>
    );
}

export default OfflinePage;
