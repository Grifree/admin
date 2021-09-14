export default `
<el-upload
        
        class="ta-upload"
        :action="action"
        :show-file-list="false"
        :on-success="onSuccess"
>
    <div class="ta-upload-inner">
        <img v-if="value.src" :src="value.src" class="ta-upload-preview"/>
        <i v-if="!value.src && !value.filename" class="el-icon-plus ta-upload-picker"></i>
        <span class="ta-upload-filename">{{value.filename}}</span>
    </div>
    <span v-if="value.src || value.filename"  @click.stop="onRemove" class="ta-upload-close el-icon-error"></span>
</el-upload>
`