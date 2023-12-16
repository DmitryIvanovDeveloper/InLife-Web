import React, { useState } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import { Locations } from "../../Data/Locations.ts";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
];

export default function LevelCarousel(props) {

    const onCurrentChange = (event) => {
        props.setLevel(event.item.id);
    }

    return (
        <div className="App">
            <hr className="seperator" />
            <div className="carousel-wrapper">
                <Carousel 
                 onNextEnd={onCurrentChange}
                 onPrevEnd={onCurrentChange}

                 breakPoints={breakPoints}>
                    {Locations.map((location) => (
                        <img id={location.id} key={location.id} src={location.image} width="750" height="250" />
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<LevelCarousel />, rootElement);
