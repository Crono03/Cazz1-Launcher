import React from "react";
import './Homepage.css'

const HomePage = () => {
    function startMinecraft() {

    }
    return (
        <div style={{ width: "950px", height: "640px", display: "flex", flexWrap: "nowrap", flexFlow: "column" }}>
            <main style={{flexBasis: "85%", display: "flex", flexFlow:"row", flexWrap: "nowrap", order: "1"}}>
                <section style={{ flexBasis: "70%", margin: "5px", order: "2" }}>
                    <img src="./src/assets/react.svg" />
                </section>
                <aside style={{ order: "1",  flexBasis: "30%", margin: "5px"}}>
                    <ul>
                        <li>picone</li>
                        <li>picone</li>
                        <li>picone</li>
                    </ul>
                </aside>
            </main>
            <footer style={{order: "2", flexBasis: "15%", margin: "5px", display: "grid", width: "auto"}}>
                <button className="play-button" onClick={startMinecraft}>PLAY</button>
            </footer>
        </div>
    );
};

export default HomePage;
