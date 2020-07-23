<template>
    <div class="po-fixed fixedBg">
      <div class="appleyRes">
        <div class="appleyRes_title po-relative"><p>信保报告申请</p><span class="po-absolute" @click="hideshowPes"></span></div>
        <div class="appleyRes_content">
          <p class="apply_title">申请人：{{user}}</p>
          <!--有信保代码-->
          <div class="apply_info">
            <p class="apply_infoTitle">信保报告申请（已有信保代码）</p>
            <table class="apply_table">
              <tr>
                <th>待调查企业中国信保企业代码</th>
                <th>待调查企业国别</th>
                <th>待调查企业中文名称</th>
                <th>待调查企业英文名称</th>
                <th>待调查企业地址</th>
                <th>待调查企业统一社会信用代码</th>
                <th>是否导读</th>
                <th></th>
              </tr>
              <tr>
                <td style="width: 200px"><input type="text" v-model="report.reportbuyerNo" /></td>
                <td style="width: 110px"><input disabled type="text" v-model="report.reportCorpCountryCode" /></td>
                <td style="width: 150px"><input disabled type="text" v-model="report.reportCorpChnName" /></td>
                <td style="width: 150px"><input disabled type="text" v-model="report.reportCorpEngName" /></td>
                <td style="width: 220px"><input disabled type="text" v-model="report.reportCorpaddress" /></td>
                <td style="width: 180px"><input disabled type="text" v-model="report.creditno" /></td>
                <td style="width: 60px">
                  <select v-model="report.istranslation">
                    <option v-for="(item,index) in istranslation" :key="index" v-bind:value="item.id" v-text="item.name"></option>
                  </select>
                </td>
                <td><div class="applyBtn" @click="applyAdd">点击申请</div></td>
              </tr>
            </table>
          </div>
          <!--无信保代码-->
          <div class="apply_info">
            <p class="apply_infoTitle">信保报告申请（无信保代码）</p>
            <table class="apply_table">
              <tr>
                <th>待调查企业中国信保企业代码</th>
                <th>待调查企业国别</th>
                <th>待调查企业中文名称</th>
                <th>待调查企业英文名称</th>
                <th>待调查企业地址</th>
                <th>待调查企业统一社会信用代码</th>
                <th>是否导读</th>
                <th></th>
              </tr>
              <tr>
                <td style="width: 200px"><input disabled type="text" v-model="noReport.reportbuyerNo" /></td>
                <td style="width: 110px"><input type="text" v-model="noReport.reportCorpCountryCode" /></td>
                <td style="width: 150px"><input type="text" v-model="noReport.reportCorpChnName" /></td>
                <td style="width: 150px"><input type="text" v-model="noReport.reportCorpEngName" /></td>
                <td style="width: 220px"><input type="text" v-model="noReport.reportCorpaddress" /></td>
                <td style="width: 180px"><input type="text" v-model="noReport.creditno" /></td>
                <td style="width: 60px">
                  <select v-model="noReport.istranslation">
                    <option v-for="(item,index) in noIstranslation" :key="index" v-bind:value="item.id" v-text="item.name"></option>
                  </select>
                </td>
                <td><div class="applyBtn" @click="noApplyAdd">点击申请</div></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "applyPes",
      data(){
          return{
            user:'admin',
            report:{
              userId:parseInt(this.$cookies.get('userId')),
              reportbuyerNo:'CHN001941411',
              reportCorpCountryCode:'',
              reportCorpChnName:'',
              reportCorpEngName:'',
              reportCorpaddress:'',
              creditno:'',
              istranslation:'0'
            },
            noReport:{
              userId:parseInt(this.$cookies.get('userId')),
              reportbuyerNo:'',
              reportCorpCountryCode:'',
              reportCorpChnName:'',
              reportCorpEngName:'',
              reportCorpaddress:'',
              creditno:'',
              istranslation:'0',
            },
            istranslation:[{name:'否',id:'0'},{name:'是',id:'1'}],
            noIstranslation:[{name:'否',id:'0'},{name:'是',id:'1'}]
          }
      },
      methods:{
        hideshowPes(){
          this.$parent.showPes = false
        },
        /*有信保申请*/
        applyAdd(){
          axios({
            method: 'post',
            headers:{
              "token": this.$cookies.get('token')||'',
            },
            url:this.$api.zhongxinbao,
            data:this.report
          }).then(res => {
            //console.log(res.data.returnMsg);
            this.$message.success(res.data.returnMsg)
            this.hideshowPes()
          }).catch(err=>{
            console.log(err);
          });
        },
        /*无信保申请*/
        noApplyAdd(){
          axios({
            method: 'post',
            headers:{
              "token": this.$cookies.get('token')||'',
            },
            url:this.$api.zhongxinbao,
            data:this.noReport
          }).then(res => {
            //console.log(res.data.returnMsg);
            if(res.status==200){
              this.$message.success(res.data.returnMsg)
            }else{

            }
            this.hideshowPes()
          }).catch(err=>{
            console.log(err);
          });
        }
      },
    }
</script>

<style scoped>
  .appleyRes{
    width: 1200px;
    margin: 100px auto;
  }
  .appleyRes_title{
    line-height: 40px;
    background: #1b7fbd;
  }
  .appleyRes_title span{
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url("../../../static/img/close.png") no-repeat center center;
    background-size: 25px;
    cursor: pointer;
    right: 5px;
    top: 0;
  }
  .appleyRes_title p{
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
  .appleyRes_content{
    padding: 20px;
    background: #fff;
  }
  .apply_title{
    font-size: 12px;
    margin-bottom: 10px;
  }
  .apply_infoTitle{
    width: 100%;
    line-height: 35px;
    text-align: center;
    background: #e3e3e3;
    font-weight: 600;
  }
  .apply_info{
    margin-bottom: 50px;
  }
  .apply_table{
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
  .apply_table th,td{
    height: 35px;
    border: 1px solid #EBEEF5;
    font-weight: 500;
  }
  .apply_table th{
    background: #f1f3f4;
  }
  .apply_table td input{
    width: 100%;
    height: 100%;
    padding: 10px;
    text-align: center;
  }
  .apply_table td select{
    height: 20px;
  }
  .applyBtn{
    line-height: 30px;
    background: #1b7fbd;
    color: #fff;
    cursor: pointer;
    margin: 8px;
  }
  .bgGray{
    background: #f1f3f4
  }
  .bgGray input{
    background: #f1f3f4
  }
</style>
