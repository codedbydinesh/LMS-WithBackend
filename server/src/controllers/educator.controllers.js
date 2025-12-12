import {clerkClient} from '@clerk/express'
import {v2 as cloudinary} from 'cloudinary';
import { Course } from '../models/course.model.js';
import { Purchase } from '../models/purchase.model.js';

// Update role to educator
export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth.userId;

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role:'educator',
            }
        })

        res.status(200).json({success: true, message: 'you can publish a course now'})

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


// Add new Course 
export const addCourse =  async (req, res) => {
    try {
        const {courseData} = req.body;
        const imageFile = req.file;
        const educatorId = req.auth.userId;
        if(!imageFile){
            return res.status(400).json({success:false, message: 'Course thumbnail is required'});
        }
        const parsedCourseData = await JSON.parse(courseData);

        parsedCourseData.educator = educatorId;

        const newCourse = await Course.create(parsedCourseData);
        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        newCourse.courseThumbnail = imageUpload.secure_url;
        await newCourse.save();

        res.status(200).json({success:true, message: 'Course created successfully'});

        
    } catch (error) {
        res.status(500).json({success:false, message: error.message});
    }
}

// Get Educator Courses
export const getEducatorCourses = async (req, res) => {
    try {
        const educator = req.auth.userId;

        const courses = await Course.find({educator});

        res.status(200).json({success:true, courses});

    } catch (error) {
        res.status(500).json({success:false, message: error.message});
    }
}

// Get Educator Dashboard Data (Total Earnings, Enrolled Students, No. of Courses)

export const getEducatorDashboardData = async (req, res) => {
    try {
        const educator = req.auth.userId;

        const courses = await Course.find({educator});
        const totalCourses = courses.length;

        const courseIds = courses.map(course => course._id);
        const purchases = await Purchase.find({courseId: {$in: courseIds}, status: 'completed'});
        const totalEarnings = purchases.reduce((total, purchase) => total + purchase.amount, 0);

        // Get unique enrolled student IDs with their titles 
        const enrolledStudentsData = [];

        // Iterate through each course to get enrolled students
        for(const course of courses){
            const students = await User.find({_id: {$in: course.enrolledStudents}}, 'name imageUrl');

            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                })
            })
        }

        // Send Response
        res.status(200).json({success:true, DashboardData: {
            totalCourses,
            totalEarnings,
            enrolledStudentsData
        }});
    } catch (error) {
        res.status(500).json({success:false, message: error.message});
    }
};



