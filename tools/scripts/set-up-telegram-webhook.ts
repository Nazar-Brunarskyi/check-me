import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.telegram' });

async function run() {
  try {
    const telegramBotUrl = process.env.TELEGRAM_BOT_API_URL;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramWebhookUrl = process.env.TELEGRAM_BOT_WEBHOOK_URL;
    const telegramSecretToken = process.env.TELEGRAM_BOT_WEBHOOK_SECRET_TOKEN;

    if (!telegramBotUrl || !telegramBotToken || !telegramWebhookUrl) {
      throw new Error('Missing required environment variables');
    }

    const response = await axios.get(`${telegramBotUrl}${telegramBotToken}/setWebhook`, {
      params: {
        url: telegramWebhookUrl,
        secret_token: telegramSecretToken,
      },
    });

    console.table(response.data);
  } catch (error) {
    console.error(error);
  }
}

run();
