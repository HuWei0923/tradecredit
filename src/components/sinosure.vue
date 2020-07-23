<template>
    <div>
      <div class="clear">
        <!--<div class="fl-right essDown"><img src="../../static/img/downLoad.png" alt="">下载报告</div>-->
        <div class="fl-right report" @click="reportAdd">报告申请</div>
      </div>
      <div class="normal_info">
        <p class="normal_infoTitle">基本信息</p>
        <ul class="flexWrap normal_infoList">
          <li><label>企业（机构）名称</label><span>彩虹集团电子股份有限公司</span></li>
          <li class="native"><label>曾用名</label><span>彩虹集团电子有限公司</span></li>
          <li><label>成立日期</label><span>2004-09-10</span></li>
          <li><label>法定代表人/负责人/执行事务合伙人</label><span>郭盟</span></li>
          <li><label>统一社会信用代码</label><span>916100007663066019</span></li>
          <li><label>注册资本</label><span>人民币2,232,349,400.00</span></li>
          <li><label>注册地址</label><span>陕西省咸阳市彩虹路2号院内</span></li>
          <li><label>企业（机构）类型</label><span>股份有限公司</span></li>
          <li><label>电话</label><span>15107737633</span></li>
          <li><label>传真</label><span>(010)8316801</span></li>
          <li><label>运营地址</label><span>陕西省咸阳市彩虹路2号院内</span></li>
          <li><label>Email</label><span>chdz@ch.com.cn</span></li>
          <li><label>主营业务</label><span>电子产品</span></li>
          <li><label>网址</label><span>http://www.irico.com.cn</span></li>
          <li class="native"><label>说明</label><span></span></li>
          <li><label>行业代码</label><span>3969</span></li>
        </ul>
      </div>
      <div class="normal_info">
        <p class="normal_infoTitle">背景规模概要</p>
        <ul class="flexWrap normal_infoList">
          <li><label>成立年限</label><span>15年</span></li>
          <li><label>员工人数</label><span>997</span></li>
          <li><label>企业规模</label><span>大型</span></li>
          <li><label>上市公司</label><span>是(香港联合交易所;00438)</span></li>
          <li class="native"><label>实际控制人性质</label><span>国有</span></li>
          <li class="nativeBig"><label>SinoRating说明</label><span></span></li>
        </ul>
      </div>
      <div class="normal_info">
        <p class="normal_infoTitle">风险异动概要</p>
        <table class="normal_table">
          <tr>
            <th>股东名称</th>
            <th>持股比例</th>
            <th>持股金额</th>
            <th>币种</th>
          </tr>
          <tr>
            <td>彩虹集团公司</td>
            <td>67.26%</td>
            <td>630,881,400</td>
            <td>人民币</td>
          </tr>
          <tr>
            <td>海外投资股东</td>
            <td>28.26%</td>
            <td>1,501,468,000</td>
            <td>人民币</td>
          </tr>
          <tr>
            <td>郭盟</td>
            <td>4.48%</td>
            <td>100,000,000</td>
            <td>人民币</td>
          </tr>
        </table>
      </div>
      <div class="normal_info">
        <p class="normal_infoTitle">中信保报告列表</p>
        <table class="normal_table">
          <tr>
            <th>报告</th>
            <th>报告单号</th>
            <th>文件路径</th>
            <th>更新时间</th>
          </tr>
          <tr>
            <td><a @click="downPdf">中国企业资信评估准报告.pdf</a></td>
            <td>461964000461964</td>
            <td>"/home/ftpuser/461964000461964.pdf"</td>
            <td>2020/05/15</td>
          </tr>
        </table>
      </div>

      <!--申请报告-->
      <applyPes v-if="showPes"></applyPes>
    </div>
</template>

<script>
  import axios from 'axios';
  import applyPes from '@/components/model/applyPes'
    export default {
      name: "sinosure",
      components:{applyPes},
      data(){
          return{
            showPes:false,
          }
      },
      methods:{
        /*申请中信保*/
        reportAdd(){
          this.showPes = true
        },
        downPdf(){
         var data1 = {
            "userId":parseInt(this.$cookies.get('userId')),
              "username":"admin",
              "password":"123456",
              "clientNo":"20000340"
          }
          console.log(data1);
          axios({
            method: 'post',
            headers:{
              "token": this.$cookies.get('token')||'',
            },
            url:this.$api.getPDF,
            data:{
              "userId":parseInt(this.$cookies.get('userId')),
              "username":"admin",
              "password":"123456",
              "clientNo":"20000340"
            },
            responseType: 'blob',
          }).then(res => {
            const content = res.data
            const blob = new Blob([content])
            const fileName = '中国企业资信评估准报告.pdf'
            if ('download' in document.createElement('a')) { // 非IE下载
              const elink = document.createElement('a')
              elink.download = fileName
              elink.style.display = 'none'
              elink.href = URL.createObjectURL(blob)
              document.body.appendChild(elink)
              elink.click()
              URL.revokeObjectURL(elink.href) // 释放URL 对象
              document.body.removeChild(elink)
            } else { // IE10+下载
              navigator.msSaveBlob(blob, fileName)
            }
            // var url = res.data.msg
            // window.open(url);
          }).catch(err=>{
            console.log(err);
          });
        }
      }
    }
</script>

<style scoped>
  .normal_infoTitle{
    font-weight: 600;
    margin-bottom: 20px;
  }
  .normal_info{
    width: 100%;
    margin-bottom: 20px;
  }
  .normal_infoList li{
    width: 33.33%;
    font-size: 12px;
    text-align: center;
  }
  .normal_infoList li label,span{
    display: inline-block;
    width: 50%;
    height: 35px;
    line-height: 35px;
    border: 1px solid #EBEEF5;
    vertical-align: middle;
    box-sizing: border-box;
  }
  .normal_infoList li.native{
    width: 66.66%;
  }
  .normal_infoList li.native label{
    width: 25%;
  }
  .normal_infoList li.native span{
    width: 75%;
  }
  .normal_infoList li.nativeBig{
    width: 100%;
  }
  .normal_infoList li.nativeBig label{
    width:16.67%;
  }
  .normal_infoList li.nativeBig span{
    width:83.33%;
  }
  .normal_infoList li label{
    background: #f1f3f4;
  }
  .normal_table{
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
  .normal_table th,td{
    height: 35px;
    line-height: 35px;
    border: 1px solid #EBEEF5;
    font-weight: 500;
  }
  .normal_table th{
    background: #f1f3f4;
  }
  .normal_table td a{
    color: #1b7fbd;
    cursor: pointer;
  }
  .essDown{
    width: 90px;
    height: 30px;
    line-height: 30px;
    margin-bottom: 20px;
    text-align: center;
    background: #fff;
    font-size: 12px;
    color: #204051;
    box-shadow: 0 0 5px #e3e3e3;
    border: 1px solid #204051;
    cursor: pointer;
  }
  .essDown:hover{
    color: #fff;
    background: #1b7fbd;
    border: 1px solid #1b7fbd;
  }
  .essDown img{
    width: 20px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .report{
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: #1b7fbd;
    cursor: pointer;
  }
  .report:hover{
    box-shadow: 0 0 5px #1b7fbd;
  }
</style>
