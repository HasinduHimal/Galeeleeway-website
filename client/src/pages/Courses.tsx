import { useState } from "react";
import { courseData } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const toggleCourseDetails = (courseId: number) => {
    setSelectedCourse(selectedCourse === courseId ? null : courseId);
  };

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-primary font-heading mb-6">Our Courses</h1>
            <p className="text-lg mb-0">Discover the perfect learning path for your career goals</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 gap-8">
              {courseData.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-64 md:h-auto">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold font-heading mb-3">{course.title}</h2>
                        {course.isPopular && (
                          <span className="bg-secondary text-white text-sm py-1 px-3 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-4">{course.description}</p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center">
                          <i className="fas fa-clock text-primary mr-2"></i>
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-money-bill-wave text-primary mr-2"></i>
                          <span>Admission: ₹{course.admissionFee}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-calendar-alt text-primary mr-2"></i>
                          <span>Monthly: ₹{course.monthlyFee}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button 
                          className="bg-primary hover:bg-primary/90 text-white"
                          onClick={() => toggleCourseDetails(course.id)}
                        >
                          {selectedCourse === course.id ? "Hide Details" : "View Details"}
                        </Button>
                      </div>
                    </div>
                  </div>
                  {selectedCourse === course.id && (
                    <div className="p-6 bg-gray-50 border-t">
                      <h3 className="text-xl font-semibold mb-4 font-heading">Course Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">What You'll Learn</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>In-depth knowledge of the subject matter</li>
                            <li>Practical skills through hands-on projects</li>
                            <li>Industry-standard best practices</li>
                            <li>Problem-solving techniques</li>
                            <li>Collaboration and communication skills</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Requirements</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Basic computer literacy</li>
                            <li>Dedicated time commitment</li>
                            <li>Willingness to learn and participate</li>
                            <li>Access to required materials</li>
                          </ul>
                          <div className="mt-6">
                            <h4 className="font-semibold mb-2">Start Dates</h4>
                            <p className="text-gray-700">New batches begin on the first Monday of every month</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center">
                        <Button className="bg-secondary hover:bg-secondary/90 text-white">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary font-heading mb-6">Admission Process</h2>
            <p className="mb-10">Follow these simple steps to enroll in any of our courses</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md relative">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2 font-heading">Choose a Course</h3>
                <p className="text-gray-600">Select the course that best fits your career goals</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md relative">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2 font-heading">Submit Application</h3>
                <p className="text-gray-600">Fill out our online application form</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md relative">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2 font-heading">Pay Fees</h3>
                <p className="text-gray-600">Process the admission and first month's fee</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md relative">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2 font-heading">Start Learning</h3>
                <p className="text-gray-600">Begin your educational journey with us</p>
              </div>
            </div>
            
            <div className="mt-12">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Download Information Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-heading">Ready to Advance Your Skills?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enrollment for all courses is now open. Limited seats available!
          </p>
          <Button className="btn-animate bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-full">
            Apply Now
          </Button>
        </div>
      </section>
    </>
  );
};

export default Courses;
