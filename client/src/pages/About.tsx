import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { aboutContent, galleryImages } from "@/lib/utils";

const About = () => {
  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-primary font-heading mb-6">About Galeeleeway Educational Institute</h1>
            <p className="text-lg mb-0">Transforming education since 2010</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-primary font-heading mb-6">Our Mission & Vision</h2>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 font-heading">Mission</h3>
                <p className="mb-4">{aboutContent.mission}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 font-heading">Vision</h3>
                <p>{aboutContent.vision}</p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Students in a classroom setting" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary font-heading mb-6 text-center">Our History</h2>
            <p className="mb-8">
              {aboutContent.history}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary font-heading mb-10">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aboutContent.values.map((value) => (
                <div key={value.id} className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-3 font-heading">{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary font-heading mb-10 text-center">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aboutContent.team.map((member) => (
                <div key={member.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                    <i className="fas fa-user text-3xl text-gray-400"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-1 font-heading">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-heading">Join Our Educational Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the Galeeleeway difference and transform your educational journey
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/courses">
              <Button className="btn-animate bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-full">
                Explore Courses
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

export default About;
