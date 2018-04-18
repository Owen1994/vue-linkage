# vue-linkage
最近在用vue，然后自己开发了个小插件，适用于做下拉菜单以及多级联动。

插件使用说明：
1. 在main.js中导入并use
2. 注册了一个全局方法$dropDown(options,callback)
3. options为一个对象,内部传参说明如下：
    * bindingEle：绑定下拉框的父元素
    * data：一个数组，为下拉框的选项内容
4. callback(function(dataId){}):callback为上一个下拉框某个选项点击后的回调函数，内部接受该点击选项的属性data-id值。callback主要进行下个下拉框的选项内容进行初始化，即多级联动

下面为二级联动的演示代码：
1. template: （行内样式style需添加上）
``` html
<div ref="test1" style="position:relative;display:inline-block;">
    <input placeholder="自定义选项1" disabled />
</div>
<div ref="test2" style="position:relative;display:inline-block;">
    <input placeholder="自定义选项2" disabled />
</div>
 ```
2. script:
``` javascript
var _this = this;
this.$dropDown({
    data:['自定义选项1','自定义选项2'],
    bindingEle: this.$refs.test1
},function(dataId) {
    var data;
    if(dataId == 0) {
        data = ['自定义选项1数据一','自定义选项1数据二'];
    }else {
        data = ['自定义选项2数据一','自定义选项2数据二'];
    }
    _this.$dropDown({
        data:data,
        bindingEle: _this.$refs.test2
    });
    //以下为上个选项选中后，此下拉框默认选中首项的操作
    _this.$refs.test2.children[0].value = data[0];
    _this.$refs.test2.children[1].children[0].classList.add("active");
})
```
3. css:（可自定义样式）
``` css
.dropDown {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    z-index: 100;
    background-color: #fff;
    border: 1px solid rgb(169, 169, 169);
}
.dropDown li:hover {
    background-color: rgb(51, 132, 210);
}
.dropDown li.active {
    background-color: rgb(51, 132, 210);
}
```
  
