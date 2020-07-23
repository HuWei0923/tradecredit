<template>
    <div>
      <!--header-->
      <moreHeader></moreHeader>

      <div class="essContent">
        <!--header-->
        <div class="clear essContent_head">
          <div class="fl-left">{{company}}</div>
        </div>

        <!--tab-->
        <ul class="essTab clear">
          <li v-for="(item,index) in navList" :key="index" @click="changeTab(index)" :class="{ whiteBg:changeTabShow == index}">{{item}}</li>
        </ul>
        <!--components-->
        <div class="essContent_dom">
          <normalInfo v-if="changeTabShow==0"></normalInfo>
          <search v-if="changeTabShow==1"></search>
          <sinosure v-if="changeTabShow==2"></sinosure>
          <zcxPage v-if="changeTabShow==3"></zcxPage>
        </div>
      </div>

      <!--公用底部-->
      <allFooter></allFooter>
    </div>
</template>

<script>
  import moreHeader from '@/components/moreHeader'
  import allFooter from '@/components/allFooter'
  import normalInfo from '@/components/normalInfo'
  import search from '@/components/search'
  import sinosure from '@/components/sinosure'
  import zcxPage from '@/components/zcxPage'
  import axios from 'axios';
    export default {
      name: "essInfo",
      components:{normalInfo,moreHeader,allFooter,search,sinosure,zcxPage},
      data(){
          return{
            company:'浙江英特集团有限公司',
            navList:['企业基本信息','企查查','中信保','中诚信'],
            changeTabShow:0,
          }
      },
      mounted() {
        //console.log(this.$route.query);
        this.changeTabShow = this.$route.query.nav
        this.company = this.$route.query.title
      },
      methods:{
        /*切换tab*/
        changeTab(index){
          this.changeTabShow = index
        }
      }
    }
</script>

<style scoped>
  .essContent{
    width: 1200px;
    margin: 0 auto;
  }
  .essContent_head{
    line-height: 70px;
    font-size: 18px;
  }
  .essContent_head span{
    display: inline-block;
    font-size: 12px;
    margin-left: 20px;
    cursor: pointer;
  }
  .essTab li{
    line-height: 35px;
    float: left;
    width: 150px;
    text-align: center;
    background: #eee;
    cursor: pointer;
    font-size: 12px;
  }
  .essTab li:hover{
    background: #ddd;
  }
  .essTab li.whiteBg{
    background: #fff;
  }
  .essContent_dom{
    width: 100%;
    background: #fff;
    padding: 20px;
    margin-bottom: 100px;
  }
</style>
