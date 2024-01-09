import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { Locations } from "../Data/Locations";
import { VoiceOptionsNeuralType } from "../Data/VoiceList/VoiceOptionsNeuralType";
import { GenderType } from "../Data/GenderType";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
];

export interface ILevelCarouselProps {
    setLevel: (id: string) => void;
    id: string;
}

export default function LevelCarousel(props: ILevelCarouselProps) {

    const onCurrentChange = (event: any) => {
        console.log(event.item.id);
        props.setLevel(event.item.id);
    }
    
    useEffect(() => {
        console.log(Locations.findIndex(location => location.id == props.id));

      
    }, []);

    return (
        <div className="App">
            <hr className="seperator" />
            <div className="carousel-wrapper">
                { //@ts-ignore 
                    <Carousel
                        initialFirstItem={Locations.findIndex(location => location.id == props.id) ?? [0]}
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