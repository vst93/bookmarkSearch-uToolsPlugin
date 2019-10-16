var text = ''
var t
var json_data
var li_key = 0
var input_text = ""
utools.onPluginEnter(({ code, type, payload }) => {
    // utools.setExpendHeight(0);
    if (code == 'search') {
        search_bookmark(text);
        utools.setSubInput(({ text }) => {
            this.text = text
            search_bookmark(text);
        }, "请输入需要查询的关键词");
        if (type == 'over') {
            utools.setSubInputValue(payload);
            search_bookmark(payload);
        }

    }
});

$(document).keydown(function (event) {
    event.preventDefault();
});


$(document).keydown(e => {
    switch (e.keyCode) {
        case 40:
            max_key = $(".content ul li").length - 1;
            li_key = li_key + 1;
            if (li_key > max_key) {
                li_key = 0;
                $(document).scrollTop(0);
            } else {
                $(document).scrollTop($(document).scrollTop() + 56)
            }
            selectLi();
            break;
        case 38:
            max_key = $(".content ul li").length - 1;
            li_key = li_key - 1;
            if (li_key < 0) {
                li_key = max_key;
                $(document).scrollTop($(document).height());
            } else {
                $(document).scrollTop($(document).scrollTop() - 56)
            }
            selectLi();
            break;
        case 39:
            url = $('.selected').children('.li-content').children(".li-url").text();
            window.openUrl(url)
            break;
        case 13:
            url = $('.selected').children('.li-content').children(".li-url").text();
            window.openUrl(url)
            break;
    }
});

function selectLi() {
    $(".content ul li").removeClass("selected")
    $(".content ul li:eq(" + li_key + ")").addClass("selected")
    selected_bottom_window = $(document).scrollTop() + $(window).height() - $(".selected").offset().top;
    if (selected_bottom_window < $(".selected").height()) {
        $(document).scrollTop($(".selected").offset().top - $(window).height() + $(".selected").height())
    }
    //已选项距离窗口距离
    selected_top_window = $(".selected").offset().top - $(document).scrollTop();
    if (selected_top_window < 0) {
        $(document).scrollTop($(".selected").offset().top)
    }
}


function search_bookmark(word) {
    word = word.toLowerCase();
    window.readBookmark(function (json_data) {
        if (json_data === false) {
            utools.showNotification('搜索失败', clickFeatureCode = null, silent = false)
            return;
        }
        var all_bk = json_data.roots.bookmark_bar.children.concat(json_data.roots.other.children)
        var all_bk_arr = Array();

        function arrToList(folder_arr, parent_id) {
            for (const iterator of folder_arr) {
                if (iterator.type === 'url') {
                    if (word.length > 0 && iterator.name.indexOf(word) === -1 && iterator.url.indexOf(word) === -1) {
                        continue
                    }
                    all_bk_arr.push({ "id": iterator.id, "name": iterator.name, "url": iterator.url, 'type': iterator.type, 'parent_id': parent_id })
                } else if (iterator.type === 'folder') {
                    arrToList(iterator.children, iterator.id)
                }
            }
        }

        arrToList(all_bk, "0");

        var li_html = "";

        for (const bk_iter of all_bk_arr) {
            favicon_src = '';

            var host_reg = /^(https?:\/\/[\w\.]*)/gim;
            while (host_reg_re = host_reg.exec(bk_iter.url)) {
                favicon_src = host_reg_re[1] + '/favicon.ico';
                break;
            }

            li_html = li_html +
                "<li>" +
                "<div class='li-favicon'><img src='" + favicon_src + "' onerror=\"this.onerror='';src='assets/bookmark_icon.png'\"></div>" +
                "<div class='li-content'><div class='li-name'>" + bk_iter.name +
                "</div><div class='li-url'>" + bk_iter.url + "</div></div>" +
                "</li>";
        }

        utools.setExpendHeight(544);

        $(".content").html("<ul>" + li_html + "</ul>");
        //绑定点击事件
        $('.content ul li').unbind('click');
        $('.content ul li').on("click", function () {
            url = $(this).children('.li-content').children(".li-url").text();
            window.openUrl(url)
        });

        li_key = 0;
        selectLi();
    });



}

