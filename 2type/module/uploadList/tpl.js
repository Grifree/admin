export default `
<div>
    <div v-for="item in value" key="item" style="margin-bottom: 1em;">
        <ta-upload  value="item"></ta-upload>    
    </div>
    <el-button type="primary" @click="addItem" icon="el-icon-circle-plus-outline"></el-button>
</div>
`