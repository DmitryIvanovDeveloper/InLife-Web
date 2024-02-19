//@ts-ignore
import BusStation from '../Images/Locations/BusStation.png';
//@ts-ignore
import FitnessTraier from '../Images/Locations/FitnessTrainer.png';
//@ts-ignore
import AutoMechanic from "../Images/Locations/AutoMechanic.png";
import ConstructionZoneForeman from "../Images/Locations/ConstructionZoneForeman.png";
import FountainOldMan from '../Images/Locations/FountainOldMan.png';
import HospitalDoctor from "../Images/Locations/HospitalDoctor.png";
import HospitalNurse from "../Images/Locations/HospitalNurse.png";
import PoliceStationDetective from "../Images/Locations/PoliceStationDetective.png";
import PoliceStationOfficer from "../Images/Locations/PoliceStationOfficer.png";
import PoliceStationPoliceMan from "../Images/Locations/PoliceStationPoliceman.png";
import PoliceStationSwat from "../Images/Locations/PoliceStationSwat.png";
import StreetOldman from "../Images/Locations/StreetOldman.png";
import Stranger from "../Images/Locations/StreetStranger.png";
import StreetWalkerWoman from "../Images/Locations/StreetWalkerWoman.png";
import TrafficControllOfficer from "../Images/Locations/TrafficControllOfficer.png";
import TrafficIncidentDoctor from "../Images/Locations/TrafficIncidentDoctor.png";
import TrafficIncidentPoliceWoman from "../Images/Locations/TrafficIncidentPoliceWoman.png";
import WalkerMan from '../Images/Locations/Walker.png';

import BusinessWomanAvatar from '../Images/Avatars/Business Woman (Bus station).png';
import WalkerManAvatar from '../Images/Avatars/Walker man (Street).png';
import FitnessTrainerAvatar from '../Images/Avatars/Fitness trainer.png';
import OldmanFountainAvatar from '../Images/Avatars/Old man (fountain).png'
import PolieManTrafficControllerAvatar from '../Images/Avatars/Police man (Traffic Controller).png'
import StrangerAvatar from '../Images/Avatars/Stranger (street).png'
import PoliceWomanCarAccidentAvatar from '../Images/Avatars/PoliceWoman (car accident).png'
import DoctorCarAccident from '../Images/Avatars/Doctor (Car accident).png'
import OldmanStreetAvatar from '../Images/Avatars/Old man (street).png'
import DoctorHispitalAvatar from '../Images/Avatars/Doctor (hospital).png'
import NurseHospitalAvatar from '../Images/Avatars/Nurse (Hispital).png'
import AutoMechanicAvatar from '../Images/Avatars/Auto Mechanic (Street).png'
import DetectiveAvatar from '../Images/Avatars/Detective (Police station).png'
import SwatAvatar from '../Images/Avatars/Swat.png'
import ForemanAvatar from '../Images/Avatars/Worker.png'
import WalkerWmanAvatar from '../Images/Avatars/Walker woman (Street).png'

import { GenderType } from './GenderType';

export const Locations: INpc[] = [{
    id: process.env.REACT_APP_LOCATION_BUS_STATION ?? "",
    name: "Street: Bus station",
    gender: GenderType.Female,
    image: BusStation,
    avatar: BusinessWomanAvatar,
},
{
    id: process.env.REACT_APP_LOCATION_FITNESS_TRAINER ?? "",
    name: "Park: Fitness trainer",
    gender: GenderType.Female,
    image: FitnessTraier,
    avatar: FitnessTrainerAvatar
},
{
    id: process.env.REACT_APP_LOCATION_STREET_WALKER_MAN ?? "",
    name: "Street: Walker man",
    gender: GenderType.Male,
    image: WalkerMan,
    avatar: WalkerManAvatar,
},
{
    id: process.env.REACT_APP_LOCATION_FOUNTAIN_OLDMAN ?? "",
    name: "Fountain: Old man",
    gender: GenderType.Male,
    image: FountainOldMan,
    avatar: OldmanFountainAvatar
},
{
    id: process.env.REACT_APP_LOCATION_TRAFFIC_CONTROLL_OFFICER ?? "",
    name: "Traffic controll officer",
    gender: GenderType.Male,
    image: TrafficControllOfficer,
    avatar: PolieManTrafficControllerAvatar
},
{
    id: process.env.REACT_APP_LOCATION_STREET_STRANGER ?? "",
    name: "Street: Stranger",
    gender: GenderType.Male,
    image: Stranger,
    avatar: StrangerAvatar,
},
{
    id: process.env.REACT_APP_LOCATION_TRAFFIC_INCIDENT_POLICE_WOMAN ?? "",
    name: "Traffic incident: Police woman",
    gender: GenderType.Male,
    image: TrafficIncidentPoliceWoman,
    avatar: PoliceWomanCarAccidentAvatar
},
{
    id: process.env.REACT_APP_LOCATION_TRAFFIC_INCIDENT_DOCTOR ?? "",
    name: "Traffic incident: Doctor",
    gender: GenderType.Male,
    image: TrafficIncidentDoctor,
    avatar: DoctorCarAccident,
},
{
    id: process.env.REACT_APP_LOCATION_STREET_OLDMAN ?? "",
    name: "Street: Oldman",
    gender: GenderType.Male,
    image: StreetOldman,
    avatar: OldmanStreetAvatar
},
{
    id: process.env.REACT_APP_LOCATION_HOSPITAL_DOCTOR ?? "",
    name: "Hospital: Doctor",
    gender: GenderType.Male,
    image: HospitalDoctor,
    avatar: DoctorHispitalAvatar,

},
{
    id: process.env.REACT_APP_LOCATION_HOSPITAL_NURSE ?? "",
    name: "Hospital: Nurse",
    gender: GenderType.Female,
    image: HospitalNurse,
    avatar: NurseHospitalAvatar,
},
{
    id: process.env.REACT_APP_LOCATION_STREET_WALKER_WOMAN ?? "",
    name: "Street: Walker woman",
    gender: GenderType.Female,
    image: StreetWalkerWoman,
    avatar: WalkerWmanAvatar
},
{
    id: process.env.REACT_APP_LOCATION_AUTO_MECHANIC ?? "",
    name: "Auto mechanic",
    gender: GenderType.Male,
    image: AutoMechanic,
    avatar: AutoMechanicAvatar,
},
{
    id: process.env.REACT_APP_LOCATION_POLICE_STATION_POLICE_MAN ?? "",
    name: "Police Station: Police man",
    gender: GenderType.Male,
    image: PoliceStationPoliceMan,
    avatar: ""
},
{
    id: process.env.REACT_APP_LOCATION_POLICE_STATION_SWAT ?? "",
    name: "Police Station: SWAT",
    gender: GenderType.Male,
    image: PoliceStationSwat,
    avatar: SwatAvatar,
},
{
    id: process.env.REACT_APP_LOCATION_POLICE_STATION_DETECTIVE ?? "",
    name: "Police Station: Detective",
    gender: GenderType.Male,
    image: PoliceStationDetective,
    avatar: DetectiveAvatar,
},
{
    id: process.env.REACT_APP_LOCATION_POLICE_STATION_OFFICER ?? "",
    name: "Police Station: Officer",
    gender: GenderType.Female,
    image: PoliceStationOfficer,
    avatar: ""
},
{
    id: process.env.REACT_APP_LOCATION_CONSTRUCTION_ZONE_FOREMAN ?? "",
    name: "Construction Zone: Foreman",
    gender: GenderType.Male,
    image: ConstructionZoneForeman,
    avatar: ForemanAvatar
},
]


export default interface INpc {
    id: string;
    name: string;
    gender: GenderType;
    image: string;
    avatar: string
}

