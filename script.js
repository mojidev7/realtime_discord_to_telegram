import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { createClient } from "redis";
import * as winston from "winston";
import { Client } from "discord.js-selfbot-v13";
import * as schedule from "node-schedule";
import { config } from "./CONFIG.js";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "script.log" }),
  ],
});

const getCacheClient = async () => {
  try {
    const client = await createClient().connect();
    logger.info("Connected to redis successfully!");
    return client;
  } catch (error) {
    logger.error("Error connecting to the redis!", error);
    throw error;
  }
};

const processMessageCreate = async (cache, message) => {
  try {
    for (let c of config) {
      if (message.channel.id === c.discord) {
        logger.info(
          `New message detected: ${c.discord}:${message.id}:${message.content}`
        );

        // send that to TG
        const result = await axios.post(
          `https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`,
          {
            chat_id: c.tg,
            text: message.content,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        logger.info(
          `New message sent to TG: ${c.tg}:${message.id}:${message.content}`
        );
        await cache.set(message.id, result.data.result.message_id, {
          EX: Number(process.env.CACHE_HOUR) * 3600,
        });
      }
    }
  } catch (error) {
    logger.error("Error for handling new message!", error);
  }
};

const processMessageUpdate = async (cache, message) => {
  try {
    for (let c of config) {
      if (message.channel.id === c.discord) {
        logger.info(
          `Update message detected: ${c.discord}:${message.id}:${message.reactions.message.content}`
        );

        const tgMessageId = await cache.get(message.id);
        // send that to TG
        const result = await axios.post(
          `https://api.telegram.org/bot${process.env.TG_TOKEN}/editMessageText`,
          {
            chat_id: c.tg,
            text: message.reactions.message.content,
            message_id: tgMessageId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        logger.info(
          `Edit message sent to TG: ${message.id}:${message.reactions.message.content}`
        );
      }
    }
  } catch (error) {
    logger.error("Error for handling update message!", error?.data);
  }
};

const mainProcess = async () => {
  try {
    // craete redis cache
    const cache = await getCacheClient();
    const client = new Client();
    await client.login(process.env.DISCORD_TOKEN);

    // is connected to the discord?
    client.on("ready", async () => {
      logger.info(`${client.user.username} is ready!`);
    });

    // listen for new messages
    client.on("messageCreate", async (message) => {
      await processMessageCreate(cache, message);
    });

    client.on("messageUpdate", async (message) => {
      await processMessageUpdate(cache, message);
    });

    global.client = client;
    global.cache = cache;
  } catch (error) {
    logger.error("General error ocured!", error);
  }
};

const killProcess = async () => {
  try {
    logger.info("going to kill the process");
    await global.cache.disconnect();
    await global.client.destroy();
    global.cache = null;
    global.client = null;
  } catch (error) {
    logger.error("Failed to kill the process!", error);
  }
};

if (process.env.SCHEDULE === "TRUE") {
  const StartRule = new schedule.RecurrenceRule();
  StartRule.hour = Number(process.env.START_HOUR);
  StartRule.minute = Number(process.env.START_MINUTE);
  StartRule.tz = "Etc/UTC";

  const EndRule = new schedule.RecurrenceRule();
  EndRule.hour = Number(process.env.END_HOUR);
  EndRule.minute = Number(process.env.END_MINUTE);
  EndRule.tz = "Etc/UTC";

  schedule.scheduleJob(StartRule, async function () {
    logger.info("process started at", Date());
    await mainProcess();
  });

  schedule.scheduleJob(EndRule, async function () {
    logger.info("process started at", Date());
    await killProcess();
  });
} else {
  logger.info("running without schedule!");
  mainProcess();
}
