<template>
    <div>
      <allHeader @child="getInfo"></allHeader>
      <!--中间内容-->
      <div class="index_content flex">
        <!--检测列表-->
        <div class="pro_content_left">
          <p class="content_title">检测列表 <span class="fl-right">根据关键字，共搜索到 {{num}} 条数据结果，结果来自{{sourceType}}<a class="postLink" @click="postSearch()">模糊接口查询</a></span></p>
          <ul class="proList_li" v-if="userList.length>0">
            <li class="clear" v-for="(item,index) in userList" :key="index">
              <div class="fl-left proList_content">
                <p class="proList_txt" @click="moreNews(item.companyName,0)">{{item.companyName}}</p>
                <p>社会统一信用代码：{{item.creditCode}}</p>
                <p>法人代表：{{item.operName}}</p>
                <p>成立时间：{{item.buildDate}}</p>
              </div>
              <dl class="fl-right proList_btn">
                <dd @click="moreNews(item.companyName,1)">企查查</dd>
                <dd @click="moreNews(item.companyName,2)">中信保</dd>
                <dd @click="moreNews(item.companyName,3)">中诚信</dd>
                <dd @click="moreNews(item.companyName,0)">更多详情</dd>
              </dl>
            </li>
          </ul>
        </div>
        <!--我的关注-->
        <div class="pro_content_right">
          <p class="content_title">我的关注</p>
          <div class="warn_push">
            <ul class="newsList">
              <li v-for="(item,index) in followList" :key="index" @click="moreNews(item.companyName,0)">
                <img src="../../static/img/notice.png" alt="" @click.stop="delCare(item.cid,false)">
                <span>{{item.companyName}}</span>
                <img class="rightIcon" src="../../static/img/index_icon01.png" alt="">
                <img class="rightIcon" src="../../static/img/index_icon02.png" alt="">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--footer-->
      <allFooter></allFooter>
    </div>
</template>

<script>
  import allHeader from '@/components/allHeader'
  import allFooter from '@/components/allFooter'
  import axios from 'axios';
    export default {
      name: "proList",
      components:{allHeader,allFooter},
      data(){
          return{
            num:0,
            userList:[
              /*{name:'浙江英特集团有限公司',code:'xxxxxxx',user:'xxx',time:'2020-06-20'},
              {name:'浙江英特集团有限公司',code:'xxxxxxx',user:'xxx',time:'2020-06-20'},
              {name:'浙江英特集团有限公司',code:'xxxxxxx',user:'xxx',time:'2020-06-20'},
              {name:'浙江英特集团有限公司',code:'xxxxxxx',user:'xxx',time:'2020-06-20'},
              {name:'浙江英特集团有限公司',code:'xxxxxxx',user:'xxx',time:'2020-06-20'},
            */],
            //followList:['浙江英特集团有限公司','浙江英特集团有限公司','浙江英特集团有限公司','浙江英特集团有限公司','浙江英特集团有限公司','浙江英特集团有限公司','浙江英特集团有限公司']
            followList:[],
            sourceType:'',
          }
      },
      watch:{
        followList(){
          return this.followList
        }
      },
      created() {
        this.getCare()
      },
      mounted() {
        //console.log(this.$route.params.text);
        this.getInfo(this.$route.query.text)
      },
      methods:{
        getInfo(text){
          axios({
            method: 'post',
            headers:{
              "token": this.$cookies.get('token')||'',
            },
            url:this.$api.getSearchList,
            data:{
              "keyword":text,
              "page":1
            }
          }).then(res => {
            if (res.status == 200) {
              //console.log(res.data);
              this.userList = res.data.searchList
              this.num = res.data.searchList.length
              this.sourceType = res.data.sourceType
            }
          });
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
              //console.log(res.data);
              this.followList = res.data.careList
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
              "userId":1,
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
        moreNews(title,nav){
          this.$router.push({name:'essInfo',query:{title:title,nav:nav}})
        },
        /*接口查询*/
        postSearch(){
          var text = this.$route.query.text
          axios({
            method: 'post',
            headers:{
              "token": this.$cookies.get('token')||'',
            },
            url:this.$api.directList,
            data:{
              "keyword":text,
              "page":1
            }
          }).then(res => {
            if (res.status == 200) {
              console.log(res.data);
              this.userList = res.data.searchList
              this.num = res.data.searchList.length
              this.sourceType = res.data.sourceType
            }
          });
        }
      }
    }
</script>

<style scoped>
  .content_title span{
    color: #999;
    font-size: 12px;
  }
  .proList_li li{
    padding: 10px;
    border-bottom: 1px solid #d3d3d3;
  }
  .proList_content{
    width: 60%;
    font-size: 12px;
    color: #666;
  }
  .pro_content_left{
    width: 68%;
  }
  .pro_content_right{
    width: 28%;
  }
  .proList_txt{
    font-weight: 600;
    margin-bottom: 5px;
    color: #000;
    font-size: 14px;
    cursor: pointer;
  }
  .proList_btn{
    width: 40%;
    text-align: right;
    position: relative;
    top: 25px;
  }
  .proList_btn dd{
    display: inline-block;
    width: 60px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    border: 1px solid #617be3;
    border-radius: 5px;
    color: #617be3;
    margin-left: 10px;
    cursor: pointer;
  }
  .proList_btn dd:hover{
    background: #617be3;
    color: #fff;
  }
  .postLink{
    color: #1b7fbd;
    text-decoration-line: underline;
    margin-left: 10px;
    cursor: pointer;
  }
</style>
