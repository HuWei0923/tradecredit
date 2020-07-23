<template>
    <div class="clear">
      <div class="fl-left">
        <div class="normal_info">
          <p class="normal_infoTitle">基本信息</p>
          <ul class="flexWrap normal_infoList">
            <li><label>法定代表人</label><span></span></li>
            <li><label>经营状态</label><span></span></li>
            <li><label>成立日期</label><span></span></li>
            <li><label>注册资本</label><span></span></li>
            <li><label>实缴资本</label><span></span></li>
            <li><label>缴费日期</label><span></span></li>
            <li><label>统一社会信用代码</label><span></span></li>
            <li><label>组织机构代码</label><span></span></li>
            <li><label>所属行业</label><span></span></li>
            <li><label>曾用名</label><span></span></li>
            <li><label>英文名</label><span></span></li>
            <li><label></label><span></span></li>
            <li class="nativeBig"><label>SinoRating说明</label><span></span></li>
          </ul>
        </div>
        <div class="normal_info">
          <p class="normal_infoTitle">预警推送</p>
          <table class="normal_table">
            <tr>
              <th>企业名称</th>
              <th>风险原因</th>
              <th>发布单位</th>
              <th>审核机构</th>
              <th>风险提示起止时间</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="fl-right">
        <p class="normal_infoTitle">资信信息综合画像</p>
        <useMap :main="main"></useMap>

        <div style="margin-top: 20px">
          <p class="normal_infoTitle">报告库</p>
          <table class="report_table">
            <tr>
              <th>报告名称</th>
              <th>查看地址</th>
              <th>报告来源</th>
              <th>更新日期</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
  import useMap from '@/components/useMap'
    export default {
      name: "normalInfo",
      components:{useMap},
      data(){
          return{
            main:'userMap',
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
    width: 800px;
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
  .normal_infoList li label{
    background: #f1f3f4;
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
  .report_table{
    width: 320px;
    text-align: center;
    font-size: 12px;
  }
  .report_table th,td{
    height: 35px;
    line-height: 35px;
    border: 1px solid #EBEEF5;
    font-weight: 500;
  }
  .report_table th{
    background: #f1f3f4;
  }
</style>
