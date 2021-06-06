/*
*非特殊表单项验证
*/  
var formValidator1 = {
  heightRange: function(value, item){
    if(value > 300 || value < 30){
      return '输入身高值不合理'
    }
  },
  positiveInteger: [
    /^[1-9]\d*$/,
    '只能填写正整数'
  ],
  //radio/checkbox 验证
  required2: function(value,item){
    var $ = layui.$;
    var verifyType=$(item).attr('type')
    ,verifyName= verifyType=='radio' ? $(item).attr('name') : $(item).attr('name').split("__")[0]
    ,formElem=$(item).parents('.layui-form')//获取当前所在的form元素，如果存在的话
    ,verifyElem=formElem.find('input[name^='+verifyName+']')//获取需要校验的元素
    ,isTrue= verifyElem.is(':checked')//是否命中校验
    ,focusElem = verifyElem.next().find('i.layui-icon');//焦点元素
    if(!isTrue || !value){
      //定位焦点
      verifyType=='radio'?focusElem.addClass('layui-color-danger'):focusElem.addClass('layui-border-danger');
      //对非输入框设置焦点
      focusElem.first().attr("tabIndex","1").css("outline","0").blur(function() {
        verifyType=='radio'?focusElem.removeClass('layui-color-danger'):focusElem.removeClass('layui-border-danger');
       }).focus();
      return '必填项不能为空';
    }
  }    
};
layui.use(['document'],function() {
  var $ = layui.jquery;
  var form = layui.form;
  var laydate= layui.laydate;
  var document = layui.document;

  /**
  *渲染form dom
  */
  self.renderForm = function() {
    form.render();
    $("[date=date]").each(function(index,dom){
      laydate.render({
        elem: dom
      });
    })
  }; 
  /**
   * 初始化表单数据
   */
  self.initForm = function() {
    document.init("form-test","#form-test", formValidator1);
    document.matchAssign({
      height: 170
    })   
  }
  self.renderForm(); 
  self.initForm();  
});