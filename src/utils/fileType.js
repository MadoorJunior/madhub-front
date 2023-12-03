export const isVideo= (url) => {
    const reg = /(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i
    return reg.test(url);
}
export const isPic = (url)=>{
    const reg = /(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i
    return reg.test(url);
}
