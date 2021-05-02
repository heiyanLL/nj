<template>
    <div>
      <el-header>
          <el-row>
              <el-col :span="12"><h1>江北医疗云报销</h1></el-col>
              <el-col :span="12" class="user-info-box">
                <span>所属结构：顶山街道</span>
                <el-dropdown @command="handleQuit">
                    <span class="el-dropdown-link">
                        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="edit">修改密码</el-dropdown-item>
                        <el-dropdown-item command="quit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
              </el-col>
          </el-row>
      </el-header>
        <el-container>
            <el-aside width="200px">
                <Nav />
            </el-aside>
            <el-main>
                <bread-crumb />
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import Nav from "./nav";
    import breadCrumb from "./breadCrumb";
    export default {
        components: {
            breadCrumb,
            Nav,
        },
        data() {
            return {};
        },
        methods: {
            handleQuit(command) {
                if(command == 'quit'){
                    this.$router.push({path: '/login'})
                }
            }
        }
    };
</script>
<style lang='less' scoped>
 .el-header {
        background-color: #545c64;
        color: #fff;
        text-align: center;
        line-height: 60px;
        .el-dropdown{
            cursor: pointer;
            color: #fff;
        }
        .user-info-box{
            text-align: right;
            >span:after{
                content: '|';
                display: inline-block;
                height: 0;
                background: #fff;
                margin:0 10px;
            }
        }
    }
    .el-aside {
        min-height: calc(100vh - 60px);
    }
    h1{
        text-align: left;
    }
    .el-main{
        text-align: left;
    }
</style>
