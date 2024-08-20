const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginSignUpTutorial")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("mongodb Fail")
})

// const LogInSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     password:{
//         type: String,
//         required: true
//     },
// })


const LogInSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String, 
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 6
    },
    country: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true,
        enum: ['instructor', 'learner']
    },
    schoolName: {
        type: String,
        required: function() {
            return this.accountType === 'instructor';
        }
    },
    jobTitle: {
        type: String,
        required: function() {
            return this.accountType === 'instructor';
        }
    },
    specialization: {
        type: [String],
        required: function() {
            return this.accountType === 'instructor';
        }
    }
});



const collection = new mongoose.model("Collection1", LogInSchema)

module.exports = collection