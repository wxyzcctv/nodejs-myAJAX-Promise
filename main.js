window.jQuery = function(nodeOrSelector){
    let nodes = {}
    nodes.addClass = function(){}
    nodes.html = function(){}
    return nodes
}
window.$ = window.jQuery

window.jQuery.ajax = function({url,method,body,headers}){
    return new Promise(function(resolve,reject){
        // 规定是这么写的，主要是为了能将当响应成功之后返回resolve，响应失败之后返回reject
        let request = new XMLHttpRequest()
        request.open(method,url)                          //设置请求的第一部分的内容
        for(let key in headers){
            let value = headers[key]
            request.setRequestHeader(key,value)
        }
        // 将传入设置headers的内容进行循环遍历，遍历一个对象使用for in循环。
        request.onreadystatechange = ()=>{              //监听这个对象的状态码是否发生变化
            // 一旦状态发生改变，这个函数的代码段的位置可以在任何位置
            if(request.readyState === 4){
                if(request.status >= 200 && request.status<=300){
                    resolve.call(undefined,request.responseText)
                }else if(request.status >= 400){
                    reject.call(undefined,request)
                }
            }
        }
        request.send(body)             //设置第四部分的内容
    })
}

function f1(){}
function f2(){}
myButton.addEventListener('click', (e)=>{
    window.jQuery.ajax({
        url:'/xxx',
        method:'post',
        headers:{
            'content-type':'application/x-www-form-urlencoded',
            'frank':'18'
        }
    }).then(
        (text)=>{console.log(text)},
        (request)=>{console.log(request)}
    )
    // 上面的then分别返回的成功与失败的函数
})