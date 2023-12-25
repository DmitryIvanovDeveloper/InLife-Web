import IVoiceModel from "../../components/voiceList/IVoiceModel"

export default interface IVoiceOption {
    id: string
    type: string
    voices: IVoiceModel[]
}