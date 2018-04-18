export default {
    install(Vue,options) {
        function dropDownHandle(linkageOptions,callback) {
            //清空下拉列表项内容，进行初始化
            linkageOptions.bindingEle.children[1] && linkageOptions.bindingEle.removeChild(linkageOptions.bindingEle.children[1]);
            
            //调用方法时将dropDown挂载绑定
            let temp;
            if(linkageOptions.data) {
                let lis = "";
                linkageOptions.data.forEach(element => {
                    lis += '<li>'+ element +'</li>';
                });
                temp = '<ul class="dropDown" v-show="isShow">' + lis +'</ul>';
            }else {
                throw new Error("data参数传入有误");
            }
            let dropDownClass = Vue.extend({
                template: temp,
                data() {
                    return {    
                        isShow:false
                    }
                }
            });
            let dropDown = new dropDownClass;
            dropDown.$mount();
            linkageOptions.bindingEle.appendChild(dropDown.$el);
            linkageOptions.bindingEle.onclick = () => {
                dropDown.isShow = !dropDown.isShow;
            };

            //获取绑定的父元素下的所有子元素
            let arr = [];
            function getAllChildren(dom) {
                if(dom.children.length) {
                    for(var i=0;i<dom.children.length;i++) {
                        getAllChildren(dom.children[i]);
                        arr.push(dom.children[i]);
                    }
                }
                return arr;
            }
            let bindingEleArr = getAllChildren(linkageOptions.bindingEle);

            //点击非弹出列表区域时隐藏已经显示的下拉列表
            document.body.addEventListener('click',function(e) {
                if(dropDown.isShow) {
                    var flag = true;
                    for(var i=0;i<bindingEleArr.length;i++) {
                        if(e.target == bindingEleArr[i]){
                            flag = false;
                            break;
                        }
                    }
                    if(flag) {
                        dropDown.isShow = false;
                    }
                }
            },false);

            //给选中项添加点击事件
            for(var i=0;i<linkageOptions.bindingEle.children[1].children.length;i++) {
                linkageOptions.bindingEle.children[1].children[i].setAttribute("data-id",i);
                linkageOptions.bindingEle.children[1].children[i].onclick = function() {
                    if(callback) {
                        callback(this.getAttribute("data-id"));
                    }
                    this.parentNode.parentNode.children[0].value = this.innerHTML;
                    for(var j=0;j<linkageOptions.bindingEle.children[1].children.length;j++) {
                        linkageOptions.bindingEle.children[1].children[j].classList.remove("active");
                    }
                    this.classList.add("active");
                }
            }
        }
        //添加全局方法
        Vue.prototype.$dropDown = dropDownHandle;
    }
}