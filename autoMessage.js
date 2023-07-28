import fs from "fs"
import qrcode from "qrcode-terminal"
import { MessageMedia } from "whatsapp-web.js"
import { generateQR, initializeClient, useClient } from "./components"

const client = initializeClient(),
    NUMBERS_FILE_PATH = "./numbers.txt",
    IMAGE_FILE_PATH = "./cat.png",
    MESSAGE = "Your Message"

generateQR(client, (qr) => {
    console.log("QR code received, scan it with your phone.")
    qrcode.generate(qr, { small: true })
})

useClient(client, async (client) => {
    const numbers = fs.readFileSync(NUMBERS_FILE_PATH, "utf-8")
        .split("\n")
        .map(number => number.trim())
        .filter(number => number.length > 0),
        imageBuffer = fs.readFileSync(IMAGE_FILE_PATH),
        imageMedia = new MessageMedia("image/png", imageBuffer.toString("base64"), "cat.png")

    for (const number of numbers) {
        const formattedNumber = `${number}@c.us`
        try {
            await client.sendMessage(formattedNumber, imageMedia, { caption: "Image Caption here" })
            await client.sendMessage(formattedNumber, MESSAGE)
            console.log(`Message and picture sent to ${number}`)
        } catch (error) {
            console.error(`Failed to send message and picture to ${number}: ${error.message}`)
        }
        await new Promise(resolve => setTimeout(resolve, 5000))
    }
    client.destroy()
})
initializeClient()