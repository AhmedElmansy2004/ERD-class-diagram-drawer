import { createElement } from "react";

export function downloadDataURI(dataURI: string, filename: string){
    const a = document.createElement('a')
    a.href = dataURI
    a.download = filename
    a.click()
}