import { invoke } from '@tauri-apps/api/tauri';
import React, { useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import './Homepage.css'

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const username: string = location.state.username
    function startMinecraft() {

    }

    return (
        <div style={{ width: "950px", height: "640px", display: "flex", flexWrap: "nowrap", flexFlow: "column" }}>
            <main style={{ flexBasis: "85%", display: "flex", flexFlow: "row", flexWrap: "nowrap", order: "1" }}>
                <section style={{ display: "flex", flexDirection: "column", flexWrap: "nowrap", flexBasis: "85%", margin: "5px", order: "2" }}>
                    <nav style={{ order: "1" }}>
                        <button onClick={() => {
                            navigate("changelog")
                        }
                        }>Change Log</button>
                    </nav>
                    <div id='homepageoutletroot' style={{ flex: "1 1 auto", order: "2", overflow: 'auto', }}>
                        <Outlet />
                    </div>
                </section>
                <aside style={{ order: "1", flexBasis: "15%", margin: "5px" }}>
                    <ul>
                        <li>{username}</li>
                        <li>picone</li>
                        <li>picone</li>
                    </ul>
                </aside>
            </main>
            <footer style={{ order: "2", flexBasis: "15%", margin: "5px", display: "grid", width: "auto" }}>
                <button className="play-button" onClick={startMinecraft}>PLAY</button>
            </footer>
        </div>
    );
};

export default HomePage;
