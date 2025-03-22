import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { features, courseData, testimonials } from "@/lib/utils";

const Home = () => {
  return (
    <>
      <section id="hero" 
        className="hero-section text-white py-32 relative bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        {/* Dark overlay to make text more readable */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
              Learning That Moves at the Speed of Thought
            </h2>
            <p className="text-xl mb-8">
              Empowering students with innovative education solutions since 2010
            </p>
            <Link href="/courses">
              <Button className="btn-animate bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-full">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-primary font-heading">
              Welcome to Galeeleeway Educational Institute
            </h3>
            <p className="text-lg mb-8">
              We provide innovative education solutions to help students achieve their goals and reach their full potential in today's competitive world.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {features.map((feature) => (
                <div key={feature.id} className="w-full md:w-1/3 mb-8 md:mb-0 flex flex-col items-center">
                  <div className={`w-20 h-20 ${feature.colorClass} flex items-center justify-center rounded-full mb-4`}>
                    <i className={`fas fa-${feature.icon} text-3xl ${feature.iconColorClass}`}></i>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 font-heading">{feature.title}</h4>
                  <p className="text-center text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-primary font-heading mb-6">
                Why Choose Galeeleeway?
              </h2>
              <p className="mb-4">
                At Galeeleeway Educational Institute, we believe in providing education that truly matters in today's rapidly evolving world. Our modern approach combines time-tested teaching methods with innovative technologies.
              </p>
              <p className="mb-6">
                Our instructors are industry veterans who bring real-world experience to the classroom, ensuring that you're not just learning theory, but practical skills that will make you job-ready.
              </p>
              <Link href="/about">
                <Button className="bg-primary hover:bg-primary/90 text-white btn-animate">
                  Learn More About Us
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Students learning" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary font-heading mb-4">
              Our Featured Courses
            </h2>
            <p className="text-lg">Discover our specially designed programs to advance your career</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseData.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="h-48 bg-gray-300 relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  {course.isPopular && (
                    <div className="absolute top-4 right-4 bg-secondary text-white text-sm py-1 px-3 rounded-full">
                      Popular
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 font-heading">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary font-semibold"><i className="fas fa-clock mr-2"></i>{course.duration}</span>
                    <span className="text-primary font-semibold">₹{course.monthlyFee}/month</span>
                  </div>
                  <Link href="/courses">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/courses">
              <Button className="btn-animate bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-full">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary font-heading mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg">Hear from those who have experienced our educational excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={`${testimonial.name} portrait`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold font-heading">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "{testimonial.quote}"
                </p>
                <div className="mt-4 text-secondary">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                  {testimonial.rating % 1 === 0.5 && (
                    <i className="fas fa-star-half-alt"></i>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-heading">
            Ready to Start Your Educational Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with Galeeleeway Educational Institute
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/courses">
              <Button className="btn-animate bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-full">
                Browse Courses
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="btn-animate bg-transparent hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full border-2 border-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
