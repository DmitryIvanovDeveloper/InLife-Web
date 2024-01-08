export default interface IAudioSettings {
    readonly id: string | null;
    readonly generationSettings: string;
    readonly audioData?: string;
}