//@ts-ignore
import BusStation from '../Images/Locations/BusStation.png';
//@ts-ignore
import FitnessTraier from '../Images/Locations/FitnessTrainer.png';
//@ts-ignore
import WalkerMan from '../Images/Locations/Walker.png';
import FountainOldMan from '../Images/Locations/FountainOldMan.png';
import TrafficControllOfficer from "../Images/Locations/TrafficControllOfficer.png"
import Stranger from "../Images/Locations/StreetStranger.png"
import TrafficIncidentPoliceWoman from "../Images/Locations/TrafficIncidentPoliceWoman.png"
import TrafficIncidentDoctor from "../Images/Locations/TrafficIncidentDoctor.png"
import StreetOldman from "../Images/Locations/StreetOldman.png"
import HospitalDoctor from "../Images/Locations/HospitalDoctor.png"
import HospitalNurse from "../Images/Locations/HospitalNurse.png"
import StreetWalkerWoman from "../Images/Locations/StreetWalkerWoman.png"
import AutoMechanic from "../Images/Locations/AutoMechanic.png"
import PoliceStationPoliceMan from "../Images/Locations/PoliceStationPoliceman.png"
import PoliceStationSwat from "../Images/Locations/PoliceStationSwat.png"
import PoliceStationDetective from "../Images/Locations/PoliceStationDetective.png"
import PoliceStationOfficer from "../Images/Locations/PoliceStationOfficer.png"
import ConstructionZoneForeman from "../Images/Locations/ConstructionZoneForeman.png"

import { GenderType } from './GenderType';

export const Locations = [{
    id: process.env.REACT_APP_LOCATION_BUS_STATION,
    name: "Street: Bus station",
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
    id: process.env.REACT_APP_LOCATION_STREET_WALKER_MAN,
    name: "Street: Walker man",
    gender: GenderType.Male,
    image: WalkerMan
},
{
    id: process.env.REACT_APP_LOCATION_FOUNTAIN_OLDMAN,
    name: "Fountain: Old man",
    gender: GenderType.Male,
    image: FountainOldMan
},
{
    id: process.env.REACT_APP_LOCATION_TRAFFIC_CONTROLL_OFFICER,
    name: "Traffic controll officer",
    gender: GenderType.Male,
    image: TrafficControllOfficer
},
{
    id: process.env.REACT_APP_LOCATION_STREET_STRANGER,
    name: "Street: Stranger",
    gender: GenderType.Male,
    image: Stranger
},
{
    id: process.env.REACT_APP_LOCATION_TRAFFIC_INCIDENT_POLICE_WOMAN,
    name: "Traffic incident: Police woman",
    gender: GenderType.Male,
    image: TrafficIncidentPoliceWoman
},
{
    id: process.env.REACT_APP_LOCATION_TRAFFIC_INCIDENT_DOCTOR,
    name: "Traffic incident: Doctor",
    gender: GenderType.Male,
    image: TrafficIncidentDoctor
},
{
    id: process.env.REACT_APP_LOCATION_STREET_OLDMAN,
    name: "Street: Oldman",
    gender: GenderType.Male,
    image: StreetOldman
},
{
    id: process.env.REACT_APP_LOCATION_HOSPITAL_DOCTOR,
    name: "Hospital: Doctor",
    gender: GenderType.Male,
    image: HospitalDoctor
},
{
    id: process.env.REACT_APP_LOCATION_HOSPITAL_NURSE,
    name: "Hospital: Nurse",
    gender: GenderType.Female,
    image: HospitalNurse
},
{
    id: process.env.REACT_APP_LOCATION_STREET_WALKER_WOMAN,
    name: "Street: Walker woman",
    gender: GenderType.Female,
    image: StreetWalkerWoman
},
{
    id: process.env.REACT_APP_LOCATION_AUTO_MECHANIC,
    name: "Auto mechanic",
    gender: GenderType.Male,
    image: AutoMechanic
},
{
    id: process.env.REACT_APP_LOCATION_POLICE_STATION_POLICE_MAN,
    name: "Police Station: Police man",
    gender: GenderType.Male,
    image: PoliceStationPoliceMan
},
{
    id: process.env.REACT_APP_LOCATION_POLICE_STATION_SWAT,
    name: "Police Station: SWAT",
    gender: GenderType.Male,
    image: PoliceStationSwat
},
{
    id: process.env.REACT_APP_LOCATION_POLICE_STATION_DETECTIVE,
    name: "Police Station: Detective",
    gender: GenderType.Male,
    image: PoliceStationDetective
},
{
    id: process.env.REACT_APP_LOCATION_POLICE_STATION_OFFICER,
    name: "Police Station: Officer",
    gender: GenderType.Female,
    image: PoliceStationOfficer
},
{
    id: process.env.REACT_APP_LOCATION_CONSTRUCTION_ZONE_FOREMAN,
    name: "Construction Zone: Foreman",
    gender: GenderType.Male,
    image: ConstructionZoneForeman
},
]


