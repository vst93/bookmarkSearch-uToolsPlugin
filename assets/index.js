var text = ''
var t
var json_data
utools.onPluginEnter(({ code, type, payload }) => {
    utools.setExpendHeight(0);
    if(code == 'search'){
        utools.setSubInput(({text}) => {
            this.text = text
        }, "请输入需要查询的关键词");
        if(type=='over'){
            utools.setSubInputValue(payload);
            search_bookmark(payload);
        }
       
    }
});

$(document).keydown(e => {
    switch (e.keyCode) {
        case 13:
            search_bookmark(text)
            break;
    }
});


function search_bookmark(word){


    // console.log('appData:'+utools.getPath('appData'))
    // console.log('userData:'+utools.getPath('userData'))
    // console.log('home:'+utools.getPath('home'))
    // return;

    json_data = window.readBookmark();
    if(json_data===false){
        utools.showNotification('搜索失败', clickFeatureCode = null, silent = false)
        return;
    }




    return;


    if(word==''){
        return;
    }
    utools.setExpendHeight(544);
    $(".content").html('');
    


}

