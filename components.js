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
/**
 * This function takes an array of methods and an input and calls the methods in the array in order
 * @param {Array} methods array of methods to be called
 * @param {any} input input to be passed to the first method
 */
export const pipeline = (methods, input) => {
    methods.reduce((prev, curr) => {
        return prev(curr(input))
    }, input)
}

export const useState = () => {
    let state
    const setState = (newState) => {
        state = newState
    }
    const getState = () => state
    return [getState, setState]
}
/**
 * Inspired by Python's range function, this function returns an array of numbers from start to stop with a step between each number
 * @param {Number} start start of the range
 * @param {Number} stop end of the range
 * @param {Number} step step between each number
 * @returns 
 */
export const range = (start, stop, step) => {
    if (start === end) return [start]
    if (start > stop) return []
    if (step === undefined) step = 1
    return [start, ...range(start + step, stop, step)]
}

const rangeBeta = (start, stop, step) => {
    let result = []
    if (start === end) return [start]
    if (start > stop) return []
    if (step === undefined) step = 1

    for (let i = start; i < stop; i += step) {
        result.push(i)
    }
    while (start < stop) {
        result.push(start)
        start += step
    }
    return result
}

for (const n in range(0, 5)) {
    if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];

    }
}