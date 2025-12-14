import { Course } from "../models/course.model.js";

// Get All Courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({isPublished: true}).select('-courseContent -enrolledStudents').populate({path: 'educator'});

        res.status(200).json({success: true, courses});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

// Get Single Course Details by ID
export const getCourseDetailsById = async (req, res) => {
    const {id} = req.params;
    try {
        const courseData = await Course.findById(id).populate({path: 'educator'});

        // Remove lectureUrl if isPreview is false

        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl = "";
                }
            })
        })

        res.json({success: true, courseData});

    } catch (error) {
        res.status(500).json({success: false, message: error.message});

    }
};
