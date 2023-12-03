import { useEffect } from "react"

export const useConditionalListener = (eventListener, callback, conditon)=>{
    useEffect(()=>{
        if(conditon){
            document.addEventListener(eventListener, callback)
        }else{
            window.removeEventListener(eventListener, callback)
        }
        return () => window.removeEventListener(eventListener, callback)
    }, [conditon])
}