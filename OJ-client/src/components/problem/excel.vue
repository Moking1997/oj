<!--  -->
<template>
  <div class>
    <el-button type="success" @click="dataVisible = true">批量添加题目</el-button>

    <el-dialog title="导入信息" :visible.sync="dataVisible" width="80%">
      <vue-xlsx-table @on-select-file="selectExcel" style="margin-right: 50px;">批量导入</vue-xlsx-table>
      <el-table :data="datalist">
        <el-table-column property="title" label="标题"></el-table-column>
        <el-table-column property="description" label="描述"></el-table-column>
        <el-table-column property="source" label="作者"></el-table-column>
        <el-table-column property="score" label="分值"></el-table-column>
        <el-table-column property="personal" label="是否私有">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>默认值为 0</p>
              <p>若输入自己的 id,则仅为自己可见</p>
              <div slot="reference" class="name-wrapper">{{ scope.row.personal }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column property="type" label="类型">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>默认值为空</p>
              <p>只能输入已有的题目分类</p>
              <div slot="reference" class="name-wrapper">{{ scope.row.type }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column property="tags" label="标签">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>默认值为,0,</p>
              <p>输入格式为:,0,1,2,</p>
              <p>其中 1 和 2表示 标签id 编号</p>
              <p>,0,即为无标签,0,1,为一维数组的标签,因为一维数组的标签 id 为 1</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.tags }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column property="catalogs" label="分类">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>默认值为,0,</p>
              <p>输入格式为:,0,1,2,</p>
              <p>其中 1 和 2表示 分类id 编号</p>
              <p>,0,即为无分类,0,1,9为C 语言下的循环,因为C语言id 为 1,循环 id 为 9</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" type="danger">{{ scope.row.catalogs }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column property="input" label="输入格式"></el-table-column>
        <el-table-column property="output" label="输出格式"></el-table-column>
        <el-table-column property="sample_input" label="输入样例"></el-table-column>
        <el-table-column property="sample_output" label="输出样例"></el-table-column>
        <el-table-column
          property="uploadState"
          label="状态"
          :filters="[{ text: '上传成功', value: '上传成功' }, { text: '上传失败', value: '上传失败' }]"
          :filter-method="filterTag"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.uploadState == '上传成功' ? 'success' : 'danger'"
              disable-transitions
            >{{scope.row.uploadState}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dataVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadServer()">确认提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataVisible: false,
      datalist: [
        {
          title: "示范行",
          description: "编程题",
          source: "admin",
          score: "10",
          tags: ",0,1,",
          personal: "8",
          type: "竞赛题",
          catalogs: ",0,1,9,",
          input: "俩个整数",
          output: " 俩个整数和",
          sample_input: " 10 20",
          sample_output: " 30",
          uploadState: "尚未上传"
        }
      ]
    };
  },
  methods: {
    selectExcel(excelData) {
      let datas = excelData.body;
      this.datalist = [];
      datas.forEach(element => {
        this.datalist.push(element);
      });
    },
    uploadServer() {
      this.datalist.forEach(async element => {
        let { data: res } = await this.$http.post("problem/add", element);
        if (res.state == 0) {
          this.$set(element, "uploadState", "上传成功");
        } else {
          this.$set(element, "uploadState", "上传失败");
        }
      });
      this.$message.success("题目已上传,可查看列表题目上传情况");
    },
    filterTag(value, row) {
      return row.uploadState == value;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>