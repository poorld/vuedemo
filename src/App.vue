<template>
  <div id="app">
    <div style="text-align: center">
      <el-tooltip content="添加书本" placement="bottom" effect="light">
        <el-button type="success" icon="el-icon-circle-plus" @click="addBook()" circle></el-button>
      </el-tooltip>
    </div>

    <!-- table -->
    <el-table :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName">
    <el-table-column
      prop="name"
      label="书名">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格">
    </el-table-column>
    <el-table-column
      prop="time"
      label="出版时间">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="updateBook(scope.row)"><i class="el-icon-edit"></i></el-button>
        <el-button type="text" size="small" @click="delBook(scope.row)"><i class="el-icon-delete"></i></el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- update dialog -->
  <el-dialog title="编辑" :visible.sync="dialogFormVisible" @close="dialogClose()">
  <el-form :model="form" ref="book">

    <input type="hidden" v-model="form.id" />

    <el-form-item label="书名" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="作者" :label-width="formLabelWidth">
      <el-input v-model="form.author" auto-complete="off"></el-input>
    </el-form-item>
    
    <el-form-item label="价格" :label-width="formLabelWidth">
      <el-input v-model="form.price" auto-complete="off" type="number"></el-input>
    </el-form-item>

    <el-form-item label="时间" :label-width="formLabelWidth">
      <el-date-picker
      v-model="form.time"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="updateCancel()">取 消</el-button>
    <el-button type="primary" @click="updateconfirm()">确 定</el-button>
  </div>
</el-dialog>

  <!-- add dialog -->
  <el-dialog title="添加" :visible.sync="addBookVisible" @close="dialogClose()">
  <el-form :model="create" ref="create">


    <el-form-item label="书名" prop="name" :label-width="formLabelWidth">
      <el-input v-model="create.name" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="作者" prop="author" :label-width="formLabelWidth">
      <el-input v-model="create.author" auto-complete="off"></el-input>
    </el-form-item>
    
    <el-form-item label="价格" prop="price" :label-width="formLabelWidth">
      <el-input v-model="create.price" auto-complete="off" type="number"></el-input>
    </el-form-item>

    <el-form-item label="时间" prop="time" :label-width="formLabelWidth">
      <el-date-picker
      v-model="create.time"
      type="date"
      format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addcancel()">取 消</el-button>
    <el-button type="primary" @click="addconfirm()">确 定</el-button>
  </div>
</el-dialog>


  </div>
</template>

<script>
import Vue from 'vue'
import storage from './model/storage.js'
import moment from 'moment'
import ajax from './model/ajax.js'

export default {
  name: "app",
  methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      updateBook(book){
        this.form = book
        this.dialogFormVisible = true
      },
      addBook(){
        this.addBookVisible = true
      },
      addconfirm(){
        if (!this.checkValue(this.create))
          return;
        this.create.time = moment(this.create.time).format('YYYY-MM-DD')
        let api = this.path + '/book'
        let method = "POST"
        let postData = this.$qs.stringify(this.create)
        // console.log(obj)
        ajax.request(method,api,postData)
          .then((response) => {
            console.log(response)
            if (response.data.errorCode == 0){
              this.getBooks()
              this.$refs['create'].resetFields();
            }
          })
          .catch((error) => {
            console.log(error)
            this.$refs['create'].resetFields();
          })
        
        this.addBookVisible = false
        
      },
      /**
       * 更新书本
       */
      updateconfirm(){
        if (!this.checkValue(this.form))
          return ;
        let api = this.path + '/book'
        this.form.time = moment(this.form.time).format('YYYY-MM-DD')
        // console.log(this.form)
        let postData = this.$qs.stringify(this.form)
        let method = 'PUT'
        ajax.request(method,api,postData)
          .then((response) => {
            if (response.data.errorCode == 0){
              this.getBooks()
              //清除表单数据
              this.$refs['book'].resetFields()
            }
          })
          .catch((error) => {
            console.log(error)
          })
        this.dialogFormVisible = false
      },
      /**
       * 删除书本
       */
      delBook(book){
        let api = this.path + '/book/' + book.id
        this.$confirm('此操作将永久删除该书本, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let method = 'DELETE'
          ajax.request(method,api,null)
          .then((response) => {
            console.log(response)
            if (response.data.errorCode == 0){
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getBooks()
            }else {
              //异常
              this.$message({
                type: 'error',
                message: response.data.errorMsg
              });
            }
          })
        })
        .catch(() => {
            //取消删除
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },

      dialogClose(){
        
      },
      getBooks(){
        var api = this.path+ "/book"

        var method = 'GET'

        ajax.request(method,api,null)
          .then((response) => {
          console.log(response)
          this.tableData2 = response.data.data;
        },(error) => {

        })

      },
      /**
       * 更新书本弹窗关闭事件
       */
      updateCancel(){
        //清除表单数据
        this.$refs['book'].resetFields()
        this.dialogFormVisible = false
      },
      /**
       * 添加书本弹窗关闭事件
       */
      addcancel(){
        //清除表单数据
        this.$refs['create'].resetFields()
        this.addBookVisible = false
      },

      /**
       * 校验表单
       */
      checkValue(obj){
        for (var item in obj){
          var val = obj[item];
          if (val == "" || val == undefined || val == null){
            this.showMessage()
            return false
          }
        }
        return true
        /* if (JSON.stringify(obj) == "{}"){
          this.showMessage()
          return false
        } */
      },
      showMessage(){
        this.$message({
          message: '所有选项必填',
          type: 'warning'
        });
      },
    },
    data() {
      return {
        path: "http://localhost:8080/api",
        /**
         * dialog
         */
        formLabelWidth: '120px',
        //更新书本弹窗控制
        dialogFormVisible: false,
        form: {
          id: 0,
          name: '',
          author: '',
          price: '',
          time: '',
        },
        //添加书本弹窗控制
        addBookVisible: false,
        create: {
          name: '',
          author: '',
          price: '',
          time: '',
        },
        value1: '',
        itemIndex: 0,
        timeChange: false,
        /**
         * table
         */
        tableData2: [{
          id: 0,
          name: 'gg',
          author: 'gg',
          price: 0,
          time: '2017-12-12',
        }]
      }
    },
    mounted(){
      this.getBooks();
    }
};
</script>

<style>
  #app {
    width: 90%;
    margin: auto
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
