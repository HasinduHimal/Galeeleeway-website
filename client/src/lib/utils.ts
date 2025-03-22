import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export const courseData = [
  {
    id: 1,
    title: "Comprehensive Education Course",
    description: "Our flagship course covering all essential subjects and skills for success in the modern world. Designed to provide a well-rounded education with hands-on experience.",
    icon: "graduation-cap",
    colorClass: "bg-primary/10",
    iconColorClass: "text-primary/60",
    duration: "2 Years",
    admissionFee: 500,
    monthlyFee: 3000,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isPopular: true
  },
  {
    id: 2,
    title: "Digital Marketing Fundamentals",
    description: "Learn essential digital marketing skills and strategies for the modern business landscape.",
    icon: "bullhorn",
    colorClass: "bg-secondary/10",
    iconColorClass: "text-secondary/60",
    duration: "6 Months",
    admissionFee: 300,
    monthlyFee: 2500,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isPopular: false
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description: "Comprehensive training in modern web technologies, frameworks and best practices.",
    icon: "code",
    colorClass: "bg-accent/10",
    iconColorClass: "text-accent/60",
    duration: "3 Months",
    admissionFee: 400,
    monthlyFee: 4000,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isPopular: false
  }
];

export const features = [
  {
    id: 1,
    title: "Quality Education",
    description: "Expert instructors and industry-relevant curriculum",
    icon: "graduation-cap",
    colorClass: "bg-primary/10",
    iconColorClass: "text-primary"
  },
  {
    id: 2,
    title: "Supportive Community",
    description: "Learn alongside peers in a collaborative environment",
    icon: "users",
    colorClass: "bg-secondary/10",
    iconColorClass: "text-secondary"
  },
  {
    id: 3,
    title: "Career Ready",
    description: "Develop skills that employers are looking for",
    icon: "briefcase",
    colorClass: "bg-accent/10",
    iconColorClass: "text-accent"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Digital Marketing Graduate",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    quote: "The knowledge and skills I gained at Galeeleeway have been instrumental in advancing my career. The instructors truly care about student success.",
    rating: 5
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Web Development Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    quote: "I enrolled with minimal coding experience and now I'm building full-stack applications. The practical approach to learning makes all the difference.",
    rating: 4.5
  },
  {
    id: 3,
    name: "Anita Patel",
    role: "Education Course Graduate",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    quote: "The comprehensive education program transformed my understanding of modern teaching methodologies. I'm now confidently leading classroom innovation.",
    rating: 5
  }
];

export const galleryImages = [
  { id: 1, alt: "Students in classroom", src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" },
  { id: 2, alt: "Campus library", src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 3, alt: "Technology lab", src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 4, alt: "Group project", src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" }
];

export const aboutContent = {
  mission: "Our mission at Galeeleeway Educational Institute is to empower students with innovative education solutions that prepare them for the challenges of the modern world.",
  vision: "We envision a world where quality education is accessible to all, enabling individuals to reach their full potential and contribute meaningfully to society.",
  history: "Established in 2010, Galeeleeway Educational Institute began with a small team of dedicated educators who shared a passion for transforming traditional education. Over the years, we have grown into a respected institution known for our innovative teaching methods and commitment to student success.",
  values: [
    {
      id: 1,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from teaching methods to administrative processes."
    },
    {
      id: 2,
      title: "Innovation",
      description: "We embrace new ideas and technologies to enhance the learning experience."
    },
    {
      id: 3,
      title: "Integrity",
      description: "We act with honesty, transparency, and ethical responsibility."
    },
    {
      id: 4,
      title: "Inclusivity",
      description: "We welcome diversity and create an environment where everyone feels valued."
    }
  ],
  team: [
    {
      id: 1,
      name: "Dr. Amit Singh",
      role: "Founder & Director",
      bio: "With over 20 years of experience in education, Dr. Singh has led initiatives to revolutionize teaching methodologies across multiple institutions."
    },
    {
      id: 2,
      name: "Prof. Meera Patel",
      role: "Academic Head",
      bio: "An expert in curriculum development, Prof. Patel ensures our programs remain at the cutting edge of educational standards."
    },
    {
      id: 3,
      name: "Vikram Reddy",
      role: "Digital Learning Specialist",
      bio: "Vikram brings technology expertise to create immersive digital learning experiences for our students."
    }
  ]
};
