import { checkService } from "../services/check/index.js";
import { pollingService } from "../services/polling/index.js";
import { restartJobs } from "./backendStarted.js";


export default function registerCheckEvents() {

    checkService.on('checkCreated', async (checkDocument) => {

        await pollingService.createPolling(checkDocument);

        await restartJobs();
    });

    checkService.on('checkUpdated', async () => {

        await restartJobs();
    });

    checkService.on('checkDeleted', async () => {

        await restartJobs();
    }); 
}



