import IVoiceModel from "../../components/VoiceList/IVoiceModel"

export default interface IVoiceOption {
    id: string
    type: string
    voices: IVoiceModel[]
}