/**
 * 文档操作
 * @version 1.0.0
 * @author docwei
 */
layui.define(function(exports) {
  var $ = layui.jquery;
  var form = layui.form;

  var self = {};

  /**
   * 初始化
   * @param filter 表单lay-filter
   */
  self.init = function(filter,formId,validator) {
    this.filter1 = filter;
    this.filter2 = filter + "-submit";
    this.formID = formId;
    this.setValidate(validator);
    this.onsubmit();
    this.checkboxExclude();
  }
  /**
   * 传入数据与form表单匹配赋值
   * @param data 传入数据 
   */
  self.matchAssign = function(data) {
    var formValue = {}
    layui.each(data, function(key, value){
      formValue[key] = value;
    })
    form.val(this.filter1, formValue);   
  }
  /**
   * 设置表单验证
   */
  self.setValidate = function(validator) {
    form.verify(validator)
  } 
  /**
   * checkbox 选项排他处理
   */
  self.checkboxExclude = function() {
    $(this.formID).find("[checkbox-group]").each(function(index,dom) {
      //groups checkbox的name和exclude属性集合数组
      var groups = [];
      debugger
      $(this).find("[lay-filter]").each(function(index2,dom2){
        var exclude = $(this).attr("exclude");
        var name = $(this).attr('name');
        groups.push({
          exclude: exclude,
          name: name
        });
        form.on('checkbox('+ $(this).attr('lay-filter') +')', function(data){
          //获取表单数据
          var filed = form.val(self.filter1);
           //values checkboxvalue属性集合对象
          var values = {};
          if(data.elem.checked){
            //点击排他checkbox
            if(exclude == 1){
              layui.each(groups,function(i,group) {
                values[group.name] = false;
              })
              values[$(this).attr('name')] = data.value;
            }else {
              layui.each(groups,function(i,group) {
                if(group.exclude == 1){
                  values[group.name] = false;
                }
              }) 
            }
            filed = $.extend(filed,values);
            form.val(self.filter1, filed);
          }          
        });    
      })
    })
 
  }
  /**
   * 监听表单提交
   * @param callback 表单提交后续逻辑
   */
  self.onsubmit = function(callback) {
    form.on('submit(' + this.filter2 + ')', function(data){
      var filed = data.field; 
      console.log(filed)
      if(callback){
        callback();
      }
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
  }

  exports('document', self);
})