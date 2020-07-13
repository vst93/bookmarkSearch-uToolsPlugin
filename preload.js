const fs = require("fs");
const shell = require('electron').shell;
var os = require("os")
const { clipboard } = require('electron')

getConfData = (callback) => {
    fs.readFile(conf_path, "utf-8", function (error, data) {
        if (error) {
            callback('');
        } else {
            callback(data);
        }
    });
}

delConfData = (callback) => {
    fs.unlink(conf_path, function (error) {
        callback();
    })
}


saveConfData = (data, callback) => {
    fs.mkdir(myapp_path, function (error) {
        if (error) {
            console.log(error);
        }
    })
    fs.writeFile(conf_path, data, 'utf8', function (error) {
        if (error) {
            console.log(error)
        } else {
            callback();
        }
    })
}

readBookmark = (callback) => {
    getConfData(function (data) {
        var path = '';
        if (data != '') {
            path = data;
        } else if (os.type() === 'Windows_NT') {
            path = utools.getPath('appData') + '/../Local/Google/Chrome/User Data/Default/Bookmarks';
        } else if (os.type() === 'Darwin') {
            path = utools.getPath('appData') + '/Google/Chrome/Default/Bookmarks';
        } else if (os.type() === 'Linux') {
            path = utools.getPath('appData') + '/google-chrome/Default/Bookmarks'
        }
        fs.readFile(path, "utf-8", function (error, data) {
            if (error) {
                utools.showNotification('未找到Chrome默认书签文件，如使用其他Chromium内核浏览器，请修改书签文件路径', clickFeatureCode = null, silent = false)
                return false;
            } else {
                json_data = JSON.parse(data)
                callback(json_data);
            }
        });
    });

}

cheackBookmarkPath = (in_path, callback) => {
    fs.readFile(in_path, "utf-8", function (error, data) {
        if (error) {
            utools.showNotification('未找到所设置的书签文件', clickFeatureCode = null, silent = false)
            return false;
        } else {
            callback();
        }
    });
}

openUrl = (url) => {
    if (url == '') {
        return
    }
    shell.openExternal(url);
}

getFilePath = ()=>{
    var reg = new RegExp("^file\:\/\/", "mi");
    filePath = clipboard.read('public.file-url')
    filePath = filePath.replace(reg,'');
    return decodeURI(filePath)
}
