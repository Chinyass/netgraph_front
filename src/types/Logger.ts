interface ColorableText {
    text: string,
    color: string
}

class ColorText implements ColorableText {
    text: string;
    color: string;

    constructor(name:string,color:string) {
        this.text = name
        this.color = color
    }
}

export const LogLevels = {
    INFO : new ColorText("info","text-blue-600"),
    WARNING : new ColorText("warning","text-yellow-600"),
    ERROR : new ColorText("error","text-red-600")
}
export const LogStatus ={
    OK : new ColorText("ok","text-green-600"),
    ERROR : new ColorText("error","text-red-600")
}
export default  { LogLevels,LogStatus };