import { Events } from "discord.js";

const CONFESS_CHANNEL_ID =
    process.env.CONFESS_CHANNEL_ID || "1512389701552701443";

export function registerConfess(client) {
    client.on(Events.MessageCreate, async (message) => {
        if (message.author.bot) return;
        if (message.channelId !== CONFESS_CHANNEL_ID) return;

        const text = message.content.trim().toLowerCase();

        if (text.startsWith("/confess")) return;

        try {
            await message.delete();
        } catch (err) {
            console.error("[confess] no pude borrar el mensaje:", err.message);
        }
    });
}
