export default `
<div>
<strong>{{title}}</strong>
<el-upload
  class="ta-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus ta-uploader-icon"></i>
  <input type="text" name="name" :value="value">
</el-upload>
</div>
`