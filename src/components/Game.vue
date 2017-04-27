<template>
    <div class='game'>
        <div class='gamebox'
        v-on:touchstart.prevent='touchmove($event)'
        >
            <transition-group name="cell" tag="div" class="container">
                <div 
                v-for='(img,key) in imgs1' 
                v-bind:key="img" 
                v-bind:style="{background:img+'no-repeat'}" 
                v-on:touchstart='touchstart($event,key)'
                v-on:touchend='touchend($event,key)'
                >
                </div>
            </transition-group>
        </div>
        <transition  enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutDown">>
            <div class='mask success' v-show='complete'>
                <div>
                    <div class='clickTo next' @click='next' v-show='!last'>
                    
                    </div>
                </div>
            </div>
        </transition>
        <transition  enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutDown">>
            <div class='mask fail' v-show='timeout'>
                <div>
                    <div class='clickTo again' @click='again'>
                    
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import _ from 'lodash'
    import Vue from 'vue'
    export default {
        name:'game',
        data(){
            return {
                imgs1:this.imgs,
                complete:false,
                gameBox:{
                    
                }
            }
        },
        props: ['imgs','clickstatus','timeout','successInfo','last'],
        methods: {
            next(){
                this.$emit('reset','next')
            },
            again(){
                this.$emit('reset','again')
                this.imgs1 = this.imgs
            },
            touchmove(e){
                // alert('default')
                e.preventDefault()
            },
            touchstart(e,index){
                var height = e.target.offsetParent.offsetHeight
                var width = e.target.offsetParent.offsetWidth
                var offsetLeft = e.target.offsetParent.getBoundingClientRect().left
                var offsetTop = e.target.offsetParent.getBoundingClientRect().top
                this.gameBox = {
                    height,
                    width,
                    offsetLeft,
                    offsetTop
                }
            },
            touchend(e,index){
                if(!this.clickstatus||this.timeout||this.complete) return
                var x = e.changedTouches[0].pageX - this.gameBox.offsetLeft
                var y = e.changedTouches[0].pageY - this.gameBox.offsetTop
                var j = (x/this.gameBox.width)<(1/3)?0:(x/this.gameBox.width)<(2/3)?1:2
                var i = (y/this.gameBox.height)<(1/3)?0:(y/this.gameBox.height)<(2/3)?1:2
                var arr =  this.imgs1.map( (value) => value )
                var a = this.imgs1[index]
                var b = this.imgs1[i*3+j]
                Vue.set(this.imgs1, index, b)
                Vue.set(this.imgs1, i*3+j, a)
                if(this.imgs1.filter( (value,index,arr) => value == this.imgs[index] ).length ==9){
                    this.$emit('complete')
                    setTimeout(()=>{this.complete = true},800)
                    if(this.last){
                        setTimeout(()=>{this.$emit('reset','finished')},2000)
                    }
                }
            },
            start(){
                this.imgs1= _.shuffle(this.imgs)
            },
        },
        watch:{
            clickstatus(newV,oldV){
                if(newV){
                    this.start()
                }
            },
            timeout(newV,oldV){
                if(newV){
                    console.log('时间到')
                }
            }
        }
    }
</script>
<style lang='less' scoped>
@fontcolor:#742288;
.game{
  .gamebox{
    margin:0 auto;
    margin-top:1rem;
    width:4.6rem;
    height:4.6rem;
    background:url('../../static/images/gameboxBac.jpg') no-repeat;
    background-size: 100% 100%;
    padding:.06rem;
    box-sizing:border-box;
    position: relative;
        div{
            
            width:100%;
            height:100%;
            div{
                box-sizing:border-box;
                position:relative;
                float: left;
                margin:0.018rem;
                width:1.45rem;
                height:1.46rem;
                background-size:100% 100% !important;
            }
        }
  }
  .mask{
      position:absolute;
      z-index:100;
      display:flex;
      align-items:center;
      justify-content: center;
      width:100%;
      height:100%;
      background-color:rgba(0,0,0,.5);
      top:0px;
      left:0px;
      bottom:0px;
      right:0px;
      color:#fff;
      text-align:center;
      h1{
          font-size:.7rem;
          margin:.2rem 0;
          letter-spacing:.1rem;
      }
      p{
          font-size:.36rem;
      }
      div{
          width:80%;
          height:70%;
          position:relative;
          .clickTo{
            margin: 0 auto;
            top:5.2rem;
            width:2rem;
            height:.76rem;
            
            line-height: 1.4rem;
            // background-color: rgba(0,0,0,.3);
            color:@fontcolor;
            text-align: center;
            font-size:.6rem;
        }
      }
      .next{
        background:url('../../static/images/nextGame.png') no-repeat;
        background-size:100% 100%;
      }
      .again{
        background:url('../../static/images/gameAgian.png') no-repeat;
        background-size:100% 100%;
      }
  }
  .fail{
      div{
        background:url('../../static/images/gameAgain.jpg') no-repeat;
        background-size:100% 100%;
      }
  }
}
.cell-move {
  transition: transform 600ms;
}
</style>