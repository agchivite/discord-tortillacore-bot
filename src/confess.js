import { Events } from "discord.js";

const CONFESS_CHANNEL_ID =
    process.env.CONFESS_CHANNEL_ID || "1566779738352263168";

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

        try {
            const notice = await message.channel.send({
                content: `${message.author}, para escribir aquí debes poner \`/confess\`.`,
            });

            setTimeout(() => {
                notice.delete().catch(() => {});
            }, 5000);
        } catch (err) {
            console.error("[confess] no pude enviar el aviso:", err.message);
        }
    });
}
