import { Client } from "whatsapp-web.js"
let client
export const createClient = () => {
    client = new Client()
    return client
},
    getClient = () => client,
    destroyClient = () => client.destroy(),
    initializeClient = () => client.initialize(),
    generateQR = (client, fn) => {
        client = createClient()
        client.on("qr", fn)
    },
    useClient = (client, fn) => {
        client = createClient()
        client.on("ready", () => { fn(client) })
    }