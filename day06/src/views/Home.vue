<template>
  <div class="container">
    <!--单一文件上传「FORM-DATA」-->
    <div class="upload_container">
      <h3>单一文件上传「FORM-DATA」</h3>

      <div class="upload_box">
        <input
          id="upload_ipu"
          @change="getFile"
          type="file"
          class="upload_ipu"
        />
        <div class="upload_button_group">
          <button
            class="upload_button select"
            :class="uploadStatus ? 'disabled' : ''"
            @click="selectFile"
          >
            选择文件
          </button>
          <button
            class="upload_button upload"
            :class="uploadStatus ? 'loading' : ''"
            @click="uploadFile"
          >
            上传到文件服务器
          </button>
        </div>
        <div class="upload_tips" v-if="!showFile">
          只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB
        </div>
        <div class="upload_list" v-if="showFile">
          <span>文件：{{ file.name }}</span>
          <span><em @click="removeFile">移除</em></span>
        </div>
      </div>

      <div class="image_box" v-if="imgUrl">
        <img :src="imgUrl" alt="" />
      </div>
    </div>

    <!--单一文件上传「进度管控」-->
    <div class="upload_container">
      <h3>单一文件上传「进度管控」</h3>
      <div class="upload_box">
        <input type="file" @change="getFile2" class="upload_ipu2" />
        <div class="upload_button_group">
          <button
            class="upload_button upload_file"
            :class="uploadProgress == 100 ? 'loading' : ''"
            @click="selectFile2"
          >
            上传文件
          </button>
        </div>
        <div class="progress" v-if="progressStatus">
          <div
            class="select_progress"
            :style="{ width: uploadProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!--单一文件上传「BASE64」，只适合图片   -->
    <div class="upload_container">
      <h3>单一文件上传「BASE64」，只适合图片</h3>
      <div class="upload_box">
        <input type="file" @change="getFile3" class="upload_ipu3" />
        <div class="upload_button_group">
          <button class="upload_button upload_file2" @click="selectFile3">
            上传图片
          </button>
        </div>
        <div class="upload_tips">
          只能上传jpg/png格式图片，且大小不能超过2mb
        </div>
      </div>
    </div>

    <!--拖拽上传-->
    <div class="upload_container">
      <h3>拖拽上传</h3>
      <div
        class="upload_box upload_center"
        @dragover.prevent="dropGetFile"
        @drop.prevent="dropGetFile"
      >
        <input
          type="file"
          @change="getFile4"
          id="drag_file"
          class="upload_ipu"
        />
        <img src="../assets/css/upload.png" width="80px" height="62px" />
        <div class="upload_tips mt5">
          将文件拖到此处，或<span @click="selectFile4" class="click_upload"
            >点击上传</span
          >
        </div>
      </div>
    </div>

    <!--多文件上传-->
    <div class="upload_container">
      <h3>多文件上传</h3>
      <div class="upload_box">
        <input
          type="file"
          @change="getFile5"
          id="multiple_file"
          multiple
          class="upload_ipu"
        />
        <div class="upload_button_group">
          <button class="upload_button select5" @click="selectFile5">
            选择文件
          </button>
          <button class="upload_button upload5" @click="uploadFile5">
            上传到服务器
          </button>
        </div>
        <ul>
          <li v-for="(item, index) in selectFiles" :key="index">
            文件{{ index }} : {{ item.name }}
            <span @click="handleRemoveFile(index)">移除</span>
          </li>
        </ul>
      </div>
    </div>

    <!--单一文件上传「缩略图处理」-->
    <div class="upload_container">
      <h3>单一文件上传「缩略图处理」</h3>
      <div class="upload_box">
        <input type="file" @change="getFile6" id="alum" class="upload_ipu" />
        <div class="upload_button_group">
          <button class="upload_button select6" @click="selectFile6">
            选择文件
          </button>
          <button class="upload_button upload6" @click="uploadFile6">
            上传到服务器
          </button>
        </div>
        <img v-if="imgUrl2" :src="imgUrl2" alt="" width="60" height="60" />
      </div>
    </div>

    <!--大文件上传-->
    <div class="upload_container">
      <h3>大文件上传</h3>
      <div class="upload_box">
        <input
          type="file"
          @change="getFile7"
          id="maxFileUpload"
          class="upload_ipu"
        />
        <div class="upload_button_group">
          <button class="upload_button upload7" @click="uploadFile7">
            上传文件
          </button>
        </div>
        {{ chunkIndex / 100 }}
        <div class="progress" v-if="maxFileProgressStatus">
          <div
            class="select_progress"
            :style="{ width: (chunkIndex / 100) * 100 + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <div class="video_box" v-if="videoPath">
      <video :src="videoPath" controls></video>
    </div>
  </div>
</template>

<script>
import {
  uploadSingle,
  uploadSingleBase64,
  uploadSingleName,
  uploadAlready,
  uploadChunk,
  uploadMerge,
} from "../api/upload";
import SparkMD5 from "spark-md5";
export default {
  name: "Home",
  data: function () {
    return {
      showFile: false,
      file: "",
      imgUrl: "",
      uploadStatus: false,
      progressStatus: false,
      file2: "",
      uploadProgress: 0,
      file3: "",
      file4: "",
      selectFiles: [],
      imgUrl2: "",
      file6: "",
      maxFileProgressStatus: false,
      file7: "",
      chunkIndex: 0,
      videoPath: "",
    };
  },
  methods: {
    //方法做的事情： 拉起选择文件弹窗
    selectFile() {
      let uploadIpu = document.getElementById("upload_ipu");
      uploadIpu.click();
    },
    //方法做的事情： 获取选择上传的文件
    getFile(event) {
      this.file = event.target.files["0"];
      if (this.file) {
        this.showFile = true;
      }
    },
    //方法做的事情： 移除选择上传的文件
    removeFile() {
      this.file = "";
      this.showFile = false;
    },
    //方法做的事情： 1. 对上传的文件进行大小的限制以及类型的限制 2. 将选择的文件上传到后台
    async uploadFile() {
      //限制上传文件的大小不能超过2MB

      if (this.file.size > 2 * 1024 * 1024) {
        this.$message.warning("上传的文件不能大于2MB哦😯");
        return;
      }

      //限制上传文件文件只能是图片, 格式为 png|jpg|jpeg|.gif
      let type = this.file.type;
      if (!/(PNG|JPEG|JPG|GIF)/i.test(type)) {
        this.$message.warning("上传的文件类型不正确");
        return;
      }

      this.uploadStatus = true;

      //将选择的文件上传到服务器
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("filename", this.file.name);
      try {
        let res = await uploadSingle(formData);
        this.$message.success("上传文件成功");
        this.imgUrl = res.data.servicePath;
        this.uploadStatus = false;
        return Promise.reject();
      } catch (error) {
        this.$message.error("上传文件失败");
      }
      this.file = "";
      this.showFile = false;
      this.uploadStatus = false;
    },

    //方法做的事情： 拉起选择文件弹窗
    selectFile2() {
      const uploadIpu = document.querySelector(".upload_ipu2");
      uploadIpu.click();
    },
    //方法做的事情： 获取选择上传的文件,并将文件进行上传
    async getFile2(event) {
      this.file2 = event.target.files["0"];
      console.log(this.file2);

      //限制上传文件的大小
      if (this.file2.size > 900 * 1024 * 1024) {
        this.$message.warning("上传的文件不能大于2MB哦😯");
        return;
      }

      //限制上传文件的类型
      const type = this.file2.type;
      if (!/(video|PNG|JPG|JPEG|GIF)/i.test(type)) {
        this.$message.warning("上传的文件类型不正确");
        return;
      }

      this.progressStatus = true;
      //文件上传
      let formData = new FormData();
      formData.append("file", this.file2);
      formData.append("filename", this.file2.name);
      const res = await uploadSingle(formData, (loaded, total) => {
        this.uploadProgress = (loaded / total) * 100;
      });
      if (res.data.code == 0) {
        this.$message.success("文件上传成功");
        this.file2 = "";
        this.uploadProgress = 0;
        this.progressStatus = false;
      }
    },

    //方法做的事情： 拉起选择文件弹窗
    selectFile3() {
      const uploadIpu3 = document.querySelector(".upload_ipu3");
      uploadIpu3.click();
    },
    //方法做的事情： 获取选择上传的文件,并将文件进行上传
    async getFile3(event) {
      this.file3 = event.target.files["0"];

      //限制上传文件的大小
      if (this.file3.size > 2 * 1024 * 1024) {
        this.$message.warning("上传的文件不能大于2MB哦😯");
        return;
      }

      //限制上传文件的类型
      const type = this.file3.type;

      if (!/(PNG|JPG|JPEG|GIF)/i.test(type)) {
        this.$message.warning("上传的文件类型不正确");
        return;
      }

      // 1. 把选择的图片转化成base64格式
      let base64File = await this.changeBase64(this.file3);

      // console.log(base64File)
      // 2. 上传的时候要把请求头设置为application/x-www-form-urlencoded
      const res = await uploadSingleBase64({
        file: base64File,
        filename: this.file3.name,
      });

      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("图片上传成功");
        this.file3 = "";
        base64File = "";
        this.$message.success(res.data.servicePath);
      }
    },
    //方法做的事情: 将选择图片转化成base64的数据格式
    changeBase64(file) {
      return new Promise((resolve) => {
        let oFileReader = new FileReader();
        oFileReader.onload = (e) => {
          resolve(e.target.result);
        };
        oFileReader.readAsDataURL(file);
      });
    },

    //方法做的事情： 拉起选择文件弹窗
    selectFile4() {
      let dragFile = document.getElementById("drag_file");
      dragFile.click();
    },
    //方法做的事情： 获取选择上传的文件
    getFile4(event) {
      this.file4 = event.target.files["0"];
      if (!this.file4) return;
      this.ruleFile(this.file4);
    },
    //方法做的事情： 获取到拖拽上传的文件信息
    dropGetFile(event) {
      this.file4 = event.dataTransfer.files["0"];
      if (!this.file4) return;
      this.ruleFile(this.file4);
    },
    //方法做的事情： 对点击上传以及拖拽上传的文件进行大小限制以及类型限制
    async ruleFile(file) {
      //限制上传文件的大小
      if (file.size > 2 * 1024 * 1024) {
        this.$message.warning("上传的文件不能超过2MB~~");
        return;
      }
      //限制上传文件的类型
      let type = file.type;
      if (!/(png|jpg|jpeg|gif)/i.test(type)) {
        this.$message.warning("上传的文件只能是 PNG/JPG/JPEG 格式的~~");
        return;
      }

      //1. 把上传的文件转化成FormData类型的数据
      let formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);
      //2. 发送请求，开始上传
      const res = await uploadSingle(formData);
      if (res.data.code == 0) {
        this.$message.success("文件上传成功");
        this.file4 = "";
      }
    },

    //方法做的事情: 删除所选择的文件
    handleRemoveFile(index) {
      this.selectFiles.splice(index, 1);
    },
    //方法做的事情： 拉起选择文件弹窗
    selectFile5() {
      let multipleFile = document.getElementById("multiple_file");
      multipleFile.click();
    },
    //方法做的事情： 获取选择上传的文件
    getFile5(event) {
      this.selectFiles = Array.from(event.target.files);
    },
    //方法做的事情： 将数组所有的文件上传到服务器
    async uploadFile5() {
      if (this.selectFiles.length <= 0) {
        this.$message.warning("请选择要上传的文件");
      }

      let result = this.selectFiles.map(async (item) => {
        if (item.size > 2 * 1024 * 1024) {
          this.$message.warning("上传的文件不能超过2MB~~");
          return;
        }

        let formData = new FormData();
        formData.append("file", item);
        formData.append("filename", item.name);
        return uploadSingle(formData);
      });

      Promise.all(result)
        .then(() => {
          this.$message.success("恭喜您，所有文件都上传成功~~");
        })
        .catch(() => {
          this.$message.warning("很遗憾，上传过程中出现问题，请您稍后再试~~");
        })
        .finally(() => {
          this.selectFiles = [];
        });
    },

    //方法做的事情： 拉起选择文件弹窗
    selectFile6() {
      let alumb = document.getElementById("alum");
      alumb.click();
    },
    //方法做的事情： 获取选择上传的文件
    async getFile6(event) {
      this.file6 = event.target.files["0"];
      this.imgUrl2 = await this.changeBase64(this.file6);
    },
    //方法做的事情： 将选择的文件上传到服务器
    async uploadFile6() {
      if (!this.file6) {
        this.$message.warning("请选择上传的文件");
        return;
      }

      let { filename } = await this.changeBuffer(this.file6);

      let formData = new FormData();
      formData.append("file", this.file6);
      formData.append("filename", filename);

      const res = await uploadSingleName(formData);
      console.log(res);
    },
    //方法做的事情： 自动生成文件的名称
    changeBuffer(file) {
      return new Promise((resolve) => {
        //1. 实例化FileReader
        let fileReader = new FileReader();

        //2. 读取选择上传的文件
        fileReader.readAsArrayBuffer(file);

        //3. 获取到读取的要上传的文件信息
        fileReader.onload = (event) => {
          console.log(event);
          let buffer = event.target.result;
          let spark = new SparkMD5.ArrayBuffer();
          let HASH = "";
          let suffix = "";
          spark.append(buffer);
          HASH = spark.end();
          suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];

          resolve({
            buffer,
            HASH,
            suffix,
            filename: `${HASH}.${suffix}`,
          });
        };
      });
    },

    //方法做的事情： 拉起选择文件弹窗
    uploadFile7() {
      let maxFileUpload = document.getElementById("maxFileUpload");
      maxFileUpload.click();
    },
    //方法做的事情： 获取选择上传的文件, 并进行切片上传以及断点续传
    async getFile7(event) {
      this.file7 = event.target.files["0"];

      if (!this.file7) return;

      //1. 获取到文件的hash名称
      let { HASH, suffix } = await this.changeBuffer(this.file7);

      //2. 调用获取已经上传的切片的接口， 获取到已经上传的切片
      let already = [];
      try {
        already = (await uploadAlready(HASH)).data.fileList;
        console.log(already);
      } catch (e) {}

      //单价（切片的大小 max） * 数量（切片的数量 count ） = 总价（文件的大小 this.file7.size）

      //3. 对文件进行切片 (固定大小｜固定数量)
      let max = 1024 * 100; //切片的大小 100b
      let count = Math.ceil(this.file7.size / max); // 获取切片的数量
      let chunk = [];
      let index = 0;
      //如果count大于100就超出了切片的数量
      if (count > 100) {
        max = this.file7.size / 100;
        count = 100;
      }

      while (index < count) {
        chunk.push({
          file: this.file7.slice(index * max, (index + 1) * max),
          filename: `${HASH}_${index + 1}.${suffix}`,
        });
        index++;
      }

      //4. 上传切片
      chunk.forEach(async (item) => {
        //先判断already这个数组里面有没有已经上传的切换
        if (already.length > 0 && already.includes(item.filename)) {
          this.complate(HASH, count);
          return;
        }

        //上传没有传到后端的切片
        let formData = new FormData();
        formData.append("file", item.file);
        formData.append("filename", item.filename);

        const res = await uploadChunk(formData);
        console.log(res);
        if (res.data.code == 0) {
          this.complate(HASH, count);
          this.maxFileProgressStatus = true;
          return;
        }
      });
    },
    //5. 切换上传成功的方法
    async complate(HASH, count) {
      //管控进度条
      this.chunkIndex++;

      if (this.chunkIndex < count) return;

      this.chunkIndex = 100;
      //告诉后台所有的切片已传完
      try {
        const res = await uploadMerge({ HASH, count });
        console.log(res);
        if (res.data.code == 0) {
          this.videoPath = res.data.servicePath;
          this.maxFileProgressStatus = false;
          this.chunkIndex = 0;
        }
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.upload_container {
  padding: 40px;
}
.upload_container h3 {
  font-size: 18px;
  font-weight: 700;
}
.upload_box {
  border: 1px dashed #ddd;
  padding: 20px;
  width: 340px;
  min-height: 120px;
}
.upload_button {
  border: none;
  background: antiquewhite;
  color: #fff;
  font-size: 12px;
  text-align: center;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  margin-right: 10px;
  cursor: pointer;
}
.select {
  background: mediumpurple;
}
.upload {
  background: darkkhaki;
  position: relative;
}
.upload_tips {
  color: #3d3d3d;
  font-size: 12px;
  margin-top: 10px;
}
.upload_list {
  font-size: 12px;
  color: #3d3d3d;
  margin-top: 10px;
}
.upload_list em {
  margin-left: 10px;
  color: darkkhaki;
  cursor: pointer;
  vertical-align: middle;
  font-style: normal;
}
.upload_ipu {
  display: none;
}
.image_box {
  border: 1px dashed #ddd;
  padding: 20px;
  width: 340px;
  margin: 10px 0;
}
.disabled {
  background: #ccc;
}
.loading:after {
  position: absolute;
  content: "loading...";
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #ddd url("../assets/css/loading.gif") no-repeat 10px center;
  z-index: 999;
}
.upload_file {
  background: purple;
  position: relative;
}
.progress {
  height: 6px;
  background: #ccc;
  margin: 10px 0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}
.select_progress {
  width: 0;
  height: 100%;
  transition: width 0.5s;
  background: green;
  border-radius: 4px;
  position: absolute;
  overflow: hidden;
}
.upload_ipu2 {
  display: none;
}
.upload_file2 {
  background: #409eff;
}
.upload_ipu3 {
  display: none;
}
.upload_center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.mt5 {
  margin-top: 5px;
}
.click_upload {
  color: blueviolet;
  cursor: pointer;
}
.select5,
.select6 {
  background: #409eff;
}
.upload5,
.upload6 {
  background: #67c23a;
}
ul {
  list-style: none;
  margin-top: 10px;
}
ul li {
  font-size: 12px;
  color: #ddd;
  line-height: 30px;
}
ul li span {
  cursor: pointer;
  color: green;
}
h3 {
  margin-bottom: 20px;
  font-size: 14px;
}
.upload7 {
  background: #67c23a;
}

.video_box {
  width: 300px;
  height: 300px;
  border: 1px dashed #ddd;
  margin: 30px auto;
}
video {
  width: 100%;
  height: 100%;
}
</style>
