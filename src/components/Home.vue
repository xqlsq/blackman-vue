<template>
  <div id='app'>
    <transition  enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">>
    <div key='1' v-if="showPage==1" class="home">
      <div class='starGame' @click="startgame"></div>
      <div class='bit' @click="gotoRank"></div>
      <div class='rule bit' @click='showRule=true'></div>
      <transition enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutDown">
        <div v-show='showRule' class='mask'>
            <div class='ruleDetail'>
                <div class='ruleClose' @click='showRule=false'></div>
                <div class='content'>
                  <h3>活动时间</h3>
                  <div>XX年XX月XX日-XX日</div> 
                  <h3>参与方式</h3>
                  <div>每个用户有一次机会挑战<br/>分享给好友可额外增加一次</div> 
                  <h3>参与次数</h3>
                  <div>每个用户有一次机会挑战<br/>分享给好友可额外增加一次</div>
                  <h3>奖项设置</h3>
                  <div>挑战游戏前十名用户可获得XX<br/>挑战游戏前50名中随机抽取用户XX名获得XX</div> 
                </div>
            </div>  
        </div>
      </transition>
      <transition  enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutDown">>
        <div v-show='showNochance' class='mask nochance'>
            <div>
              <div class='ruleClose' @click='showNochance=false'></div>
            </div>
        </div>
      </transition>
    </div>
    <div key='2' v-else-if="showPage==2" class='rank' :class='{normal:!submitTempStatus}'>
      <div class='again' v-if='submitTempStatus'></div>
      <div class='rankHead'></div>
      <p><span>排名</span><span>总时间</span><span>昵称</span></p>
        <div class='container'>
          
          <ul>
            <li v-for="list in rankData">
              <span>{{list.rank}}</span><span>{{parseFloat(list.time).toFixed(2)+'"'}}</span><span>{{list.nickname}}</span>
            </li>
          </ul>
        </div>
        <p>
          排行榜仅限时成绩<br>前50名
        </p>
        <div class='goHome' @click="rankTohome"></div>
    </div>
    <div key='3' v-else-if="showPage==3" class='game1'>
      &nbsp;
      <Game v-bind:imgs='game1.Imgs' :clickstatus='clickstart' :timeout='timeout' @complete='complete=true' @reset='reset' round='1'  key='game1'></Game>
      <counter v-bind:time='game1.time' @getTid='getTid' @clickStart='clickstart=true' @timeout='timeout=true' :complete='complete' :reset='clickstart' round='1' :tid='tid'  key='game1' @giveGrade='getGrade'/>
      <div class='gamerule'></div>
    </div>
    <div key='4' v-else-if="showPage==4" class='game2'>
      &nbsp;
      <Game v-bind:imgs='game2.Imgs' :clickstatus='clickstart' :timeout='timeout' @complete='complete=true' @reset='reset'  key='game2' round='2'></Game>
      <counter v-bind:time='game2.time' :tid='tid' @clickStart='clickstart=true' @timeout='timeout=true' :complete='complete' :reset='clickstart'  key='game2' round='2'  @giveGrade='getGrade'/>
      <div class='gamerule'></div>
    </div>
    <div key='5' v-else-if="showPage==5" class='game3'>
      &nbsp;
      <Game v-bind:imgs='game3.Imgs' :clickstatus='clickstart' :timeout='timeout' @complete='complete=true' @reset='reset' key='game3' round='3' :last='true'></Game>
      <counter :tid='tid' v-bind:time='game3.time' @getRank='getRank' @clickStart='clickstart=true' @timeout='timeout=true' :complete='complete' :reset='clickstart'  key='game3' round='3'  @giveGrade='getGrade'/>
      <div class='gamerule'></div>
    </div>
    <div key='6' v-else-if="showPage==6" class='subForm'>
      <div class='grade'></div>
      <p>共闯过3关，用时{{((grade[0]+grade[1]+grade[2])/100).toFixed(2)+'"'}}秒，排名{{ranknum}} </p>
      <div>
        <label>姓&nbsp;&nbsp;&nbsp;&nbsp;名：<input type='text' v-model='username'/></label>
      </div>
      <div>
        <label>手机号：<input type='number'  v-model='phone'/></label>
      </div>
      <div>
        <label>地&nbsp;&nbsp;&nbsp;&nbsp;址：<input type='text'  v-model='address'/></label>
      </div>
      <p class='info'>填写完整的信息才有<br/>机会获得礼品呦</p>
      <span @click='submit'></span>
    </div>
    </transition>
  </div>
</template>

<script>
import Game from './Game'
import counter from './Counter'
import $ from 'jquery'
export default {
  name: 'home',
  components: {
   		Game,
      counter
  },
  methods: {
    getRank(num){
      this.ranknum = num
    },
    getTid(id){
      this.tid = id
    },
    rankTohome(){
      this.showPage = 1
      this.submitTempStatus = false
    },
    startgame(){
      this.showPage=3
    },
    gotoRank(){
      this.showPage=2
      this.rankData = [
        {
          rank:1,
          nickname:'徐博',
          time:20
        },{
          rank:2,
          nickname:'徐小博',
          time:17.90
        },{
          rank:3,
          nickname:'小博',
          time:16.56
        }
      ]
    },
    getGrade(a){
      console.log(a)
      this.grade.push(a)
    },
    submit(){
      var reg = /^(((\+86|0086)?\s*1[34578]\d{9})|(\s*(0\d{2,3}-?)?\s*\d{7,8}))$/;
      if(!this.username){
        alert('请填写用户名')
        return
      }else if(!this.phone){
        alert('请填写手机号')
        return
      }else if(!reg.test(this.phone)){
        alert('手机号格式错误')
        return
      }else if(!this.address){
        alert('请填写地址')
        return
      }
      this.submitTempStatus = true
      this.gotoRank()
    },
    reset(a){
      if(a == 'next'|| a == 'finished'){
        this.showPage +=1
        console.log(this.showPage)
      }
      this.complete = false
      this.clickstart = false
      this.timeout = false
    }
  },
  data () {
    return {
      ranknum:null,
      tid:null,
      rankData:[],
      submitTempStatus:false,
      canStart:true,
      showNochance:false,
      showPage: 1,
      username:'',
      phone:undefined,
      address:'',
      showRule: false,
      clickstart:false,
      timeout:false,
      complete:false,
      grade:[],
      lists:[
        {
          serial:1,
          user:'朱xx',
          grade:'20.00"'
        },
      ],
      game1: {
        Imgs:[
          'url(./static/images/game1s1.jpg)',
          'url(./static/images/game1s2.jpg)',
          'url(./static/images/game1s3.jpg)',
          'url(./static/images/game1s4.jpg)',
          'url(./static/images/game1s5.jpg)',
          'url(./static/images/game1s6.jpg)',
          'url(./static/images/game1s7.jpg)',
          'url(./static/images/game1s8.jpg)',
          'url(./static/images/game1s9.jpg)'
        ],
        time:25
      },
      game2: {
        Imgs:[
          'url(./static/images/game2s1.jpg)',
          'url(./static/images/game2s2.jpg)',
          'url(./static/images/game2s3.jpg)',
          'url(./static/images/game2s4.jpg)',
          'url(./static/images/game2s5.jpg)',
          'url(./static/images/game2s6.jpg)',
          'url(./static/images/game2s7.jpg)',
          'url(./static/images/game2s8.jpg)',
          'url(./static/images/game2s9.jpg)'
        ],
        time:20
      },
      game3: {
        Imgs:[
          'url(./static/images/game3s1.jpg)',
          'url(./static/images/game3s2.jpg)',
          'url(./static/images/game3s3.jpg)',
          'url(./static/images/game3s4.jpg)',
          'url(./static/images/game3s5.jpg)',
          'url(./static/images/game3s6.jpg)',
          'url(./static/images/game3s7.jpg)',
          'url(./static/images/game3s8.jpg)',
          'url(./static/images/game3s9.jpg)'
        ],
        time:15
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@fontcolor:#742288;
html,#app,body,.home,.rank,.mask,.game1,.game2,.game3,.subForm{
  font-family: "黑体";
  width:100%;
  height:100%;
  margin:0rem;
  padding:0rem;
  box-sizing:border-box;
}
.home{
  background:url('../../static/images/homeBac.jpg') no-repeat;
  background-size:100% 100%;
  padding-top:8rem;
  .nochance{
    >div{
      position:relative;
      width:80%;
      height:70%;
      background:url('../../static/images/noChance.jpg') no-repeat;
      background-size:100% 100%;
    }
  }
  .starGame{
    margin: 0 auto;
    animation: pulse 1s infinite;
    width: 2.3rem;
    height: .8rem;
    background:url('../../static/images/homeStart.png') no-repeat;
    background-size:100% 100%;
  }
}
.home .bit{
  position:absolute;
  width:1.1rem;
  border-bottom-left-radius:0.3rem;
  border-top-left-radius:0.3rem;
  background:url('../../static/images/homeRank.png') no-repeat;
  background-size:100% 100%;
  height:0.36rem;
  // background-color: rgba(0,0,0,.8);
  right: 0rem;
  top:3.6rem;
}
.home .rule.bit{
  top:4.12rem;
  background:url('../../static/images/homeRule.png') no-repeat;
  background-size:100% 100%;
}
.home .mask{
  background-color:rgba(0,0,0,.8);
  display: flex;
  align-items:center;
  justify-content: center;
  position: fixed;
  top:0px;
  left:0px;
  z-index:100;
}
.home .ruleDetail{
  width:70%;
  height:67%;
  background:url('../../static/images/rule.jpg') no-repeat;
  background-size:100% 100%;
  position:relative;
  text-align: center;
}
.home .ruleClose{
  position: absolute;
  top:.16rem;
  right:.16rem;
  width:.4rem;
  height:.4rem;
  background:url('../../static/images/ruleClose.png') no-repeat;
  background-size:100% 100%;
}
.home .ruleDetail h3{
  font-size:.28rem;
  color:#742288;
  margin:.16rem 0rem .12rem;
}
.home .ruleDetail .content{
  margin-top:1.4rem;
}
.home .ruleDetail .content div{
  font-size:.2rem;
  line-height:.34rem;
  color:#9c69a6;
  text-align: center;
}
.rank{
  background:url('../../static/images/rankBac.jpg') no-repeat;
  background-size: 100% 100%;
  padding-top:2rem;
  text-align: center;
  .again{
    background:url('../../static/images/wantOnceAgain.png') no-repeat;
    background-size: 100% 100%;
    width:100%;
    height:1rem;
    margin-bottom:.2rem;
  }
  .rankHead{
    background:url('../../static/images/rankBang.png') no-repeat;
    background-size: 100% 100%;
    width:100%;
    height:.7rem;
    margin: 0 auto;
  }
  .container{
    width:4.4rem;
    height:2.4rem;
    border:1px solid #9C7BB9;
    margin:0 auto;
    overflow: auto;
    background-color:#f2f2f8;
  }
  .goHome{
    margin:0 auto;
    width:2.2rem;
    height:.88rem;
    top:8.7rem;
    left:2.2rem;
    background:url('../../static/images/rankTohome.png') no-repeat;
    background-size: 100% 100%;
  }
  p{
    color:@fontcolor;
    font-size:.26rem;
    line-height:.4rem;
    width:4rem;
    margin:.1rem auto;
    span{
      display: inline-block;
      width:33.333%;
      text-align:center;
    }
  }
  p:last-child{
    font-size:0.22rem;
  }
  ul{
    list-style: none;
    padding:0px;
    margin:0px;
    width:80%;
    font-size:.2rem;
    text-align: center;
    margin:0 auto;
    li{
      border-:1px solid red;
      background:url('../../static/images/rankLine.png') no-repeat bottom;
      background-size:contain;
      height:.45rem;
      line-height: .45rem;
      color:@fontcolor;
      font-weight: bold;
      span{
        display: inline-block;
        width:33.3333%;
        overflow: hidden;
        text-overflow: ellipsis; 
        white-space: nowrap;
      }
    }
  }
}
.normal{
  p{
    margin:.3rem auto;
  }
}
.game1{
  background:url('../../static/images/gameBac.jpg') no-repeat;
  background-size: 100% 100%;
  .gamerule{
    background:url('../../static/images/game1Rule.png') no-repeat;
    background-size: 100% 100%;
    height:.56rem;
  }
  .success{
    div{
        background:url('../../static/images/game1Suc.jpg') no-repeat;
        background-size:100% 100%;
      }
  }
}
.game2{
  background:url('../../static/images/gameBac.jpg') no-repeat;
  background-size: 100% 100%;
  .gamerule{
    background:url('../../static/images/game2Rule.png') no-repeat;
    background-size: 100% 100%;
    height:.56rem;
  }
  .success{
    div{
        background:url('../../static/images/game2Suc.jpg') no-repeat;
        background-size:100% 100%;
      }
  }
}
.game3{
  background:url('../../static/images/gameBac.jpg') no-repeat;
  background-size: 100% 100%;
  .gamerule{
    background:url('../../static/images/game3Rule.png') no-repeat;
    background-size: 100% 100%;
    height:.56rem;
  }
  .success{
    div{
        background:url('../../static/images/game3Suc.jpg') no-repeat;
        background-size:100% 100%;
      }
  }
}
.subForm{
  padding-top:2.5rem;
  box-sizing:border-box;
  text-align: center;
  background:url('../../static/images/rankBac.jpg') no-repeat;
  background-size: 100% 100%;
  .grade{
    background:url('../../static/images/grade.png') no-repeat;
    background-size: 100% 100%;
    height:1rem;
  }
  p{
    margin-top:0px;
    margin-bottom:.5rem;
    font-size:.2rem;
    color:@fontcolor;
  }
  p.info{
    font-size:.26rem;
    line-height:.4rem;
    margin-top:.3rem;
    margin-bottom:.3rem;
  }
  span{
    display:block;
    bottom:2rem;
    margin:0 auto;
    left:2rem;
    width:2.4rem;
    height:.9rem;
    background:url('../../static/images/submit.png') no-repeat;
    background-size: 100% 100%;
  }
  div{
    font-size:.3rem;
    color:@fontcolor;
    margin:0.06rem 0;
    input{
      height:.3rem;
      border:1px solid #F5DAE8;
    }
  }
}
</style>
