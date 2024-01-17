import { RoutesAPI } from "../../../Routes";
import TypedResult from "../../Statuses/Result";
import { Status } from "../../Statuses/Status";
import { IChatGPTRequestDto } from "./Dtos/IChatGptRequestDto";
import IChatGPTResponseDto from "./Dtos/IChatGptResponseDto";
import BuildPrompt from "./PromptBuilder";

export default class ChatGptService {
    async request(sentence: string) {

        var request: IChatGPTRequestDto = {
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant",
                content: BuildPrompt(sentence)
            }]
        }
        try {
            var response = await fetch(`${RoutesAPI.chatGPT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.REACT_APP_CHATGPT_KEY}`
                },
                body: JSON.stringify(request)
            })
            var data: IChatGPTResponseDto = await response.json();

            if(response.status == 200) {
                return new TypedResult<Status>(Status.OK, data);
            }
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }
}