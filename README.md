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

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mojidev7/realtime_discord_to_telegram.git
   cd realtime_discord_to_telegram
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Configure your environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your Discord and Telegram tokens
   ```

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

Run the bot with:

```bash
python main.py
```

For production deployment, consider using a process manager like PM2:

```bash
pm2 start main.py --name discord-telegram-relay --interpreter python3
```

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
