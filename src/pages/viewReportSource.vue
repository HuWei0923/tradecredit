<template>
<div>
  <jsonView :value="value"></jsonView>
</div>
</template>

<script>
  import Vue from 'vue'
  import jsonView from '@/components/jsonView'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)

  export default {
    name: "viewReportSource",
    components: {
      jsonView
    },
    data(){
      return {
        value:""
      }
    },
    created() {
      this.value = "{\"name\":\"zhangsan\"}";
      this.$http.get('static/json/产业企业信用评价data.json').then((response) => {
        console.log(response)
        this.value = JSON.stringify(response.data ,null, '\t');
      }, (response) => {
        //TODO error callback
      });
    },
    mounted() {

    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
