//@ts-ignore
import BusStation from '../Images/Locations/BusStation.png';
//@ts-ignore
import FitnessTraier from '../Images/Locations/FitnessTrainer.png';

export const Locations = [{
    id: process.env.REACT_APP_LOCATION_BUS_STATION,
    name: "Street: Bus Station",
    image: BusStation
},
{
    id: process.env.REACT_APP_LOCATION_FITNESS_TRAINER,
    name: "Park: Fitness trainer",
    image: FitnessTraier
}]