<template>
  <div>
    <allHeader></allHeader>

    <!--主内容-->
    <div class="index_content" v-show="isLogin">
      <div class="index_content_all flex">
        <!--预警推送-->
        <div class="index_content_left">
          <p class="content_title">预警推送</p>
          <div class="warn_push">
            <div class="flex borderBottom1 warn_pushNav">
              <!--<span v-for="(item,index) in warnNav" :key="index" @click="changeNav(index)" :class="{ borderBottom:changewarnNav == index}">{{item}}</span>-->
              <span v-for="(item,index) in warnNav" :key="index">{{item}}</span>
            </div>
            <ul class="warn_contentList">
              <li v-for="(item,index) in warnList" :key="index">
                <div class="clear blod">
                  <div class="fl-left">{{item.title}}</div>
                  <div class="fl-right">{{item.level}}</div>
                </div>
                <p>{{item.content}}</p>
                <div class="clear">
                  <span class="fl-left">风险推送人：{{item.user}}</span>
                  <span class="fl-right">推送时间：{{item.time}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--用户名单-->
        <div class="index_content_right">
          <p class="content_title">用户名单</p>
          <div class="warn_push">
            <div class="flex warn_pushNav">
              <span v-for="(item,index) in newsNav" :key="index" @click="changePush(index)" :class="{ borderBottom:changepushNav == index}">{{item}}</span>
            </div>
            <ul class="newsList">
              <li v-for="(item,index) in newsMore" :key="index" @click="moreNews(item.companyName,0)">
                <img src="../../static/img/notice.png" alt="" @click.stop="delCare(item.cid,false)">
                <span>{{item.companyName}}</span>
                <img class="rightIcon" src="../../static/img/index_icon01.png" alt="">
                <img class="rightIcon" src="../../static/img/index_icon02.png" alt="">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--常用应用-->
      <p class="content_title">常用应用</p>
      <div class="moreUse">
        <ul class="moreUseList clear">
          <li v-for="(item,index) in useList" :key="index" @click="goPath(index)">
            <img :src="item.img" alt="">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>

    <!--footer-->
    <allFooter></allFooter>

    <!--登录-->
    <fixModel v-if="isLoginModel"></fixModel>
  </div>
</template>

<script>
  import fixModel from '@/components/login'
  import allHeader from '@/components/allHeader'
  import allFooter from '@/components/allFooter'
  import axios from 'axios';
  export default {
    name: "index",
    components:{allHeader,allFooter,fixModel},
    data(){
      return{
        isLogin:true,
        isLoginModel:false,
        useList:[
          {img:require('../../static/img/use_icon01.png'),name:'黑名单申报'},
          {img:require('../../static/img/use_icon02.png'),name:'黑名单审批'},
          {img:require('../../static/img/use_icon03.png'),name:'站内信'},
          {img:require('../../static/img/use_icon04.png'),name:'关注清单'},
          {img:require('../../static/img/use_icon05.png'),name:'用户管理'},
        ],
        warnNav:['企查查','中诚信','站内信','集团公示'],
        changewarnNav:0,
        warnList:[{title:'XXX有限公司',level:'2级',content:'鉴于国内猪肉价格上涨',user:'XXX',time:'2020-05-19'},
          {title:'XXX有限公司',level:'2级',content:'鉴于国内猪肉价格上涨',user:'XXX',time:'2020-05-19'}
        ],
        newsNav:['关注清单','灰名单','黑名单'],
        changepushNav:0,
        newsMore:[],
      }
    },
    created() {
      if(this.$route.query.username){
        this.loginInfo(this.$route.query.username)
      }else if(this.$cookies.get('token')){
        this.isLogin = true
      }else{
        this.isLogin = false
      }
      this.getCare()
    },
    methods:{
      loginInfo(name){
        var _this = this
        axios.post(_this.$api.login, {
          'username':name,
          'loginType':'skip'
        }).then(res => {
          if (res.status == 200) {
            //console.log(res);
            if(res.data.code==0){
              /*失效时间*/
              var millisecond = new Date().getTime();
              var expiresTime = new Date(millisecond + 60 * 1000 * 30);
              //存储cookie值
              _this.$cookies.set("token",res.data.token, {expires: expiresTime ,path:"/"});
              _this.$cookies.set("name",res.data.username, {expires: expiresTime ,path:"/"});
              _this.$cookies.set("userId",res.data.userId, {expires: expiresTime ,path:"/"});
              _this.isLogin = true
              setTimeout(function(){
                this.$cookies.set("token", '');
                this.$cookies.remove("token");
                this.$cookies.remove("name");
                this.$cookies.remove("userId");
                alert('登录失效，请重新登录');
              },1800000)
            }else{
              alert(res.data.msg)
            }
          }
        })
      },
      /*改变样式*/
      changeNav(index){
        this.changewarnNav = index
      },
      changePush(index){
        this.changepushNav = index
      },

      /*应用跳转*/
      goPath(index){
        if(index==4){
          if(this.$route.query.username=='admin'||this.$cookies.get('name')=='admin'){
            this.$router.push('/management')
          }
        }
      },

      /*关注清单*/
      getCare(){
        axios({
          method: 'post',
          headers:{
            "token": this.$cookies.get('token')||'',
          },
          url:this.$api.getCareList,
          data:{
            "userId":parseInt(this.$cookies.get('userId'))
          }
        }).then(res => {
          if (res.status == 200) {
            this.newsMore = res.data.careList
          }
        });
      },
      /*取消关注*/
      delCare(id,val){
        axios({
          method: 'post',
          headers:{
            "token": this.$cookies.get('token')||'',
          },
          url:this.$api.getCareOrNot,
          data:{
            "userId":parseInt(this.$cookies.get('userId')),
            "companyId":id,
            "relation":val
          }
        }).then(res => {
          //console.log(res.data);
          if(res.data.code==0){
            this.$message.success('您已取消关注')
            this.getCare()
          }
        }).catch(err=>{
          console.log(err);
        });
      },

      /*详情*/
      moreNews(title,nav){
        this.$router.push({name:'essInfo',query:{title:title,nav:nav}})
      }
    }
  }
</script>

<style scoped>
</style>
