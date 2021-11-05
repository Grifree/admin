export default
`
<el-container >
        <el-aside width="350" >
            <el-menu             
              style="height: 100%;"
              class=""
              :default-active="navActive"
              @select="handleSelect"
              >
                <el-menu-item style="padding:1em;" >
                    <div style="text-align: center;margin-top: -1em;">
                        <img class="" :src="nav.top.logo" style="margin-bottom: -.3em;height:2em;" >
                    </div>
                </el-menu-item>
                 <template v-for="(item, index) in nav.items"  >
                    <el-menu-item v-if="isEmptyArray(item.items)" :index="item.url" :key="item.title" >
                        <div slot="title">
                            <img class="ta-icon" :src="'https://icon.2type.cn/'+ item.icon +'.svg'" />
                            {{item.title}}
                        </div>
                    </el-menu-item>         
                    <el-submenu v-else :index="'i'+index" :key="item.title"  >
                        <div slot="title">
                            <img class="ta-icon" :src="'https://icon.2type.cn/'+ item.icon +'.svg'" />
                            {{item.title}}
                        </div>
                        <el-menu-item v-for="sub in item.items" :index="sub.url" :key="sub.title"  >
                            <div slot="title">
                                <i :class="'fa fa-' + sub.fontawesome" aria-hidden="true"></i>
                                {{sub.title}}
                            </div>
                        </el-menu-item>
                    </el-submenu>       
                </template>       
                
            </el-menu>
        </el-aside>
        <el-container>
            <el-header  style="height:auto;padding:1em;border-bottom:1px solid #eee;position:relative;z-idnex:2;">
                <div  style="float:right;" >
                    <el-dropdown :hide-on-click="false">
                      <div>
                          <el-image
                              style="width: 30px; height: 30px;border-radius: 50%;margin-bottom: -0.8em;"
                              :src="nav.user.avatar"
                              fit="contain"
                           ></el-image>
                              {{nav.user.name}}
                              <i class="el-icon-arrow-down el-icon--right"></i> 
                        </div>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <el-link :href="nav.logoutURL" target="_blank">退出</el-link>
                          </el-dropdown-item>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item key="1">
                        <i class="fa fa-tachometer"></i>
                    </el-breadcrumb-item>
                   <el-breadcrumb-item v-for="item in header" :key="item.link" >
                        <a style="cursor: pointer;" v-if="item.url" :href="item.url">{{item.title}}</a>
                        <span v-else>{{item.title}}</span>
                   </el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
            <el-main style="background: #f7f7f7;">
              <slot></slot>
            </el-main>
            <el-footer height="auto">
                <div style="text-align: center;padding:1em;opacity: 0.3;">
                    <el-link :href="footer.link.href">{{footer.link.text}}</el-link>
                </div>
            </el-footer>
        </el-container>
    </el-container>


`