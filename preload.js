const fs = require("fs");
const shell = require('electron').shell;

readBookmark = (callback) => {
    var path = utools.getPath('appData')+'/../Local/Google/Chrome/User Data/Default/Bookmarks';
    fs.readFile(path, "utf-8", function(error, data) {
        if (error) {
            return false;
        }else{
            json_data = JSON.parse(data)
            callback(json_data);
        }
      });
}


openUrl = (url) => {
    if(url == ''){
        return
    }
    shell.openExternal(url);
}