<template>
    <div class='counter'>
        <div class='big start' v-if='step==1' @click='start'></div>
        <div class='big count' v-else>{{counter1}}</div>
    </div>
</template>
<script>
    import _ from 'lodash'
    import Vue from 'vue'
    import $ from 'jquery'
    export default {
        name:'counter',
        data(){
            return {
                step:1,
                counter:this.time*100,
                timer:null,
                gameId:null
            }
        },
        props: ['time','complete','reset','round','tid'],
        watch: {
            complete(newV,oldV){
                if(newV){
                    this.$emit('giveGrade',this.time*100-this.counter)
                    clearInterval(this.timer)
                    this.timer = null
                }
            },
            reset(newV,oldV){
                if(!newV){
                    this.counter = this.time*100
                    this.step = 1
                }
            }
        },
        methods: {
            start(){
                this.$emit('clickStart')
                this.step = 2
                var _self = this
                setTimeout( ()=>{
                    if(_self.timer){return}
                    _self.timer = setInterval( () => {
                        _self.counter -= 4;
                        if(_self.counter <= 0){
                            _self.counter = 0
                            clearInterval(_self.timer)
                            _self.timer = null
                            _self.$emit('timeout',_self.counter1)
                        }
                    },40)
                }, 1000);
            },
        },
        computed: {
            counter1(){
                var a = this.counter/100
                return ( a.toFixed(2))>=10? (a.toFixed(2)+'"'):('0'+a.toFixed(2)+'"')
        },
}
    }
</script>
<style lang='less' scoped>
@fontcolor:#742288;
.counter{
  .start{
    background:url('../../static/images/gameStart.png') no-repeat;
  }
  .count{
    background:url('../../static/images/wordplace.png') no-repeat;
  }
  .big{
    margin:0 auto;
    margin-top:.2rem;
    width:2.8rem;
    height:1.2rem;
    background-size:100% 100%;
    top:7.6rem;
    left:2rem;
    line-height: 1.4rem;
    // background-color: rgba(0,0,0,.3);
    color:@fontcolor;
    text-align: center;
    font-size:.6rem;
  }
}
</style>