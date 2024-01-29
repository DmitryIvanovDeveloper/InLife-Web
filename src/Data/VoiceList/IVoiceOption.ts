import IVoiceModel from "../../Components/VoiceList/IVoiceModel"

export default interface IVoiceOption {
    id: string
    type: string
    voices: IVoiceModel[]
}