export class HttpError extends Error {
    constructor(message) {
        super(message)
        this.name = 'HttpError'
        Object.setPrototypeOf(this, new.target.prototype)
    }
}