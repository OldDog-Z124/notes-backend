const mongoose = require('mongoose')

const url = process.env.MONGODB_URI || 'mongodb+srv://olddogz124:nw3CGgpuTku15gD4@cluster0.2zfeqxk.mongodb.net/noteApp?retryWrites=true&w=majority'

console.log('connection to', url)

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note