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
    monthlyFee: 3000
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

export const galleryImages = [
  { id: 1, alt: "Students in classroom", src: "/assets/gallery/image1.jpg" },
  { id: 2, alt: "Campus library", src: "/assets/gallery/image2.jpg" },
  { id: 3, alt: "Technology lab", src: "/assets/gallery/image3.jpg" },
  { id: 4, alt: "Group project", src: "/assets/classroom-bg.jpg" }
];
