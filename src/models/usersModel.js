const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcryptjs');;


const schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String, 
        required: true,
        select: false
    },
    created_At: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_At:{
        type: Date
    }
});

schema.pre('save', async function (next) {
    const hash =  await bcrypt.hash(this.password, 10);
    this.password = hash;
    
    next();
})

module.exports = mongoose.model('Users', schema, 'users')