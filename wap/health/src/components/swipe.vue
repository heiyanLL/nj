<template>
        <div class="swipe" :ref="swipeOpts.name"  :id="swipeOpts.name" >
            <ul class="swipe-ul" autoexpo="true"> 
                <li v-for="(value,idx) in swipeData" :key="idx" class="lazybox">
                    <a :href="value.linkUrl">
                        <img v-if="idx==0" :src="value.picUrl">
                        <img v-if="idx!=0" :data-src2="value.picUrl">
                    </a>
                </li>
            </ul>
            <ul class="trigger" :ref="swipeOpts.name+'Trigger'" v-show="swipeData.length>1">
                <li   class="cur" ></li>
                <li   v-for="(value,idx) in swipeData" v-if="idx!=0" :key="idx"></li>
            </ul>
        </div>
</template>

<script>

export default {
    name: 'swipe',
    props: ['swipeData','swipeOpts'],
	components: {
		
	},
	data() {
		return{

        }
	},
	watch: {
		
	},
	created () {
		
	},
	mounted () {
        let _this=this
		setTimeout(function(){
            if(_this.swipeData.length>1){
                _this.swipe(_this.swipeOpts.name,_this.swipeOpts.auto);
            }
			
		},0)
	},
	methods: {
		swipe(el,auto) {
                let _this=this
                let lis= _this.$refs[el+"Trigger"].querySelectorAll("li")
                new Wap.Swipe( ("#"+el), {
                    speed: 400,
                    auto: auto?5000:false,
                    callback: function (idx, elem, a) {
                        let _img = elem.querySelector('img');
                        _img.getAttribute('data-src2') && (_img.src = _img.getAttribute('data-src2'))&&_img.removeAttribute('data-src2');
                        for(let ele of lis){
                           ele.classList.remove("cur")
                        }
                         if(idx>lis.length-1){
                            idx=idx-lis.length
                        }
                        lis[idx].classList.add("cur")

                    }
                }); 
			}
	}
}
</script>

<style>
/*轮播*/
.banner {
    width: 14.04rem;
    height: 4rem;
    margin-top:0.48rem;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    
}
.banner .swipe {
    position: relative;
    overflow: hidden;
    width: 14.04rem;
    height: 4rem;
}

.banner .swipe img {
    width: 100%;
}

.banner .swipe .swipe-ul {
    margin: 0;
    overflow: hidden;
}

.banner .swipe li img {
    width:100%;
    height: 4rem;
    display:block;
    position: absolute;
    bottom: 0;
    left: 0
}
.banner .swipe-ul li {
    position: relative;
    float: left;
    overflow: hidden;
}

.banner .swipe li a {
    width:100%;
    height:4rem;
    font-size:0;
    display: block;
    border-radius:0.48rem;
    overflow:hidden;
    position: relative;
}

.banner .swipe .trigger {
    position: absolute;
    bottom: 0.24rem;
    text-align: center;
    font-size: 0;
    left: 0;
    width: 100%;
}
.banner .swipe .trigger li {
    opacity:0.3;
    display: inline-block;
    margin-right: 0.08rem;
    width: .110rem;
    height: .12rem;
    border-radius: 0.06rem;
    -webkit-border-radius: 0.06rem;
    background-color: #fff;
}
.banner .swipe .trigger li.cur {
    opacity:1;
    background: #fff;
    width: .24rem!important;
}

/*轮播*/

</style>
