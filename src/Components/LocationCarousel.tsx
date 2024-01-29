import { Box } from "@mui/material";
import Carousel from "react-elastic-carousel";
import { Locations } from "../Data/Locations";

const breakPoints = [
    { width: 2, itemsToShow: 1,  },
];

export interface ILevelCarouselProps {
    setLevel: (id: string) => void;
    id: string;
}

export default function LevelCarousel(props: ILevelCarouselProps) {

    const onCurrentChange = (event: any) => {
        props.setLevel(event.item.id);
    }

    return (
        <Box>
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

        </Box>
    );
}