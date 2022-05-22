var methods={
    // 浅拷贝
    clone:function(target) {
        let newTarget={}
        for( let prop in target){
            if(target.hasOwnProperty(prop)){
                newTarget[prop]=target[prop]
            }
        }
        return newTarget
    },

    // 深拷贝
    deepClone:function(target,hash=new WeakMap()) {
        if(target===null) return target
        if (target instanceof Date) return new Date(target)
        if (target instanceof RegExp) return new RegExp(target)
        // if (target instanceof HTMLElement) return target // 处理 DOM元素
        if(typeof target!=='object') return target
        if(hash.get(target)){
            return hash.get(target)
        }
        const cloneTarget=new target.constructor()
        hash.set(target,cloneTarget)
        Reflect.ownKeys(target).forEach(key=>{
            cloneTarget[key]=deepClone(target[key],hash)
        })
        return cloneTarget
    },
    //new方法
    myNew:function () {
        var obj=new Object()
        var constructor=Array.prototype.shift.call(arguments)
        obj.__proto__=constructor.prototype
        var ret=constructor.apply(obj,arguments)
        return typeof ret==='object'?ret:obj
    },
    //instaceOf方法
    myInstaceOf:function (target,origin) {
        let proto=target.__proto__
        while(true){
            if(proto===null){
                return false
            }
            if(proto===origin.prototype){
                return true
            }
            proto=proto.__proto__
        }
    },
    //debounce防抖函数    功能：n秒内只要你触发事件，就重新计时，事件处理函数的程序将永远不能被执行.
    debounce:function (fn,wait,immediate) {
        var t=null,result
        var debounced=function () {
            var self=this
            var args=arguments
            if(t){
                clearTimeout(t)
            }
            // 首次立即执行
            if(immediate){
                // 执行了就不执行，等定时器执行完，再次执行
                var callNow=!t
                t=setTimeout(function () {
                    t=null
                },wait)
                if(callNow){
                    result = fn.apply(self,args)
                }
            }else{
                t=setTimeout(function () {
                    result = fn.apply(self,args)
                },wait)
            }
            return result
        }
        // 取消防抖
        debounced.cancel=function () {
            clearTimeout(t)
            t=null
        }
        return debounced
    },
    //throttle节流函数  功能：事件被触发，n秒之内只执行一次事件处理函数
    throttle:function(fn,wait){
        var t=null
        var previous=0
        var throttled= function () {
            var self=this
            var args=arguments
            var now =+new Date()
            //下次触发fn的剩余时间
            var remaining=wait-(now-previous)
            //如果没有剩余的时间或者改了系统时间
            if(remaining<=0||remaining>wait){
                if(t){
                    clearTimeout(t)
                    t=null
                }
                previous=now
                fn.apply(self,args)
            }else if(!t){
                t=setTimeout(function () {
                    previous=+new Date()
                    t=null
                    fn.apply(self,args)
                },remaining)
            }
        }
        throttled.cancel=function () {
            t=null
            clearTimeout(t)
            previous=0
        }
        return throttled
    }
};

module.exports=methods
