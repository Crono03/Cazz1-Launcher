import { invoke } from '@tauri-apps/api/tauri';
import { log } from "console";
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import './Homepage.css'

const HomePage = () => {
    const navigate= useNavigate();

    function goToPage(page: string) {
        //invoke("database").then((msg) => console.log(msg))
        navigate(page)
    }

    function startMinecraft() {

    }
    return (
        <div style={{ width: "950px", height: "640px", display: "flex", flexWrap: "nowrap", flexFlow: "column" }}>
            <main style={{ flexBasis: "85%", display: "flex", flexFlow: "row", flexWrap: "nowrap", order: "1" }}>
                <section style={{ flexBasis: "85%", margin: "5px", order: "2" }}>
                    <nav>
                        <button onClick={() => goToPage("changelog")}>Change Log</button>
                    </nav>
                    <Outlet />
                </section>
                <aside style={{ order: "1", flexBasis: "15%", margin: "5px" }}>
                    <ul>
                        <li>picone</li>
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
