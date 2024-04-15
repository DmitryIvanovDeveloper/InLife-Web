export default class GameWebGLSettings {

    public getInLifeSettings(): IGameWebGLSettings {
        return {
            loaderUrl: "/unity/InLife/InLifeWebGL.loader.js",
            dataUrl: "/unity/InLife/InLifeWebGL.data",
            frameworkUrl: "/unity/InLife/InLifeWebGL.framework.js",
            codeUrl: "/unity/InLife/InLifeWebGL.wasm",
        }
    }
    public getBuilRandomLettersSettings(): IGameWebGLSettings {
        return {
            loaderUrl: "/unity/BuildRandomLetters/BuildRandomLetters.loader.js",
            dataUrl: "/unity/BuildRandomLetters/BuildRandomLetters.data",
            frameworkUrl: "/unity/BuildRandomLetters/BuildRandomLetters.framework.js",
            codeUrl: "/unity/BuildRandomLetters/BuildRandomLetters.wasm",
        }
    }
}

export interface IGameWebGLSettings {
    loaderUrl: string,
    dataUrl: string,
    frameworkUrl:string,
    codeUrl: string,
}