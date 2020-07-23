<template>
    <div>
      <div class="clear">
        <div class="fl-right">
          <span class="ess_notice" v-if="notice" @click="noticeDel">取消关注</span><span class="ess_noticeDel" @click="noticeAdd" v-else>点击关注</span>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "zcxPage",
      data(){
          return{
            notice:true,
          }
      },
      methods:{
        delCare(id,val,text){
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
              this.$message.success(text)
              this.getCare()
            }
          }).catch(err=>{
            console.log(err);
          });
        },
        noticeDel(){
          this.notice = false
          this.delCare(3,false,'您已取消关注')
        },
        noticeAdd(){
          this.notice = true
          this.delCare(3,true,'您已关注')
        },
      }
    }
</script>

<style scoped>
  .ess_notice{
    color: #ffa931;
    background: url("../../static/img/notice.png") no-repeat 0 center;
    background-size: 15px;
    padding-left: 20px;
  }
  .ess_noticeDel{
    color: #ffa931;
    background: url("../../static/img/noticeDel.png") no-repeat 0 center;
    background-size: 15px;
    padding-left: 20px;
  }
</style>
