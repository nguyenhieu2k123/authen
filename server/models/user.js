import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    id: {type: String}
});


var User = mongoose.model('user', userSchema)

export default User;