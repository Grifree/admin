export default
`
<div>
<el-menu
  @select="handleSelect"
  class=""
  mode="horizontal"
  :default-active="navActive"
  
  >
    <el-menu-item >
        <img class="ta-icon w2" src="./media/logo.svg" >
    </el-menu-item>
    <el-menu-item index="/admin/home_template.html" >
        <img class="ta-icon" src="./media/browser-5.svg" >
        首页
    </el-menu-item>
    <el-menu-item index="/admin/stat_template">
        <img class="ta-icon" src="./media/line-chart.svg" >
        统计
    </el-menu-item>
    <el-submenu index="xxx" >
            <template slot="title">
            <img class="ta-icon w1_2" src="./media/aim.svg" >
            活动
            </template>
            <el-menu-item index="/admin/list_template.html" >
                <img class="ta-icon" src="./media/browser.svg" >
                列表
            </el-menu-item>
            <el-menu-item index="/admin/form_template.html?kind=create">
                <img class="ta-icon" src="./media/blog.svg" >
                创建
            </el-menu-item>
            <el-menu-item index="/admin/form_template.html?kind=update" >
                <img class="ta-icon" src="./media/blog.svg" >
                编辑
            </el-menu-item>
     </el-submenu>
    <el-menu-item index="8"  style="float:right;">
        <i class="el-icon-switch-button"></i>
        <el-link href="/admin/home.html" target="_blank">退出</el-link>
    </el-menu-item>
</el-menu>
</div>
`