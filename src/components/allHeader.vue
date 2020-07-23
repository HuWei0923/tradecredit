<template>
    <div>
        <!--导航栏-->
        <div class="navHeader">
            <div class="clear navHeader_content">
                <router-link to="/" class="fl-left headerLink"><img src="../../static/img/logo.png" alt="">
                </router-link>
                <ul class="fl-right clear navHeader_list">
                    <!--<li class="active">资信门户</li>
            <li>数据分析</li>-->
                    <li v-if="!loginStatus" @click="joinBtn">登录</li>
                    <li v-else @click="loginOut"> 用户 : {{$cookies.get('name')}} | 退出</li>
                </ul>
            </div>
        </div>
        <!--搜索框-->
        <div class="po-relative">
            <div class="search">
                <img class="searchLogo" src="../../static/img/bannerLogo.png" alt="">
                <div>
                    <input type="text" class="search_txt" v-model="searchText" @keyup.enter="search">
                    <div class="search_btn" @click="search"><img src="../../static/img/search.png" alt=""></div>
                </div>
                <div class="search_link">
                    最近搜索：
                    <a v-for="(item,index) in searchList" :key="index"
                        @click="searchKey(item.keyWord)">{{item.keyWord}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "allHeader",
        props: {
            loginStatus: {
                type: Boolean,
            }
        },
        data() {
            return {
                searchText: '',
                searchList: [],
                isLogin: true,
                userName: ''
            }
        },
        mounted() {
            if (this.$cookies.get('token')) {
                this.isLogin = false
                this.userName = this.$cookies.get('name')
            } else {
                this.isLogin = true
            }
            this.getSearch()
            if (this.$route.query.text) {
                this.searchText = this.$route.query.text
            }
        },
        methods: {
            /*最近搜索*/
            getSearch() {
                axios({
                    method: 'post',
                    headers: {
                        "token": this.$cookies.get('token') || '',
                    },
                    url: this.$api.latestWords,
                    data: {
                        "userid": this.$cookies.get('userId')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        console.log(res)
                        this.searchList = res.data.latestWords
                    }
                })
                //axios.post(this.$api.latestWords,{});
            },
            search() {
                var _this = this
                if (_this.searchText == '' || undefined) {
                    alert('请输入搜索内容')
                } else if (!_this.$cookies.get('token')) {
                    _this.$parent.isLoginModel = true
                } else {
                    this.$emit('child', _this.searchText);
                    _this.$router.push({ name: 'proList', query: { text: _this.searchText } })
                    //console.log(_this.searchText);
                }
            },
            /*最近搜索事件*/
            searchKey(val) {
                this.searchText = val
                this.search()
            },

            /*登录*/
            joinBtn() {
                this.$parent.isLoginModel = true
            },
            /*退出*/
            loginOut() {
                this.$cookies.set("token", '');
                this.$cookies.remove("token");
                // console.log(Cookie.get("token"))
                if (!this.$cookies.get("token")) {
                    alert("退出完成");
                    this.isLogin = false;
                    this.$router.push({ path: '/' })
                    window.location.reload()
                }
            },

        }
    }
</script>

<style scoped>
    .navHeader {
        width: 100%;
        height: 60px;
        /*background: #dfd3c3;*/
        background: #1b7fbd;
    }

    .navHeader_content {
        width: 1200px;
        margin: 0 auto;
        padding-top: 10px;
    }

    .headerLink {
        display: block;
    }

    .headerLink img {
        height: 40px;
    }

    .navHeader_list li {
        float: left;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 20px;
        color: #fff;
        cursor: pointer;
    }

    .navHeader_list li.active {
        background: #fff;
        border-radius: 20px;
    }

    .search {
        width: 50%;
        margin: 20px auto;
        text-align: center;
    }

    .search_txt {
        width: 500px;
        height: 45px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        padding-left: 12px;
        border: 1px solid #1b7fbd;
    }

    .search_btn {
        display: inline-block;
        width: 80px;
        height: 45px;
        background: #1b7fbd;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        cursor: pointer;
        position: relative;
        top: -5px;
    }

    .search_btn img {
        width: 25px;
        margin-top: 10px;
    }

    .search_link {
        width: 550px;
        text-align: left;
        margin: 10px auto;
        font-size: 12px;
    }

    .search_link a {
        color: #596e79;
        margin-left: 20px;
        cursor: pointer;
    }

    .searchLogo {
        width: 300px;
        margin: 20px 0 40px 0;
    }
</style>