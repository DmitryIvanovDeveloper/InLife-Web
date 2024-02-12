
import { v4 as uuidv4 } from 'uuid';
import IVoiceOption from "./IVoiceOption";
import { VoiceOptionsMonoMultyType } from "./VoiceOptionsMonoMultyType";
import { VoiceOptionsNeuralType } from "./VoiceOptionsNeuralType";
import { VoiceOptionsStandartType } from "./VoiceOptionsStandartType";

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
// {
//     id: uuidv4(),
//     type: "Standard",
//     voices: voiceOptionsStandartType.map(type => {
//         return {
//             id: uuidv4(),
//             name: type,
//             path: voiceOptionsStandartPath
//         }
//     })
// },
// {
//     id: uuidv4(),
//     type: "MonoMulti",
//     voices: voiceOptionsMonoMultyType.map(type => {
//         return {
//             id: uuidv4(),
//             name: type,
//             path: voiceOptionsMonoMultyPath
//         }
//     })
// }
]