<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App',
		created() {
			// this.utils.rem()
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
    // background: #f2f2f2
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
    // background:#F2F2F2;
}
.desctip{
    padding-left:0.48rem;
    color:#4873DD;
    margin-top: -0.48rem;
    display: block;
    margin-bottom:0.24rem;
}
.twotips{
    width:14.04rem;
    margin: -0.3rem auto 0.24rem;
    color:#969696;
    a{
        display:inline;
        color:#4873DD;
    }
    .desctip{
        padding:0;
    }
}
.upfile{
    overflow:hidden;
    padding-bottom:0.24rem;
    padding-top:0.4rem;
    margin-top:-0.4rem;
    .operation-div{
        padding-left:0.48rem;
        .img-wrap{
            position:relative;
            width:4.6rem;
            height:3.16rem;
            margin-left:0.24rem;
            display: inline-block;
            img{
                width:4.6rem;
                height:3.16rem;
            }
            .close{
                position:absolute;
                top:-0.4rem;
                right:-0.4rem;
                width:0.8rem;
                height:0.8rem;
                background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAE4UlEQVRoQ+1ZXWgcVRT+zmzWXRo0bEsTUOxDJEYIQTHQpBDoWsQaNLHp7N2laAWtFnwRfPIPJdKiPqoPPpRS85idu7ukiaCBUGwMlWhrNUr8AVsNCmoqQQ111mb3yCQzzSSZ2ZnZXbZZcN6We86533fPuWfPOZdQ5x/VOX78T8D0IKmq2klE+0hRepk5TkQ7jDVm/hvAPBH9xMA8A98ozFNSyi+N5UojoCIPCCF2ATgCoqcA3BoIDPMvAIavhUInR0dGfgykaxMui4AQoouBl4joAACl3M1NvSIzTxBwTEr5SVBbgQg8cPhw4y35/DtgfoKIAun6AsY8nM/nnx0bGzPCztfnG8RgKnVnqFh8n4jafFkuV4j5MoCHpZRzfkz4IqCq6l2KokyBaKcfo1WQWQTzXinlV162PAkcSKXuaCgWzxFRs5exaq4z8x/LitI9mk7/UMpuSQJCCOPEz4PIyDa1/5jnAXRLKX9129yVQNfRo+HWxcVpEO2uPXLbjsyfXorFei+cOHHNCYcrASHEGyB64YaCNzdn4K2Mpj3nm4AQoh1ExgUKbwUCYC4Ui8V7s9ns7EY8jh5ICDFKRI+UAs/ACDE/9mc0Gm3S9QyIHgxIdnIpHFY/aGtbSszNvUfA4yX1mT+UUvZ5EhhMpe5uYP7CEwxzq5TSyNkQQtwEojEA+z31DAHmMwuNjQ99NDysGz8HBwebG8Lh37x0i4VCTzabnbHLbfKAEOJdED3jw5jh0ouWnG8SG8CbB9AJok3hsREDA6cymnbElUA8Hm/Y2dz8O4CYFwFmPk/AfVLKJd8kHMD39/dvi0ajkyDa47UnmI29dkgp/7Vk13lACLEHROc8DVnZgXmGgPt9kXAHPwGiXr97gjkupTzrRuBlEB33bWy13vcmUS3wqw3EsYymvepIIJFMagSIIARW7yTP5HV93/j4+NVN4cQctl9YY90Mm2Anv+b10xkpjTJ+5dsYQrMg6gxKYEWeeVrX9f12En19fZF/WlrIyjaVgjdxfS81rd2ZQDJpdEnBOis7WwcS9uVKTt5m54rUtOtV8ToPJIT4i4huLssDlpILiSqBN8I1n5Ey6nwHqkDA6VJXKXTMSC1BQCSTRtnaUq4H3MBb9qrkhUWpadurfond0ulCY6NSs0tcSRp1/UOrZRpNJBIvkqK8HiSEbsAf2WsZTRtyDKGDqVRPiNn3bMYX+LXstK4CLfdiF4C9OU2bcrsDIRAtbOVi7lIstt3eXpZdTheIdufS6c82lQ5ePQHzGQB99opSVdUOJRT62it0GTiZ0bSn7XJOBO4B0fU6381oYXn59lwu97Ox7rsXWDM2AeYBi8TAoUMtkULBdfJgqRWIunLp9OclCZiAToNooOSJMKcBPJrP57dFolHpuxtbMzqZ1/WDkUjkKhOdqlpLadhXVbVVCYW+3UpNPYAOKeV3Gw/VdaySSCbfJOB5r7isxXrgsYoZRkZGmgbQUwuQbnsw88XLsVh34MGWSaJ+R4vWidT1cNciUdfjdYtEXT9wWCSMJ6YmXX+bgSfr7onJniXMR75XiKi/Wo98YD6eyWR8z6Qci7mg6bJun1kdiK48dCMUihPQTsytAG4DsAtETab8FTB/DMCYqp2VHR2zGBoqBj003//ElRqulb7nI1+tgJS7T90T+A/eQ6pP8IkC3wAAAABJRU5ErkJggg==) no-repeat;
                background-size:0.8rem;
            }
        }
        float:left;
    }
    .file-wrap{
        float:left;
        width:4.6rem;
        height:3.16rem;
        margin-left:0.48rem;
        border-radius:0.24rem;
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABACAYAAABFqxrgAAACF0lEQVR4Xu2csUtVYRjGf086NDSINbQYQovYYELQEuSWg5NDKPQXCElbIRFIiLQUFdLQFC6JOLU2JIEIDQVC6KDNQSENDQ3xyte9Xm7qPU3nO4fbc/6A73nfH+/7fN/53nOvqOCJiNPAY2AcOA/sAS8lPa0gHJRbtAlgAxg9QfuRpHu5Y6oCwgIw1yHR38AlSTs5QVQBYRO4WpDkA0kPux3CN+BsQZKvJU13O4R9oK8gyVVJNw3BEHAlgCEkK3AlGEJjS3AlGIIroXU8cju4HdwObof29yV7gj3BnmBPsCccuUWyMVZqjBFxARgDBoFTJd7x3QXS8KXT8zmBKFH/F5A03kr6mXT+XLlHxCTwCjhTonjdlt4FJiRtKyIuAx+A3rpFmSGeL8BwgrAM3MogWFeJGwnCJ2CkrhFmiGsmQXgHXM8gVleJ6QThCXCnrhGWHFcAQwnCOWCr+Z1AyZq1W35R0tzhFnkRWPuPvOErMC/pReuc0DwrJCADGQ5Lb/5xHkkeNV9izfyQ9LF9/Sq+T/BUOiIMwRAa7ymuBENwJTQ2JVeCIbgSWgc0t4Pbwe3gdmh/Y7Mn2BPsCfYEe8KRezIbo43RxmhjtDHaGI+PUCLiO9BfMFxZkTRV4vDl2NJVDF/eA9cKklyQdL/bIdwGnhUkOSZpvdsh9ADpp8JXTkj0uaTZnAD+GsjmFO7w1wFLh1PinLEkrQNg4Ul2dg7zqAAAAABJRU5ErkJggg==) no-repeat #DDD;
        background-size: 1rem;
        background-position:1.8rem;
        input{
            width:4.6rem;
            height:3.16rem;
            opacity:0;
        }
    }
    .shebaoka{
        width:4.84rem;
        height:3.44rem;
        background:url('assets/shebaoka.png') no-repeat 0 0;
        background-size:4.84rem 3.44rem;
    }
}
.question-bar{
    position:relative;
    width:100%;
    background:#FFF;
    .attr{
        height:1.8rem;
        line-height:1.8rem;
        margin-left:0.6rem;
        font-size:0.48rem;
        color:#323232;
        border-bottom:1px solid #F3F3F3;
        em{ 
            color:#FF4400
        }
        .a1{
            color:#999;
        }
        span{
            color:#969696;
        }
    }
    
    .answer-list{
        position:absolute;
        right:0;
        top:0;
        width:8rem;
        height:1.8rem;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 1.3rem;
        font-size:0.48rem;
        text-align:right;
        line-height:1.8rem;
        color:#646464;
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
        border-color: #646464;
        border-width: .03rem 0 0 .03rem;
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
        font-size:0.48rem;
        text-align:right;
        color:#646464;
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
        margin-left:0.48rem;
        .round{
            display: inline-block;
            width:0.4rem;
            height:0.4rem;
            border-radius:0.4rem;
            margin-right:0.12rem;
            vertical-align:0;
            border:1px solid #DDD;
            background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC+UlEQVR4Xu2ZO2sVQRiGn9dbJYiFYCEoYmFjY+MfEBRvEFCMiBamMpVplFTGLp2pTKOkEEVERRCxEMQb6r8Qf4CdIOLlkw82sCybmd2zu+eyZ6adnTnzPt/7zuzOEVPeNOX6SQCSA6acQIrAlBsgbYIpAikCU04gRWDKDZBOgRSBFIGeETCzOeA68Au4IelVSGKvImBm14DbOcFfgQOS/m0EoTcASsS75m/A/t4DMLOrwJ2SKl+Q9KjXEQiIn5e0GtviJjoCTcU7nIkF0Ib4iQUQEL8gaSVm+3z/xDnAzK4A90pE1hY/cQ7IxN8tie5A4icKQED8oqTlOravHQEzmwG2Sno86A81GdeV+EoOMLMl4GYm4DlwTtKfJoLqjA2IX5J0q85cZc8GN0Ez2wZ8B7bnBr8EZiT9bvrjsfFmdhG4X5L5ZUmLsfFV+qOngJm9AE4VJnsNnOwSwjDEV43ALuA9cHBYEALiVyQtVKls1WeiDvCJzMwhfPJPy64hDFN8JQesCzaz3cCHDSCcluQXEI2amZ0F/KQpFqb1yq8vtJIDChC+AHsLSt8Cx5tAyMT7p+vmwtydia/lgByEPcDHNiEExK9Kmm9kq8jgWg4oQPgMOIx8q+2EUYofyAE5CPuyPaEMwglJP2OVG7X4RgCy08EhuBN8g8w3PzGOhiCY2RngWUnm1yT5F99Q2kARyK/MzPxo9NOhMoRM/FNgS0HlGjAnyYaivq0boQyCV93fF4JOGCfxjSNQcIK/KfobYxmEY5J+BMQ/AC4Ns/Lra28cgRII7oSdBSf4HxS+V8wCmwp9Lv5y6O6+yzi0CiDbGA8B70oglOkYqfhWI1BwgkPwjXFHoHpPgPOjqnwnEShAOAy82QCCi5+V9LdLe1eZu/UIlEDwOOQvVMZGfGcRKEA4Avilip8OD7MNb+SV7zwCVew3Ds90GoFxEBhbQwIQI9T3/uSAvlc4pi85IEao7/3JAX2vcExfckCMUN/7kwP6XuGYvuSAGKG+9/8H4Q8GULhMsDMAAAAASUVORK5CYII=) no-repeat;
            background-size:0.3rem;
            background-position: 0.05rem;
        }
        .round.cur{
            background-color:#4873DD;
            border:none;
        }
    }
    .three{
        width:9rem!important;
        .radio-btn{
            margin-left:0.24rem;
            
        }
    }
}
.bottom-none{
    border-bottom:none!important;
}
.border-1px{
    border-top:1px solid #F3F3F3;
}
.mt24{
    margin-bottom:0.24rem;
}
.mb24{
    margin-top:0.24rem;
}
.next-step{
    width:13rem;
    height:1.5rem;
    margin:0.48rem auto 0;
    background:#DDD;
    color:#FFF;
    line-height:1.5rem;
    text-align:center;
    font-size:0.56rem;
    border-radius:1.8rem;
}
.next-step.cur{
    background:#4873DD;
}
.pophvm{
    display:flex;
    justify-content:center;
    flex-direction: column;
}

.toptitle{
    // width:14.04rem;
    padding:0 0.48rem;
    height:1.5rem;
    background:#FFF;
    line-height:1.5rem;
    color:#333;
    font-weight:700;
    font-size:0.56rem;
}
.ifself{
    background:#FFF;
    a{
        display:block;
        padding-left:0.48rem;
        position:relative;
        height:1.8rem;
        line-height:1.8rem;
        font-size:0.6rem;
    }
    a:before{
        content: "";
        position: absolute;
        top: .6rem;
        right: 0.48rem;
        display: inline-block;
        width: .4rem;
        height: .4rem;
        border-style: solid;
        border-color: #646464;
        border-width: .05rem 0 0 .05rem;
        -webkit-transform: rotate(135deg);
    }
    a:last-child{
        border-top:1px solid #DDD;
    }
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
        padding:0.8rem 0.48rem;
        background:#FFF;
        overflow-y:scroll;
        .title{
            font-weight:bold;
            text-align: center;
            font-size: 0.6rem;
        }
        .main{
            color:#666;
            font-size: 0.56rem;
            margin-top: 0.6rem;
            padding-bottom:0.48rem;
        }
        .checkbox{
            width:15rem;
            padding: 0.48rem 0.48rem 1rem;
            margin-left:-0.48rem;
            border-top:1px solid #DDD;
            color:#999;
            font-size:0.48rem;
            .round{
                display:inline-block;
                width:0.5rem;
                height:0.5rem;
                border-radius:0.12rem;
                border:1px solid #999;
                vertical-align: -0.05rem;
                margin-right:0.12rem;
            }
            .round.cur{
                border:1px solid #4873DD;
                background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC+UlEQVR4Xu2ZO2sVQRiGn9dbJYiFYCEoYmFjY+MfEBRvEFCMiBamMpVplFTGLp2pTKOkEEVERRCxEMQb6r8Qf4CdIOLlkw82sCybmd2zu+eyZ6adnTnzPt/7zuzOEVPeNOX6SQCSA6acQIrAlBsgbYIpAikCU04gRWDKDZBOgRSBFIGeETCzOeA68Au4IelVSGKvImBm14DbOcFfgQOS/m0EoTcASsS75m/A/t4DMLOrwJ2SKl+Q9KjXEQiIn5e0GtviJjoCTcU7nIkF0Ib4iQUQEL8gaSVm+3z/xDnAzK4A90pE1hY/cQ7IxN8tie5A4icKQED8oqTlOravHQEzmwG2Sno86A81GdeV+EoOMLMl4GYm4DlwTtKfJoLqjA2IX5J0q85cZc8GN0Ez2wZ8B7bnBr8EZiT9bvrjsfFmdhG4X5L5ZUmLsfFV+qOngJm9AE4VJnsNnOwSwjDEV43ALuA9cHBYEALiVyQtVKls1WeiDvCJzMwhfPJPy64hDFN8JQesCzaz3cCHDSCcluQXEI2amZ0F/KQpFqb1yq8vtJIDChC+AHsLSt8Cx5tAyMT7p+vmwtydia/lgByEPcDHNiEExK9Kmm9kq8jgWg4oQPgMOIx8q+2EUYofyAE5CPuyPaEMwglJP2OVG7X4RgCy08EhuBN8g8w3PzGOhiCY2RngWUnm1yT5F99Q2kARyK/MzPxo9NOhMoRM/FNgS0HlGjAnyYaivq0boQyCV93fF4JOGCfxjSNQcIK/KfobYxmEY5J+BMQ/AC4Ns/Lra28cgRII7oSdBSf4HxS+V8wCmwp9Lv5y6O6+yzi0CiDbGA8B70oglOkYqfhWI1BwgkPwjXFHoHpPgPOjqnwnEShAOAy82QCCi5+V9LdLe1eZu/UIlEDwOOQvVMZGfGcRKEA4Avilip8OD7MNb+SV7zwCVew3Ds90GoFxEBhbQwIQI9T3/uSAvlc4pi85IEao7/3JAX2vcExfckCMUN/7kwP6XuGYvuSAGKG+9/8H4Q8GULhMsDMAAAAASUVORK5CYII=) no-repeat #4873DD;
                background-size:0.6rem;
                background-position:-0.1rem -0.1rem;
            }
        }
        .btn{
            overflow:hidden;
            text-align: center;
            a{
                width:4.3rem;
                height:1.5rem;
                border-radius:1rem;
                border:1px solid #DDD;
                display:inline-block;
                text-align: center;
                font-size:0.56rem;
                line-height:1.5rem;
                color:#666;
            }
            a:last-child{
                margin-left:1rem;
                background:#999;
                color:#FFF;
            }
            a:last-child.cur{
                background:#4873DD;
                border:none;
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
            border-bottom:1px solid #D8DFE3;
        }
        .btn-wrap{
            overflow:hidden;
            .btn{
                height:1.6rem;
                font-size:0.48rem;
                width:50%;
                float:left;
                text-align:center;
                line-height:1.6rem;
            }
        }
        .alert-btn1{
            color: #333;
            border-right:1px solid #D8DFE3;
        }
        .alert-btn2{
            color: #4873DD;
        }
    }
}
.step-list{
    overflow:hidden;
    line-height:2rem;
    height:2.24rem;
    // width:14.04rem;
    padding:0 0.48rem;
    background:#FFF;
    margin: -0.48rem auto 0;
    border-bottom:0.24rem solid #F3F3F3;
    .step{
        float:left;
        color:#969696;
        font-size:0.48rem;
        em{
            display:inline-block;
            width:0.52rem;
            height:0.52rem;
            border-radius:0.52rem;
            vertical-align:0.1rem;
            margin-right:0.12rem;
            font-size:0.32rem;
            line-height:0.52rem;
            background:#D9D9D9;
            text-align:center;
            color:#FFF;
        }
    }
    .step.cur{
        color:#323232;
        em{
            background:#4873DD;
        }
    }
    span{
        display:block;
        float:left;
        margin:0.8rem 0.4rem;
        width: .3rem;
        height: .3rem;
        border-style: solid;
        border-color: #d9d9d9;
        border-width: .03rem 0 0 .03rem;
        -webkit-transform: rotateZ(135deg);
    }
}
.pay-method{
    position: absolute;
    right: 1.2rem;
    top: 0.4rem;
    overflow:hidden;
    padding-bottom:0.48rem;
    .method{
        border:1px solid #D8DFE3;
        float:left;
        width:3.3rem;
        height:0.96rem;
        margin-right:1.2rem;
        border-radius:0.12rem;
        line-height:0.9rem;
        font-size:0.48rem;
        color:#323232;
        text-indent: 1.2rem;
    }
    .shebao{
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAA4CAYAAABXJB78AAAAAXNSR0IArs4c6QAAA01JREFUeAHtnM9rE1EQx2febmpDk9pCtCoI9qpSta1SBOlBT3oqKLX0Um/e/Gc8qHgQij8woCBWENSLWKFK7FFQhFqUqgjapEnbJDvObo3NpsG88RDT7oTA7nvv+yYzn8zbzb59G4SaVzZzbj+Sd8bzoA+AUojg1Ei2dBEBix7AN0KcBcCH2wfS76sDxkqB3o135n4UrhLQ+Upd1LeI6AHB9USq8xL23lj2eQTA6M1EV660+JxhHYw6pPrx43Ryl3MK96YLxhdkyz8nFVZ9VGu1dDy7ULrs72Muc/akVy4/+Ztc2xgU8uAk6HMZ1oQCaUyACJDQGTWM7kRjuSp8Aoa8IcNH/d2Kw5IAUo8hojZLucoAY8FZUknYE1Bg9qwCpQITAnMXvy8Iu0RXboy7wy0sZaNLQBi568YSOiSF0BSYAhMSEMo1wxSYkIBQrhkmBOY6rivsEl05syq5qT290SUgjJzn+Od1SAqhKTAFJiQglGuGKTAhAaFclGFUtLBeYg011lnZamym6QqrH2G0RJC/RuB9BnAPI8TH/6wwCDlcfAGw/MADbAeIXzDg7As1BwVaAshf8cDjabhYP0D7mOg722iwyTVW3hYzGMDyfSvNEpQ/1vdy5REv4+A35QFWn9ZPs+IMg/89Z1nMAJQ/1bfVqrVWwCgfDr62HATng1pdD5MK6/vVexvqa2xXa1tx3wpYKzr+v3xSYELyCkyBCQkI5ZphCkxIQCjXDFNgQgJCuWaYAhMSEMo1wxSYkIBQ/m8Zxmuwo/qyAma6w3hMV7gclNgSJtfrsTs8w1FpqbWF3ZsLvtUEYmwAoTzHc1dzBLGjCKanEn54Gx9DWJniBe0dCNtOh9sqJb9/eZ7n1OZ5AvEY20pVWjbHFhdfjdRPhc3hf1O95Bu5b62GZFO9avEPM0zN5tZGi4fRJPeISgaIdFWwPe8v/rlt2l4fbSU/nDVj+GGjyWhjsI/eOHjXdAzem+Lj2DP7btFUMqObiSPp2bWzZIzGeGh+iCaKxlEzrEwi7lz0lQGw5KH7X9FxhrjhcePu0VLwVeBthjWMB9I5P/IN1yXZzMiw55lRJBrk1p0ssLoa2CoY+TnlIv8VwwInz8s2jN1q67/zujq2X96szDABMVCyAAAAAElFTkSuQmCC) no-repeat;
        background-size:0.76rem 0.52rem;
        background-position: 0.2rem;
    }
    .yinhang{
        background:url(data:image/png;base64,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) no-repeat;
        background-size:0.76rem 0.52rem;
        background-position: 0.2rem;
    }
    .cur{
        color:#4873DD;
        border:1px solid #4873DD;
        background-color:rgba(72,115,221,0.17);
    }
}
.placeholder{
    height:1.6rem;
    width:100%;
}
.tab-list-wrap{
    width:15rem;
    height:1.6rem;
    background:#FFF;
    position:fixed;
    top:0;
    left:0;
    z-index:999;
}
.tab-list{
    width:14.04rem;
    margin:0 auto;
    overflow:hidden;
    height:1.6rem;
    border-bottom:1px solid #F3F3F3;
    .item{
        width:33.3%;
        float:left;
        text-align:center;
        line-height:1.6rem;
        font-size:0.56rem;
        color:#333;
        span{
            height:1.55rem;
            display:inline-block;
            padding:0 0.24rem;
            border-bottom:0.05rem solid #FFF;
        }
    }
    .item.cur{
        color:#4873DD;
        span{
            border-bottom:0.05rem solid #4873DD;
        }
    }
    
} 
.fixbanner-wrap{
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    background: rgba(0, 0, 0, 0.1);
    height: 100%;
}
.fixbanner{
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    width:15rem;
    height:auto;
}
.loagMask2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    background: rgba(0,0,0,.28)
}
.mask-loading.fixedLoading {
    margin: -0.6rem 0 0 -0.6rem
}
.mask-loading.fixedLoading {
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -.36rem 0 0 -.36rem;
    z-index: 9999
}

.mask-loading {
    width: 1.2rem;
    height: 1.2rem;
    position: relative;
    margin: 0 auto;
    background: rgba(0,0,0,.3);
    border-radius: .2rem;
    z-index: 1000
}

.mask-loading:after {
    content:'';
    width: .72rem;
    -webkit-animation: rotate .7s infinite;
    -webkit-animation-timing-function: linear;
    position: absolute;
    height: .72rem;
    background: url(data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAAG5wVGOkIJ/OAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURQAAAP///////////////////////////////+tNPsIAAAAJdFJOUwD+ELHdi00wbfD3fpAAAADbSURBVCjPY2CgDLBnBBtHFCCLsIWGGgNBE5Ka1tBgoIiJcwJcqKI1NF2BqcLExQOuraMDbAybiUsAVKisA6pB1cUVwmBKS4epb3GBSLKnwW1ndXEC0+rlcHuYoBaUFyGckygClilHcjWLIMgwJiUFhBCHYABYCNlnggboQkyCDiBSATkABAUwQglTCKIRBUCMRwGsggHoQhCnooBEQQzTHUXRhZgFhdCFAlGMUgZhQWR97I4gR6G4qlGQKdURRZGyIBggm2QIFgliQFPliubwRkHM1OSImcKU4SwAH1UgWePsA0wAAAAASUVORK5CYII=);
    background-size: .72rem;
    top: 50%;
    left: 50%;
    margin: -.36rem 0 0 -.36rem
}
@-webkit-keyframes rotate {
    0% {
        -webkit-transform: rotate(0)
    }

    100% {
        -webkit-transform: rotate(360deg)
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
    color:#666;
}
.ios-select-widget-box header.iosselect-header a.sure {
    float: right;
    padding-right: 15px;
    height: 44px;
    line-height: 44px;
    color:#4873DD;
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
