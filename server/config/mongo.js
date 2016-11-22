import mongoose from 'mongoose'
const db = mongoose.connection

export default () => {

    mongoose.Promise = global.Promise

    mongoose.connect('mongodb://localhost/away')

    db.on('error', err => {
        console.log(err, 'Mongo could not establish connection')
    })

    db.once('open', () => {
        console.log('Mongo established connection')
    })

    process.on('SIGINT', () => {
        console.log('Mongo connection has been terminated')
        process.exit(0)
    })
}
