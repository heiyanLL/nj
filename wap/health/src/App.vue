<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App',
		created() {
			this.utils.rem()
		}
	}
</script>

<style lang="less">
	fieldset,img {
    border: 0
}

*,a:focus,input:focus {
    outline: 0
}

a,body {
    color: #333
}

.cl,.fix:after {
    clear: both
}

.hm,.hvm {
    left: 50%
}

*,.bbox,.layout,div,p {
    -webkit-box-sizing: border-box
}

.line-clamp-2,.of,.wb {
    text-overflow: ellipsis
}

.footer li,.line-clamp-2,.of,.wb,.wbox-flex {
    word-wrap: break-word;
    word-break: break-all
}

.hor-view,.ver-view {
    -webkit-box-direction: normal
}

article,aside,blockquote,body,button,code,dd,dialog,div,dl,dt,fieldset,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,input,legend,li,nav,ol,p,pre,section,td,textarea,th,ul {
    margin: 0;
    padding: 0
}

input,select,textarea {
    font-size: 100%
}


li,ol,ul {
    list-style: none
}

em,i {
    font-style: normal
}


img {
    max-width: 100%
}

img,input {
    vertical-align: middle
}

a {
    text-decoration: none
}

* {
    -webkit-tap-highlight-color: transparent
}

html {
    -webkit-text-size-adjust: none;
    overflow-y: scroll
}

body {
    min-width: 320px;
    line-height: 1.5;
    font-family: Arial,Helvetica,STHeiTi,sans-serif;
    background: #f2f2f2
}

.w {
    margin: 0 auto;
    max-width: 15rem
}

.layout {
    margin: .2rem
}

.pdlayout {
    padding: .2rem .6rem
}

.fix:after {
    display: block;
    content: '';
    visibility: hidden
}

.fl {
    float: left
}

.fr {
    float: right
}


.hide {
    display: none
}




.pr {
    position: relative
}

.hm,.hvm,.vm {
    position: absolute
}

.gray6 {
    color: #666
}

.gray9 {
    color: #999
}

.vm {
    top: 50%;
    -webkit-transform: translateY(-50%)
}

.hm {
    -webkit-transform: translateX(-50%)
}

.hvm {
    top: 50%;
    -webkit-transform: translate(-50%,-50%)
}

.p {
    margin: 5px 0
}


.wbox {
    display: -webkit-flex!important;
    display: -webkit-box
}

.wbox-flex {
    -webkit-flex: 1!important;
    -webkit-box-flex: 1
}


html {
    font-size: 50px
}

body {
    font-size: 24px
}

@media screen and (min-width: 320px) {
    html {
        font-size:21.33px
    }

    body {
        font-size: 12px
    }
}

@media screen and (min-width: 360px) {
    html {
        font-size:24px
    }

    body {
        font-size: 12px
    }
}

@media screen and (min-width: 375px) {
    html {
        font-size:25px
    }

    body {
        font-size: 12px
    }
}

@media screen and (min-width: 384px) {
    html {
        font-size:25.6px
    }

    body {
        font-size: 14px
    }
}

@media screen and (min-width: 400px) {
    html {
        font-size:26.67px
    }

    body {
        font-size: 14px
    }
}

@media screen and (min-width: 414px) {
    html {
        font-size:27.6px
    }

    body {
        font-size: 14px
    }
}

@media screen and (min-width: 424px) {
    html {
        font-size:28.27px
    }

    body {
        font-size: 14px
    }
}

@media screen and (min-width: 480px) {
    html {
        font-size:32px
    }

    body {
        font-size: 15.36px
    }
}

@media screen and (min-width: 540px) {
    html {
        font-size:36px
    }

    body {
        font-size: 17.28px
    }
}

@media screen and (min-width: 720px) {
    html {
        font-size:48px
    }

    body {
        font-size: 23.04px
    }
}

@media screen and (min-width: 750px) {
    html {
        font-size:50px
    }

    body {
        font-size: 24px
    }
}



#Top {
    position: fixed;
    bottom: 1rem;
    right: .6rem;
    border-radius: 1.6rem;
    width: 1.6rem;
    height: 1.6rem;
    
    z-index: 50
}

.lazybox,.lazyimg img {
    background: url()
}



.sticky {
    position: -webkit-sticky!important;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40
}



.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal
}

.hor-view {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row
}

.ver-view {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    flex-direction: column
}
body{
    background:#F2F2F2;
}
.question-bar{
    position:relative;
    width:100%;
    background:#FFF;
    .attr{
        height:1.8rem;
        line-height:1.8rem;
        padding-left:0.6rem;
        opacity:0.8;
        font-size:0.6rem;
        font-weight:700;
        em{ 
            font-weight:700;
            color:#FF4400
        }
        .a1{
            color:#999;

        }
    }
    .upfile{
        overflow:hidden;
        .operation-div{
            float:left;
        }
        .file-wrap{
            float:left;
            width:3rem;
            height:3rem;
            margin-left:0.48rem;
            border-radius:0.24rem;
            background:red;
            input{
                width:3rem;
                height:3rem;
                opacity:0;
            }
        }
    }
    .answer-list{
        position:absolute;
        right:0;
        top:0;
        width:6rem;
        height:1.8rem;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 1.3rem;
        font-size:0.6rem;
        text-align:right;
        line-height:1.8rem;
    }
    .answer-list:after{
        content: "";
        display: inline-block;
        position: absolute;
        right: .55rem;
        top: 50%;
        margin-top: -0.28rem;
        width: .32rem;
        height: .32rem;
        border-style: solid;
        border-color: #666;
        border-width: .06rem 0 0 .06rem;
        transform: rotateZ(45deg);
        -webkit-transform: rotateZ(-135deg)
    }
    .answer-list.areaPt:after{
        display:none;
    }
    .answer-list.areaPt{
        width:5rem;
        padding-right:0.5rem;
    }
    .answer-list.ipt:after{
        display:none;
    }
    .answer-list.ipt{
        top:-1px;
        right:0.5rem;
        width:8rem;
        padding-right:0;
    }
    .answer-list.ipt input{
        width:100%;
        height:1.2rem;
        padding:0.3rem 0;
        background:none;
        border:none;
        font-size:0.6rem;
        text-align:right;
        vertical-align: baseline;
        
    }
    .answer-list.cur:after{
        margin-top: -0.18rem;
        transform: all 0.2s;
        transform: rotateZ(-135deg);
        -webkit-transform: rotateZ(45deg)
    }
    .radio-btn{
        float:right;
        margin-left:0.36rem;
        .round{
            display: inline-block;
            width:0.5rem;
            height:0.5rem;
            border-radius:0.5rem;
            margin-right:0.12rem;
            vertical-align:0;
        }
        .round.cur{
            background:red;
        }
    }
    .three{
        .radio-btn{
            margin-left:0.24rem;
            
        }
    }
}
.next-step{
    width:13rem;
    height:1.8rem;
    margin:0.48rem auto 0;
    background:#DDD;
    color:#FFF;
    line-height:1.8rem;
    text-align:center;
    font-size:0.6rem;
    border-radius:1.8rem;
}
.next-step.cur{
    background:red;
}
.pophvm{
    display:flex;
    justify-content:center;
    flex-direction: column;
}
.play-info{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgba(0, 0, 0, 0.3);
    z-index:1000;
    .content{
        position: absolute;
        bottom:0;
        left:0;
        width:15rem;
        height:90%;
        margin:0 auto;
        background:#FFF;
        .title{
            font-weight:bold;
            text-align: center;
        }
        .main{
            color:#666
        }
        .checkbox{
            .round{
                display:inline-block;
                width:0.5rem;
                height:0.5rem;
                border-radius:0.5rem;
                border:1px solid #666;
                vertical-align: middle;
                margin-right:0.5rem;
            }
            color:#999;
        }
        .btn{
            overflow:hidden;
            a{
                width:2rem;
                height:1rem;
                border-radius:1rem;
                border:1px solid #666;
                float:left;
            }
            a:last-child{
                background:#999;
            }
            a:last-child.cur{
                background:red;
            }
        }

    }
    
    .content2{
        width:10.8rem;
        margin:0 auto;
        background: #FFF;
        border-radius:0.48rem;
        overflow:hidden;
        .alert-msg1{
            text-align:center;
            font-size:0.56rem;
            color: #333;
            padding:0.96rem 0.6rem;
            border-bottom:1px solid #666;
        }
        .btn-wrap{
            overflow:hidden;
            .btn{
                height:1.6rem;
                font-size:0.6rem;
                width:50%;
                float:left;
                text-align:center;
                line-height:1.6rem;
            }
        }
        .alert-btn1{
            color: #333;
            border-right:1px solid #666;
        }
        .alert-btn2{
            color: red;
        }
    }
}
.step-list{
    overflow:hidden;
    line-height:2rem;
    height:2rem;
    width:14.04rem;
    margin:0 auto;
    .step{
        float:left;
        margin-right:0.5rem;
        em{
            display:inline-block;
            width:0.8rem;
            height:0.8rem;
            border-radius:0.8rem;
            vertical-align:0;
            margin-right:0.12rem;
            font-size:0.38rem;
            line-height:0.8rem;
            background:#DDD;
            text-align:center;
        }
    }
    .step.cur{
        em{
            background:red
        }
    }
}
.pay-method{
    overflow:hidden;
    width:14.04rem;
    margin:0 auto;
    .method{
        border:1px solid #ddd;
        float:left;
        width:2rem;
        height:1rem;
        margin-right:0.4rem;
        line-height:1rem;
    }
}
    
/* layer begin */
.ios-select-widget-box.olay {
    position: fixed;
    z-index: 500;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    background: rgba(0, 0, 0, 0.75);
}
.ios-select-widget-box.olay > div {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    bottom: 0;
    left: 0;
    visibility: visible;
}
.ios-select-widget-box header.iosselect-header {
    height: 44px;
    line-height: 44px;
    background-color: #eee;
    width: 100%;
    z-index: 9999;
    text-align: center;
}
.ios-select-widget-box header.iosselect-header a {
    font-size: 0.56rem;
    color: #e94643;
    text-decoration: none;
}
.ios-select-widget-box header.iosselect-header a.close {
    float: left;
    padding-left: 15px;
    height: 44px;
    line-height: 44px;
}
.ios-select-widget-box header.iosselect-header a.sure {
    float: right;
    padding-right: 15px;
    height: 44px;
    line-height: 44px;
}
.ios-select-widget-box {
    padding-top: 44px;
}
.ios-select-widget-box .one-level-contain,
.ios-select-widget-box .two-level-contain,
.ios-select-widget-box .three-level-contain,
.ios-select-widget-box .four-level-contain,
.ios-select-widget-box .five-level-contain {
    height: 100%;
    overflow: hidden;
}
.ios-select-widget-box .iosselect-box {
    overflow: hidden;
}
.ios-select-widget-box .iosselect-box > div {
    display: block;
    float: left;
}
.ios-select-widget-box ul {
    background-color: #fff;
}
.ios-select-widget-box ul li {
    font-size: 13px;
    height: 35px;
    line-height: 35px;
    background-color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    color: #111;
    opacity: .3;
}
.ios-select-widget-box ul li.at {
    font-size: 16px;
    opacity: 1;
}
.ios-select-widget-box ul li.side1 {
    font-size: 15px;
    opacity: .7;
}
.ios-select-widget-box ul li.side2 {
    font-size: 14px;
    opacity: .5;
}
.ios-select-widget-box.one-level-box .one-level-contain {
    width: 100%;
}
.ios-select-widget-box.one-level-box .two-level-contain,
.ios-select-widget-box.one-level-box .three-level-contain,
.ios-select-widget-box.one-level-box .four-level-contain,
.ios-select-widget-box.one-level-box .five-level-contain,
.ios-select-widget-box.one-level-box .six-level-contain {
    width: 0;
}
.ios-select-widget-box.two-level-box .one-level-contain, 
.ios-select-widget-box.two-level-box .two-level-contain {
  width: 50%;
}
.ios-select-widget-box.two-level-box .three-level-contain,
.ios-select-widget-box.two-level-box .four-level-contain,
.ios-select-widget-box.two-level-box .five-level-contain,
.ios-select-widget-box.two-level-box .six-level-contain {
    width: 0;
}
.ios-select-widget-box.three-level-box .one-level-contain, 
.ios-select-widget-box.three-level-box .two-level-contain {
    width: 30%;
}
.ios-select-widget-box.three-level-box .three-level-contain {
    width: 40%;
}
.ios-select-widget-box.three-level-box .four-level-contain
.ios-select-widget-box.three-level-box .five-level-contain,
.ios-select-widget-box.three-level-box .six-level-contain {
    width: 0%;
}

.ios-select-widget-box.four-level-box .one-level-contain, 
.ios-select-widget-box.four-level-box .two-level-contain,
.ios-select-widget-box.four-level-box .three-level-contain,
.ios-select-widget-box.four-level-box .four-level-contain {
    width: 25%;
}
.ios-select-widget-box.four-level-box .five-level-contain,
.ios-select-widget-box.four-level-box .six-level-contain {
    width: 0%;
}

.ios-select-widget-box.five-level-box .one-level-contain, 
.ios-select-widget-box.five-level-box .two-level-contain,
.ios-select-widget-box.five-level-box .three-level-contain,
.ios-select-widget-box.five-level-box .four-level-contain,
.ios-select-widget-box.five-level-box .five-level-contain {
  width: 20%;
}
.ios-select-widget-box.five-level-box .six-level-contain {
  width: 0%;
}

.ios-select-widget-box.six-level-box .one-level-contain, 
.ios-select-widget-box.six-level-box .two-level-contain,
.ios-select-widget-box.six-level-box .three-level-contain,
.ios-select-widget-box.six-level-box .four-level-contain,
.ios-select-widget-box.six-level-box .five-level-contain {
  width: 16%;
}
.ios-select-widget-box.six-level-box .six-level-contain {
  width: 20%;
}
.ios-select-widget-box .cover-area1 {
    width: 100%;
    border: none;
    border-top: 1px solid #d9d9d9;
    position: absolute;
    top: 149px;
    margin: 0;
    height: 0;
}
.ios-select-widget-box .cover-area2 {
    width: 100%;
    border: none;
    border-top: 1px solid #d9d9d9;
    position: absolute;
    top: 183px;
    margin: 0;
    height: 0;
}
.ios-select-widget-box #iosSelectTitle {
    margin: 0;
    padding: 0;
    display: inline-block;
    font-size: .32rem;
    font-weight: normal;
    color: #333;
}
.ios-select-body-class {
    overflow: hidden;
}
.ios-select-body-class body {
    touch-action: none;
}
.ios-select-widget-box.olay > div > .ios-select-loading-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
    display: none;
}
.ios-select-widget-box.olay > div > .ios-select-loading-box > .ios-select-loading { 
    width: 50px;
    height: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -25px;
    margin-left: -25px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OEMxMEI3NDI3MEIxMUU2ODVGMzhFNjYyMDIyOUFCMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OEMxMEI3NTI3MEIxMUU2ODVGMzhFNjYyMDIyOUFCMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU4QzEwQjcyMjcwQjExRTY4NUYzOEU2NjIwMjI5QUIwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU4QzEwQjczMjcwQjExRTY4NUYzOEU2NjIwMjI5QUIwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GeWqMwAAA+BJREFUeNrMmVlsTGEUx+9cXZQiLZWKklhbQSSlSMUWSxAiJGJ5aSQehOiDF7yI4EFILW99I3iRSJGUPkiILSKp2OuJVtHWkrRVapn2jv+R/ycnn5l27rQz10l+mWlyl/+c833nO+c0FIlEnATMBbPAIn5OBuPAENAKToC74BtoB59AG/D9spBPgaPBdrAFjJH7Fa66TkRuNe8gP8Bb8Ap8j/eFaXFelwv286WZfKG2WL9SX5cFCuntBvAc/OoPD64HJ8EI5Q3tmW7whl4pAl/AUfAEDKZnQ1HuFXGPQGOiAsW7x8A26wUhirgMLnGtfe3hGcO5NApARpRnSchrY0UhlkAJxxmw0npYBzgOKinSj6WDCfRyphWFJnAPdMUjUH71WbDKElcDykGL0zcbCEroVf389+CW7Uk3ygNk/azghYIHDoCN/SDO4W6+A55aAiUrzImWz7StA2WWuF2gIpEc1ovVgQeWyELm06gCc8ARJU44DM45yTPZII8tkXO5DP4RuI8iPYqr4YmQbJN8+E4JlA1abAuUBbtZeU526O4khDWW3QdhK9TZWmAZd6/x3inw0UmdSZJ/pgSKlilGoMvTwoiTw/20k3p7yTyovRgScTNAvgrvFSbkVJuE+LU6GiXEefJHqfKefF5zgrMGVRnJZ4HEerryXjdzU1DWbB2BI10mRuPBej+1WhKsi8vLeDDXZRllwtvoBG8davNmS4gHUZyTQIWSrM1iQpyZptafo4QGabp9+JNmOijMY9MTtGWpEHe5PDHMGsz/DwQOUwI7XVYUZheP1ZVEAJbOFsGswTYR+EKF2NWVRABWwHPYeLDFZWKOKJFLAhRYpMQJjS7rsWYlcjlTT6pNOr5pahfL5m12KaparUPpZTcEILCEjjGniCy9iMk3F9hImzCXcZqQKhOnLFShjbBX/psQP4Aq5UUpdfZEGXEkKzGvZf4zu/exOdV0T1LJCZTx4gK2msm2Uq494z1pS29Ea5ra2RPrrm4HpwvJsplgtTW/kXq0M1ZffF2F2uMNe+nJUD+HVWaLm8AAtXNrOXTqcfQh2fwQmKdST4TTgAp6ui+WTWFTrUpedu15Fs29Do/kuDsIZlsiW7njryZQ2MrAaD5Yqko88+w6zoPCfsdv5VwjnnXayA67zYmUdGM/e0i+E7nWivnDPUWEz6iyPedngLkY7ARDrQeb72GOz5roVY/eylMHvxflXjkpLoKHfZ2wmhJIkvcylUi9BAnTa9U9DD59CzQm/csaZv0cn0JbOeK4ye/xbfcE/w0hYZvElnU8GEXBGRQjeewzi5B6rtP6RGY9vwUYACMHTam1T1ebAAAAAElFTkSuQmCC) no-repeat 0 0;
    background-size: contain;
    -webkit-animation: loading-keyframe 1s infinite linear;
            animation: loading-keyframe 1s infinite linear;
}
.fadeInUp .layer{
    -webkit-animation: fadeInUp .5s;
    animation: fadeInUp .5s;
}
.fadeOutDown .layer{
    -webkit-animation: fadeOutDown .5s!important;
    animation: fadeOutDown .5s!important;
}
@-webkit-keyframes loading-keyframe {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes loading-keyframe {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0,100%,0);
    }
    to {
        opacity: 1;
        -webkit-transform: none;
    }
}
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0,100%,0);
    }
    to {
        opacity: 1;
        transform: none;
    }
}
@-webkit-keyframes fadeOutDown {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
    }
}
@keyframes fadeOutDown {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
}
</style>
