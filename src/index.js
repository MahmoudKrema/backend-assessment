import expressLoader from "./loaders/express.js";
import config from "./config/index.js";
import connectDB from "./loaders/mongodb.js";
import registerEventListeners from "./subscribers/index.js";
import eventEmitter from "./helpers/eventEmitter.js";


await connectDB();

expressLoader.listen(config.port, () => {

    console.log(`uptime-monitor app is listening on port ${config.port}`);
});

registerEventListeners();

eventEmitter.emit("backendStarted");