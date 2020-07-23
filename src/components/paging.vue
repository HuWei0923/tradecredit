<template>
  <div class="page-box" v-show="show">
    <div class="pagelist">
      <span class="jump" :class="{disabled:pstart}" @click="backPage">上一页</span>
      <span class="jump" v-show="current_page>5" @click="jumpPage(1)">1</span>
      <span class="ellipsis"  v-show="efont">...</span>
      <span class="jump" v-for="num in indexs" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
      <span class="ellipsis"  v-show="ebehind">...</span>
      <span class="jump" :class="{disabled:psend}" @click="goPage">下一页</span>
      <span class="jumppoint">共<span>{{pages}}</span>页，跳转到：</span>
      <span class="jumpinp"><input type="text" v-model="changePage"></span>
      <span class="jump gobtn" @click="jumpPage(changePage)">GO</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'paging',
    props:['pages'],
    data(){
      return{
        current_page:1, //当前页
        //pages: 50, //总页数
        changePage:'',//跳转页
      }
    },
    computed:{
      show(){
        return this.pages && this.pages !=1
      },
      pstart(){
        return this.current_page == 1;
      },
      psend(){
        return this.current_page == this.pages;
      },
      efont(){
        if (this.pages <= 7) return false;
        return this.current_page > 5
      },
      ebehind() {
        if (this.pages <= 7) return false;
        var nowAy = this.indexs;
        return nowAy[nowAy.length - 1] != this.pages;
      },
      indexs() {
        var left = 1,
          right = this.pages,
          ar = [];
        if (this.pages >= 7) {
          if (this.current_page > 5 && this.current_page < this.pages - 4) {
            left = Number(this.current_page) - 3;
            right = Number(this.current_page) + 3;
          } else {
            if (this.current_page <= 5) {
              left = 1;
              right = 7;
            } else {
              right = this.pages;
              left = this.pages - 6;
            }
          }
        }
        while (left <= right) {
          ar.push(left);
          left++;
        }
        return ar;
      },
    },
    methods:{
      /*分页事件*/
      backPage(){
        var _this = this;
        _this.current_page--;
        _this.$parent.getUserInfo(_this.current_page)
        return
      },
      goPage(){
        var _this = this;
        _this.current_page++;
        _this.$parent.getUserInfo(_this.current_page)
        return
      },
      jumpPage(id) {
        var _this = this;
        _this.current_page = id;
        _this.$parent.getUserInfo(_this.current_page)
        return
      },
    }
  }
</script>

<style scoped>
  /*分页*/
  .page-box{
    text-align: center;
    margin: 20px 0;
  }
  .pagelist {
    font-size: 0;
    height: 30px;
    line-height: 30px;
  }
  .pagelist span {
    font-size: 12px;
  }
  .pagelist .jump {
    border: 1px solid #ccc;
    padding: 5px 8px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 5px;
  }
  .pagelist .bgprimary {
    cursor: default;
    color: #fff;
    background: #1b7fbd;
    border-color: #1b7fbd;
  }
  .jumpinp input {
    width: 55px;
    height: 26px;
    font-size: 13px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
  }
  .ellipsis {
    padding: 0px 8px;
  }
  .jumppoint {
    margin-left: 30px;
  }
  .jumppoint span{
    color: #1b7fbd;
    margin: 0 5px;
  }
  .pagelist .gobtn {
    font-size: 12px;
    position: relative;
    top: 2px;
  }
  .bgprimary {
    cursor: default;
    color: #fff;
    background: #ec8f6a;
    border-color: #ec8f6a;
  }
  .pagelist .jump.disabled{
    pointer-events: none;
    background: #ddd;
  }
</style>
