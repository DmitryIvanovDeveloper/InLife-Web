import React from "react";
import Carousel from "react-elastic-carousel";
import { Locations } from "../Data/Locations.ts";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
];

export interface ILevelCarouselProps {
    setLevel: (id: string) => void;
    id: string;
}

export default function LevelCarousel(props: ILevelCarouselProps) {

    const onCurrentChange = (event) => {
        props.setLevel(event.item.id);
    }
    
    return (
        <div className="App">
            <hr className="seperator" />
            <div className="carousel-wrapper">
                { //@ts-ignore 
                    <Carousel
                        initialFirstItem={1}
                        onNextEnd={onCurrentChange}
                        onPrevEnd={onCurrentChange}

                        breakPoints={breakPoints}>
                        {Locations.map((location) => (
                            <img id={location.id} key={location.id} src={location.image} width="750" height="250" />
                        ))}
                    </Carousel>
                }

            </div>
        </div>
    );
}