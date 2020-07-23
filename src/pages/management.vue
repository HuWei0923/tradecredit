<template>
    <div>
        <!--header-->
        <moreHeader></moreHeader>

        <div class="manageTable">
            <!--条件筛选-->
            <div class="clear manageTableTitle">
                <el-input class="fl-left manageTableInput" v-model="userName" placeholder="请输入用户名" clearable></el-input>
                <el-input class="fl-left manageTableInput" v-model="userCode" placeholder="请输入工号" clearable></el-input>
                <el-button type="primary" @click="doSearch()">查询</el-button>
            </div>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" stripe
                @selection-change="handleSelectionChange" v-loading="loading">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <!--<el-table-column
            prop="company"
            label="公司名称"
            width="160">
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门名称">
          </el-table-column>-->
                <el-table-column prop="username" label="工号">
                </el-table-column>
                <el-table-column prop="name" label="人员">
                </el-table-column>
                <!--<el-table-column
            prop="sex"
            label="性别"
            width="60">
          </el-table-column>-->
                <el-table-column prop="permissionLevel" label="权限级别">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.staTxt === '已启用' ? 'primary' : 'info'" disable-transitions>
                            {{scope.row.staTxt}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="right" width="180" label="操作">
                    <!--<template slot="header" slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEditAll(scope.$index, scope.row)">一键启用</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleDeleteAll(scope.$index, scope.row)">一键停用</el-button>
            </template>-->
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">点击启用</el-button>
                        <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">点击停用
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- <paging :pages="pages"></paging> -->
            <div style="text-align: center;margin-top: 10px;">
                <el-pagination background layout="prev, pager, next" :total="page.total"
                    :current-page="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>

        </div>

        <!--公用底部-->
        <allFooter></allFooter>
    </div>
</template>

<script>
    import moreHeader from '@/components/moreHeader'
    import allFooter from '@/components/allFooter'
    import paging from '@/components/paging'
    import axios from 'axios';
    export default {
        name: "management",
        components: { moreHeader, allFooter, paging },
        data() {
            return {
                page: {
                    currentPage: 1,
                    total: 0,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                userName: '',
                userCode: '',
                pages: 5,
                loading: false
            }
        },
        created() {
            this.getUserInfo(1)
        },
        methods: {
            /*用户信息*/
            getUserInfo(page) {
                this.loading = true;
                axios({
                    method: 'post',
                    headers: {
                        "token": this.$cookies.get('token') || '',
                    },
                    url: this.$api.searchUser,
                    data: {
                        "pageIndex": page ? page : 1,
                        "pageSize": this.page.pageSize,
                        "username": this.userCode,
                        "name": this.userName
                    }
                }).then(res => {
                    //console.log(res);
                    if (res.status == 200) {
                        this.loading = false;
                        this.tableData = res.data.userList;
                        this.page.total = res.data.totalRecords
                        this.pages = res.data.totalPages
                        this.tableData.map(m => {
                            if (m.status == 0) {
                                m.staTxt = '已停用'
                            } else {
                                m.staTxt = '已启用'
                            }
                        })
                        //console.log(this.tableData);
                    }
                });
            },
            handleCurrentChange(val) {
                this.getUserInfo(val)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            /*列表操作*/
            handleEdit(index, row) {
                this.updateUser(row.userId, 1)
            },
            handleDelete(index, row) {
                this.updateUser(row.userId, 0)
            },

            updateUser(id, code) {
                axios({
                    method: 'post',
                    headers: {
                        "token": this.$cookies.get('token') || '',
                    },
                    url: this.$api.updateUser,
                    data: {
                        "userId": id,
                        "status": code
                    }
                }).then(res => {
                    if (res.status == 200) {
                        //console.log(res);
                        this.page.currentPage = 1;
                        this.getUserInfo()
                    }
                });
            },
            /*查询*/
            doSearch() {
                this.page.currentPage = 1;
                this.getUserInfo()
                // axios({
                //     method: 'post',
                //     headers: {
                //         "token": this.$cookies.get('token') || '',
                //     },
                //     url: this.$api.searchUser,
                //     data: {
                //         "pageIndex": 1,
                //         "pageSize": 20,
                //         "username": this.userCode,
                //         "name": this.userName
                //     }
                // }).then(res => {
                //     if (res.status == 200) {
                //         //console.log(res);
                //         this.tableData = res.data.userList
                //         this.tableData.map(m => {
                //             if (m.status == 0) {
                //                 m.staTxt = '已停用'
                //             } else {
                //                 m.staTxt = '已启用'
                //             }
                //         })
                //     }
                // });
            }
        }
    }
</script>

<style scoped>
    .manageTable {
        width: 1200px;
        margin: 20px auto;
        margin-bottom: 100px;
    }

    >>>.el-table thead {
        color: #333;
    }

    >>>.el-table th {
        text-align: center;
        padding: 0;
        line-height: 50px;
    }

    >>>.el-table td {
        text-align: center;
        padding: 5px 0;
    }

    >>>.el-button--mini {
        padding: 5px 8px;
    }

    .manageTableTitle {
        margin-bottom: 20px;
    }

    .manageTableInput {
        width: 200px;
        margin-right: 20px;
    }
</style>