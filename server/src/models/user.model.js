import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
    _id: {
        type:String,
        required:true,
    },
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    profileImage: {
        type:String,
        required:true,
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course'
        }
        
    ],
      
},{timestamps:true})

export const User = mongoose.model('User', userSchema);