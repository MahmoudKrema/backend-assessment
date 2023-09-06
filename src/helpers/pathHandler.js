import path from "path";
import config from "../config/index.js";


export default class PathHandler {
    
    
    static fileDomainPath(filePath) {
        
        let serverPath = path.join(`${config.host}:${config.port}/`, filePath);
        serverPath = serverPath.replaceAll("\\", "/");
        serverPath = `http://${serverPath}`;

        return serverPath;
    }

    static filePathWithoutDomain(filePath) {

        return filePath.replace(`${config.database.host}:${config.port}/`, "");
    }
}
