const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, index: true },
    mobNo: { type: String },
    password: { type: String },

}, { timestamps: true })

schema.pre("save", async function (next) {
    if(this.email) {
        this.email = this.email.toLowerCase().trim();
    }
    if(this.firstName || this.lastName){
        this.name = `${this.firstName ? `${this.firstName}` : ""}${this?.lastName || ""}`
    }

    if(this.password.length){
        const pass = await bcrypt.hash(this.password, 8);
        this.password = pass;
    }

    next();
})

schema.methods.isPasswordMatch = async function (password) {
    const user = this;

    if(user?.password?.length !== 0){
        return await bcrypt.compare(password, user.password);
    }
    return false
}

const user = mongoose.model('User', schema, 'user');

module.exports = {user: user, userSchema: schema}