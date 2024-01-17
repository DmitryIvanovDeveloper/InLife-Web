export interface IChatGPTRequestDto
{
    model: string
    messages: MessageRequestDto[]
}

interface MessageRequestDto
{
    role: string;
    content: string
}
