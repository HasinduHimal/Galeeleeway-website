import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { features } from "@/lib/utils";

const Home = () => {
  return (
    <>
      <section id="hero" 
        className="hero-section text-white py-32 relative bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("/assets/DSC_3801.JPG")',
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
                src="/classroom.jpg" 
                alt="Students learning" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
