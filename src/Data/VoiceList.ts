
import { VoiceOptionsNeuralType } from "./VoiceList/VoiceOptionsNeuralType";
import { v4 as uuidv4 } from 'uuid';
import { VoiceOptionsStandartType } from "./VoiceList/VoiceOptionsStandartType";
import { VoiceOptionsMonoMultyType } from "./VoiceList/VoiceOptionsMonoMultyType";
import IVoiceOption from "./VoiceList/IVoiceOption";

var path = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/audio/PreviewVoices`;

var voiceOptionsNeuralPath = `${path}/Neural`;
var voiceOptionsStandartPath = `${path}/Standard`;
var voiceOptionsMonoMultyPath = `${path}/MonoMulti`;

var voiceOptionsNeuralType = Object
    .values(VoiceOptionsNeuralType)
    .filter(value => typeof value === "string")
;

var voiceOptionsStandartType = Object
    .values(VoiceOptionsStandartType)
    .filter(value => typeof value === "string")
;

var voiceOptionsMonoMultyType = Object
    .values(VoiceOptionsMonoMultyType)
    .filter(value => typeof value === "string")
;


export const VoicesOptions: IVoiceOption[] = [{
    id: uuidv4(),
    type: "Neural",
    voices: voiceOptionsNeuralType.map(type => {
        return {
            id: uuidv4(),
            name: type,
            path: voiceOptionsNeuralPath
        }
    })
},
{
    id: uuidv4(),
    type: "Standart",
    voices: voiceOptionsStandartType.map(type => {
        return {
            id: uuidv4(),
            name: type,
            path: voiceOptionsStandartPath
        }
    })
},
{
    id: uuidv4(),
    type: "MonoMulty",
    voices: voiceOptionsMonoMultyType.map(type => {
        return {
            id: uuidv4(),
            name: type,
            path: voiceOptionsMonoMultyPath
        }
    })
}]