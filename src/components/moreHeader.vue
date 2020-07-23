<template>
    <div>
      <!--导航栏-->
      <div class="navHeader">
        <div class="clear navHeader_content">
          <router-link to="/" class="fl-left headerLink"><img src="../../static/img/logo.png" alt=""></router-link>
          <ul class="fl-right clear navHeader_list">
            <!--<li class="active">资信门户</li>
            <li>数据分析</li>-->
            <li v-if="isLogin" @click="joinBtn">登录</li>
            <li v-else @click="loginOut"> 用户 : {{userName}} | 退出</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "moreHeader",
      data(){
          return{
            isLogin:true,
            searchText:'',
            searchList:['浙江国贸','浙江英特'],
            userName:'',
          }
      },
      mounted() {
        if(this.$cookies.get('token')){
          this.isLogin = false
          this.userName = this.$cookies.get('name')
        }else{
          this.isLogin = true
        }
      },
      methods:{
        /*登录*/
        joinBtn(){
          this.$parent.isLoginModel = true
        },
        /*退出*/
        loginOut(){
          this.$cookies.set("token", '');
          this.$cookies.remove("token");
          // console.log(Cookie.get("token"))
          if(!this.$cookies.get("token")){
            alert("退出完成");
            this.isLogin = false;
            this.$router.push({path:'/'})
            window.location.reload()
          }
        },
      }
    }
</script>

<style scoped>
  .navHeader{
    width: 100%;
    height: 60px;
    /*background: #dfd3c3;*/
    background: #1b7fbd;
  }
  .navHeader_content{
    width: 1200px;
    margin: 0 auto;
    padding-top: 10px;
  }
  .headerLink{
    display: block;
  }
  .headerLink img{
    height: 40px;
  }
  .navHeader_list li{
    float: left;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 20px;
    color: #fff;
    cursor: pointer;
  }
  .navHeader_list li.active{
    background: #fff;
    border-radius: 20px;
  }
</style>
