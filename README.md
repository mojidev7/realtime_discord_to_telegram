# Discord to Telegram Relay Bot

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A real-time message relay system that forwards messages from Discord channels to Telegram chats seamlessly.

## 🌟 Features

- **Real-time Forwarding**: Instantly relay messages from Discord to Telegram
- **Channel Mapping**: Configure specific Discord channels to forward to designated Telegram chats
- **Media Support**: Transfer images, videos, and other attachments between platforms
- **Formatting Preservation**: Maintain message formatting when possible
- **Customizable Notifications**: Configure how messages appear in Telegram
- **Webhook Integration**: Reliable message delivery using Discord's webhook system

## 📋 Prerequisites

- Python 3.8+
- Discord Bot Token
- Telegram Bot Token
- Discord Server with admin permissions
- Telegram group/channel where bot is admin

## 🚀 Installation & Setup

1. Unzip this project in your desired directory.

2. Run these commands to install requirements:

   ```bash
   chmod +x requirements.bash
   bash requirements.bash
   ```

3. Grab your Telegram channel ID using [this tutorial](https://neliosoftware.com/content/help/how-do-i-get-the-channel-id-in-telegram/) and add it to the `.env` file as `TG_CHANNEL_ID`.

4. Get your Telegram bot token from [@BotFather](https://t.me/botfather) and add it to the `.env` file as `TG_TOKEN`.

5. Get your Discord token:

   - Login to Discord using your browser
   - Open developer tools and navigate to the console tab
   - Run: `allow paste`
   - Paste this script to copy your Discord token to clipboard:

   ```javascript
   window.webpackChunkdiscord_app.push([
     [Math.random()],
     {},
     (req) => {
       if (!req.c) return;
       for (const m of Object.keys(req.c)
         .map((x) => req.c[x].exports)
         .filter((x) => x)) {
         if (m.default && m.default.getToken !== undefined) {
           return copy(m.default.getToken());
         }
         if (m.getToken !== undefined) {
           return copy(m.getToken());
         }
       }
     },
   ]);
   console.log("%cWorked!", "font-size: 50px");
   console.log(
     `%cYou now have your token in the clipboard!`,
     "font-size: 16px"
   );
   ```

   - Add this token to the `.env` file as `DISCORD_TOKEN`

6. Get your Discord channel ID:

   - Enable developer mode in Discord settings
   - Right-click on your desired channel and select "Copy Channel ID"
   - Add this ID to the `.env` file as `DISCORD_CHANNEL_ID`

7. Configure your schedule options in the `.env` file:

   ```
   CACHE_HOUR=1     # How many hours to wait for message edits
   START_HOUR=18    # Start hour of the session in UTC
   START_MINUTE=58  # Start minute of the session in UTC
   END_HOUR=18      # End hour of the process in UTC
   END_MINUTE=59    # End minute of the process in UTC
   ```

8. Start the process using:
   ```bash
   npm start
   ```
   The bot will run according to the schedule and also start automatically after system reboot.

**Note:**

- Monitor the app with: `pm2 status`
- All logs are saved in the `script.log` file

## ⚙️ Configuration

Edit the `config.json` file to map Discord channels to Telegram chats:

```json
{
  "channel_mapping": [
    {
      "discord_channel_id": "YOUR_DISCORD_CHANNEL_ID",
      "telegram_chat_id": "YOUR_TELEGRAM_CHAT_ID"
    }
  ],
  "message_format": "{username}: {message}"
}
```

## 🔧 Usage

After setup, the bot will automatically forward messages based on your configuration and schedule. No additional intervention is required unless you want to modify settings.

## 📝 Example

When a message is sent in a configured Discord channel:

```
User123: Hello world! Check out this image.
[Image attachment]
```

It appears in the linked Telegram chat as:

```
Discord | User123: Hello world! Check out this image.
[Forwarded image]
```

## 🔒 Security

- Bot tokens should be kept secure and never committed to version control
- Use Discord permission system to limit the bot's access
- Monitor the bot's activity regularly

## ☕ Support the Project

If you find this project helpful, consider supporting its development:

- **TRX Address**: `TCg3ob3sZppwqKB4HXY3vwrHooUeXrwAta`
- **Contact me on Telegram**: [@eylord](https://t.me/eylord)

Your support helps maintain and improve this project!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- [Discord.py](https://discordpy.readthedocs.io/) for Discord API integration
- [python-telegram-bot](https://python-telegram-bot.readthedocs.io/) for Telegram API integration

---

Made with ❤️ by [mojidev7](https://github.com/mojidev7)
