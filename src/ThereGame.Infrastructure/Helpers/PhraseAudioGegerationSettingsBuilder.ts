
export default function GetSettings(voiceOptionType: string, name: string, text: string) {
    var model: string = "";

    if (voiceOptionType == "Neural") {
        model = DeepVoiceType.Neural
    }
    if (voiceOptionType == "MonoMulti") {
        model = DeepVoiceType.MonoMulti
    }
    if (voiceOptionType == "Standard") {
        model = DeepVoiceType.Standard
    }

    var body = {
        text,
        model,
        name,
        variability: "0.0",
        invoice: process.env.REACT_APP_DEEP_VOICE_INVOICE,
        clarity: "0.0",
    }

    return JSON.stringify(body);
}

export enum DeepVoiceType
{
    Neural = "DeepVoice_Neural",
    MonoMulti = "DeepVoice_Multi",
    Standard = "DeepVoice_Standard",
}

//     var option1 = `{\"text\":\"" + $"{text}" + "\",\"model\":\"" + "DeepVoice_Neural" + "\",\"name\":\"" + $"{VoiceOptionsNeuralModel.Amy}" + "\",\"variability\":\"" + "0.0" + "\",\"invoice\":\"" + "IN010102296709" + "\",\"clarity\":\"" + "0.0" + "\"}`;
//     var option2 = "{\"text\":\"" + $"{text}" + "\",\"model\":\"" + "DeepVoice_Mono" + "\",\"name\":\"" + $"{VoiceOptionsMonoAndMultiModel.Andrew}" + "\",\"invoice\":\"" + "IN010102296709" + "\",\"variability\":\"" + $"{variability}" + "\",\"clarity\":\"" + $"{clarity}" + "\"}";
//     var option3 = "{\"text\":\"" + $"{text}" + "\",\"model\":\"" + "DeepVoice_Multi" + "\",\"name\":\"" + $"{VoiceOptionsMonoAndMultiModel.Andrew}" + "\",\"invoice\":\"" + "IN010102296709" + "\",\"variability\":\"" + $"{variability}" + "\",\"clarity\":\"" + $"{clarity}" + "\"}";
//     var option4 = "{\"text\":\"" + $"{text}" + "\",\"model\":\"" + "DeepVoice_Standard" + "\",\"name\":\"" + $"{VoiceOptionsStandartModel.Aditi}" + "\",\"invoice\":\"" + "IN010102296709" + "\",\"variability\":\"" + "0.0" + "\",\"clarity\":\"" + "0.0" + "\"}";
