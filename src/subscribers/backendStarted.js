import { checkService } from "../services/check/index.js";
import { pollingService } from "../services/polling/index.js";
import { checkRepo } from "../repos/check/index.js";
import { userRepo } from "../repos/user/index.js";
import eventEmitter from "../helpers/eventEmitter.js";

import cron from "node-cron";

let scheduledJobs = []; // Array to store the scheduled jobs

export default async function registerBackendStarted() {
  eventEmitter.on("backendStarted", async () => {
    const allChecks = await checkRepo.findAll();

    allChecks.forEach(async (check) => {

        const filter = {
            _id: check.user
        }
        const user = await userRepo.findOneByFilter(filter);

      const job = cron.schedule(`*/${check.interval} * * * *`, () => {
        pollingService.pollingRequest(check, user.email);
      });

      scheduledJobs.push(job); // Add the job to the array
    });
  });
  
}

// Function to stop all scheduled jobs
export function stopJobs() {
  scheduledJobs.forEach((job) => {
    job.stop(); // Stop the scheduled job
  });
}

// Function to restart all scheduled jobs
export async function restartJobs() {
  stopJobs(); // Stop the existing scheduled jobs

  scheduledJobs = []; // Clear the array

  const allChecks = await checkRepo.findAll();

  allChecks.forEach(async (check) => {
    const job = cron.schedule(`*/${check.interval} * * * *`, () => {
      pollingService.pollingRequest(check);
    });

    scheduledJobs.push(job); // Add the job to the array
  });
}