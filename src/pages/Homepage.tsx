import React from "react";
import { Outlet,  useNavigate } from "react-router-dom";
import ls from 'localstorage-slim';
import './Homepage.css';

const HomePage = () => {
    const navigate = useNavigate();
    function startMinecraft() {

    }
    return (
        <div style={{ width: "950px", height: "640px", display: "flex", flexWrap: "nowrap", flexFlow: "column" }}>
            <main style={{ flexBasis: "85%", display: "flex", flexFlow: "row", flexWrap: "nowrap", order: "1", overflow:"auto"}}>
                <section style={{ display: "flex", flexDirection: "column", flexWrap: "nowrap", flex: "1", margin: "5px", order: "2" }}>
                    <nav  style={{ order: "1", margin: "-15px" }}>
                     <button className="schede"onClick={() => {
                     navigate("changelog")
                        }
                        }><p>Changelog</p>
                     </button>
                     <button className="schede"></button>
                     <button className="schede"></button>
                     <button className="schede"></button>         
                    </nav>
                    <div id='homepageoutletroot' className="pageBackground" style={{ flex: "1 1 auto", order: "2", overflow: 'auto', }}>
                        <Outlet />
                    </div>
                </section>
                <aside style={{ order: "1", flexBasis: "20%", margin: "5px", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <nav><h2 style={{ overflow: "hidden", textOverflow: "ellipsis", margin: "0" }}>{ls.get("Guest") ? "Guest" : ls.get("Username")}</h2></nav>
                </aside>
            </main>
            <footer style={{ order: "2", flexBasis: "15%", margin: "5px", display: "grid", width: "auto" }}>
                <button className="play-button" onClick={startMinecraft}>PLAY</button>
            </footer>
        </div>
    );
};

export default HomePage;
