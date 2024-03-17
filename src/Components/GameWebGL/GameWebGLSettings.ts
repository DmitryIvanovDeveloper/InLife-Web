export default class GameWebGLSettings {

    public getInLifeSettings(): IGameWebGLSettings {
        return {
            loaderUrl: "/unity/InLife/InLifeWebGl.loader.js",
            dataUrl: "/unity/InLife/InLifeWebGl.data",
            frameworkUrl: "/unity/InLife/InLifeWebGl.framework.js",
            codeUrl: "/unity/InLife/InLifeWebGl.wasm",
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