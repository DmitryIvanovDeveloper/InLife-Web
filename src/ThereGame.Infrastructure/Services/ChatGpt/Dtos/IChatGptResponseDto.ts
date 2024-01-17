export default interface IChatGPTResponseDto
{
    id: string,
    object: string,
    created: string,
    model: string, 
    choices: ChoiceResponse []  
    usage: Usage,
    system_fingerprint: string | null
}

interface ChoiceResponse {
    index: string
    message: MessageResponseDto ,
    logprobs: string | null,
    finish_reason: string
}

interface MessageResponseDto {
    role: string;
    content: string
}

interface Usage {
    promt_token: number;
    completion_tokens : number;
    total_tokens: number;
}

export interface IDataResponse {
    variations: string[];
    translations : string[];
    words_uppercase: string;
    tenseses: string[]
}


// {
//     "id": "chatcmpl-8hwVy7pCx2pHcavmPLkYRJHhhnRuq",
//     "object": "chat.completion",
//     "created": 1705483726,
//     "model": "gpt-3.5-turbo-0613",
//     "choices": [
//       {
//         "index": 0,
//         "message": {
//           "role": "assistant",
//           "content": "{\n    \"variations\": [\n        \"That's too long\",\n        \"Too long. How about going for a walk?\",\n        \"How about going on foot?\",\n        \"Would you like to walk with me?\",\n        \"Would you like to join me on a walk?\"\n    ],\n    \"translations\": [\n        \"Это слишком долго\",\n        \"Это слишком долго. Как насчет прогулки?\",\n        \"Как насчет ходить пешком?\",\n        \"Хотели бы вы пойти со мной гулять?\",\n        \"Хотели бы вы присоединиться ко мне на прогулку?\"\n    ],\n    \"words_uppercase\": \"That, How, Would\"\n}"
//         },
//         "logprobs": null,
//         "finish_reason": "stop"
//       }
//     ],
//     "usage": {
//       "prompt_tokens": 135,
//       "completion_tokens": 175,
//       "total_tokens": 310
//     },
//     "system_fingerprint": null
//   }
  