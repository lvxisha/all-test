var ddList = document.getElementsByTagName('dd');
var stuAdd = document.getElementById('student-add');
var stuList = document.getElementById('student-list');
var submit = document.getElementsByClassName('submit')[0];
var modal = document.getElementsByClassName('modal')[0];
var modalCon = document.getElementsByClassName('modal-con')[0];
var contentBox = document.getElementsByClassName('contentBox');
var tbody = document.getElementsByClassName('tbody');
var subBtn = document.getElementById('subBtn');
var searBtn = document.getElementById('searBtn')
var prevPage = document.getElementById('prev-page');
var nextPage = document.getElementById('next-page');
var inp = document.getElementById('searchCon');
var tableData =[];
var page = 1;//分页
var size = 3;
var totalPage = 0;
bindEven();
getTab();
function bindEven(){
    for(var i = 0; i < ddList.length; i ++){
        (function(m){
            ddList[m].onclick = function(){
                console.log(m)
                var activeList = document.getElementsByClassName('actived')
                for(var j = 0; j < activeList.length;j++){
                    // activeList[j].className = ''
                    activeList[j].classList.remove('actived')
                    contentBox[j].style.display = 'none';
                }
                ddList[m].className = 'actived';
                contentBox[m].style.display = 'block';
                if(m == 1){
                    stuAdd.style.display = 'block'
                }else{
                    stuAdd.style.display = 'none'
                }
                if(m == 0){
                    stuList.style.display = 'block'
                }else{
                    stuList.style.display = 'none'
                }
            }
        })(i)
    }
    modal.onclick = function (e) {  
        modal.style.display = 'none';
    }
    modalCon.onclick = function (e) {  
        console.log(e)
        e.cancelBubble = true;
    }
    // 添加学生的添加按钮
    submit.onclick = function(e){
        e.preventDefault();//阻止默认事件
        var form = document.getElementById('form');
        var data = addStu(form);
        // console.log(data)
        if(data){
            /* var res = serveData('http://open.duyiedu.com/api/student/addStudent',Object.assign({
                appkey: 'lvxisha_1580992738813'
            }, data))
            console.log(res);
            if(res.status != 'success'){
                alert(res.msg)
            }else{
                alert(res.msg);
                var ddA = document.getElementsByTagName('dd')[0];
                ddA.click();
                getTab();
            } */

            allReq('/api/student/addStudent',data,function(res){
                alert(res.msg);
                var ddA = document.getElementsByTagName('dd')[0];
                ddA.click();
                getTab();
            })
        }

    }
    // 编辑下的保存按钮
    subBtn.onclick = function(e){
        e.preventDefault();
        modal.style.display = 'none';
        updataReq();
    }
    tbody[0].onclick = function(e){
        if(e.target.tagName != 'BUTTON'){
            return false;
        }
        var isEdit = e.target.classList.contains('edit');
        var index = e.target.dataset.index;
        // console.log(tableData)
        if(isEdit){
            modal.style.display = 'block';
            renderEditForm(tableData[index]);
        }else{
            var flag = confirm('确定删除该学生么')
            // console.log(tableData[index].sNo)
            if(flag){
                allReq('/api/student/delBySno',{sNo:tableData[index].sNo},function(){
                    getTab();
                })
            }
        }
    }
    // 搜索按钮
    searBtn.onclick = function(){
        searchReq(inp.value);
    }
    prevPage.onclick = function(){
        prevPage.style.display = 'inline-block';
        nextPage.style.display = 'inline-block'
        console.log(inp.value)
        if(page > 1){
            page-- 
            if(inp.value){
                searchReq(inp.value)
            }else{
                getTab()
            }
        }else{
            alert('当前为第一页');
            return ;
        }
    }
    // 下一页
    nextPage.onclick = function(){
        nextPage.style.display = 'inline-block';
        prevPage.style.display = 'inline-block'
        if(page < totalPage){
            page++ 
            if(inp.value){
                searchReq(inp.value);
                console.log(1)
            }else{
                getTab();
                console.log(2)
            }
            
            if(page == totalPage){
                nextPage.style.display = 'none';
            }
        }
    }
}


// 向后端存储数据
function serveData(url, param) {
    var result = null;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (typeof param == 'string') {
        xhr.open('GET', url + '?' + param, false);
    } else if (typeof param == 'object'){
        var str = "";
        for (var prop in param) {
            str += prop + '=' + param[prop] + '&';
        }
        xhr.open('GET', url + '?' + str, false);
    } else {
        xhr.open('GET', url + '?' + param.toString(), false);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                result = JSON.parse(xhr.responseText);
            }
        }
    }
    xhr.send();
    return result;
}

// 修改学生信息
function updataReq(){
    var editForm = document.getElementById('student-edit-form');
    var data = addStu(editForm);
    allReq('/api/student/updateStudent',data,function () {  
        getTab();
    })
}
// 渲染table
function getTab(){
    ///api/student/findAll不分页
    allReq('/api/student/findByPage',{page:page,size:size},function(res){
        tableData = res.data.findByPage;
        totalCount = res.data.cont;
        totalPage = Math.ceil(totalCount / size);//总共多少页
        renderTab(res.data.findByPage,totalPage)
    })
}

// 渲染表格
function renderTab(data,totalPage){
    var str = '';
    if(data.length == 0){
        tbody[0].innerHTML = str;
        nextPage.style.display = 'none'
        prevPage.style.display = 'none'
        alert('暂无数据')
        return 
    }
    data.forEach(function(item, index){
        str += `<tr>
                <td>${item.sNo}</td>
                <td>${item.name}</td>
                <td>${item.sex == 0 ? '男':'女'}</td>
                <td>${item.email}</td>
                <td>${new Date().getFullYear() - item.birth}</td>
                <td>${item.phone}</td>
                <td>${item.address}</td>
                <td>
                    <button class="btn edit" data-index=${index}>编辑</button>
                    <button class="btn dele" data-index=${index}>删除</button>
                </td>
            </tr>`
    })
    if(totalPage == 1){
        nextPage.style.display = 'none'
        prevPage.style.display = 'none'
    }else{
        nextPage.style.display = 'inline-block'
        prevPage.style.display = 'inline-block'
    }
    tbody[0].innerHTML = str;
}
// 编辑表单的回填
function renderEditForm(data) {
    console.log(data)
    var form = document.getElementById('student-edit-form');
    for (var p in data) {
        if(form[p]) {
            form[p].value = data[p]
        }
    }
}
// 添加学生
function addStu(form){
    var name = form.name.value;
    var sex = form.sex.value;
    var sNo = form.sNo.value;
    var email = form.email.value;
    var birth = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    if(!sNo || !sex || !email || !birth || !phone || !address ){
        alert('基本信息不能为空')
        return false;
    } 
    if(!(/^\d{4,6}$/g).test(sNo)){
        alert('学号长度必须是4-6')
        return false;
    }
    if(!(/\d{11}/g).test(phone)){
        alert('手机号格式不正确')
        return false;
    }
    if(!(/\w+\@+/g).test(email)){
        alert('邮箱格式不正确')
        return false;
    }
    return{
            sNo,
            name,
            sex,
            birth,
            phone,
            address,
            email
    }
}
// 查询
function searchReq(inp){    
    var  data = {
        sex:-1,// -1表全部
        search:inp,//关键字
        page:page,//第几页的页数
        size:size,//每页显示的数量
    }
    allReq('/api/student/searchStudent',data,function(res){
        tableData = res.data.searchList;
        totalCount = res.data.cont;
        totalPage = Math.ceil(totalCount / size);//总共多少页
        renderTab(res.data.searchList,totalPage)
    })
}
// 封装请求
function allReq(url,data,fnc){
    var res = serveData('http://open.duyiedu.com' + url,Object.assign({
        appkey:'lvxisha_1580992738813'
    },data))
    if(res.status != 'success'){
        alert(res.msg);
    }else{
        fnc(res);
    }
}
