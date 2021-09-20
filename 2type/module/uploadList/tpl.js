export default `
<div>
    <div v-for="(item, index) in value" key="item" style="margin-bottom: 1em;">
        <ta-upload :action="action" @input="inputItem(index, $event)"  :value="item"></ta-upload>    
    </div>
    <el-button type="primary" @click="addItem" icon="el-icon-circle-plus-outline"></el-button>
</div>
`