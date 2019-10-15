const fs = require("fs");

readBookmark = () => {
    var path = utools.getPath('appData')+'/../Local/Google/Chrome/User Data/Default/Bookmarks';
    console.log(path)
    fs.readFile(path, "utf-8", function(error, data) {
        if (error) {
            return false;
        }else{
            console.log(data)
            return data;
        }
      });
}
