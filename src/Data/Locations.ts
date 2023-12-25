//@ts-ignore
import BusStation from '../Images/Locations/BusStation.png';
//@ts-ignore
import FitnessTraier from '../Images/Locations/FitnessTrainer.png';
//@ts-ignore
import Walker from '../Images/Locations/Walker.png';
import { GenderType } from './GenderType';

export const Locations = [{
    id: process.env.REACT_APP_LOCATION_BUS_STATION,
    name: "Street: Bus Station",
    gender: GenderType.Female,
    image: BusStation
},
{
    id: process.env.REACT_APP_LOCATION_FITNESS_TRAINER,
    name: "Park: Fitness trainer",
    gender: GenderType.Female,
    image: FitnessTraier
},
{
    id: process.env.REACT_APP_LOCATION_STREET_WALKER,
    name: "Street: Walker",
    gender: GenderType.Male,
    image: Walker
}
]


