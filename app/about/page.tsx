"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"

const teamMembers = [
  {
    name: "Shariar Marjan",
    role: "Developer",
    image: "https://i.ibb.co.com/tpgzzVg8/marjan.jpg",  // Updated path to use public directory
    github: "https://github.com/yourgithub",
    linkedin: "https://linkedin.com/in/yourlinkedin",
  },
  {
    name: "Nerob",
    role: "Developer",
    image: "https://i.ibb.co.com/qLdDRZp9/nerob.jpg", // Add actual image path
    github: "https://github.com/member2",
    linkedin: "https://linkedin.com/in/member2",
  },
  {
    name: "Rumi",
    role: "Developer",
    image: "https://i.ibb.co.com/dwBdYTst/rumi.jpg", // Add actual image path
    github: "https://github.com/member3",
    linkedin: "https://linkedin.com/in/member3",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen mx-auto bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-soft-blue to-gentle-lavender py-20">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
        <div className="container relative mx-auto px-4">
          <div className="text-center">
            <h1 className="font-poppins text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              About Us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
              We are a team of dedicated students working to improve back health through technology.
            </p>
          </div>
        </div>
      </div>

      {/* Supervisor Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-20">
          <h2 className="mb-12 text-center font-poppins text-3xl font-bold text-rich-navy">
            Under the Supervision of
          </h2>
          <Card className="mx-auto max-w-md overflow-hidden bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="relative mb-6 h-40 w-40">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-soft-blue to-gentle-lavender blur" />
                <div className="relative rounded-full border-4 border-white bg-gray-200">
                  <Image
                    src="https://i.ibb.co.com/9JmDKX2/bari.jpg"
                    alt="Barikahar Sir"
                    width={160}
                    height={160}
                    className="rounded-full object-cover"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = "https://ui-avatars.com/api/?name=Barikahar&background=0D8ABC&color=fff";
                    }}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-rich-navy">Bari kahar Sir</h3>
              <p className="mt-2 text-lg text-muted-foreground">Project Supervisor</p>
              <p className="mt-4 text-center text-muted-foreground">
                Department of Computer Science & Engineering
              </p>
            </div>
          </Card>
        </div>

        {/* Team Members Section */}
        <div className="mb-16">
          <h2 className="mb-12 text-center font-poppins text-3xl font-bold text-rich-navy">
            Our Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card
                key={member.name}
                className="group relative overflow-hidden bg-white p-6 transition-all hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 opacity-0 
                  transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-6 h-32 w-32 transform transition-transform duration-300 
                    group-hover:scale-105">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-soft-blue 
                      to-gentle-lavender opacity-50 blur group-hover:opacity-100" />
                    <div className="relative h-full w-full rounded-full border-4 border-white">
                      <Image
                        src={member?.image}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-rich-navy">{member.name}</h3>
                  <p className="mb-4 text-muted-foreground">{member.role}</p>
                  <div className="flex gap-4">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-rich-navy transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-rich-navy transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <footer className="mt-16 text-center">
          <div className="inline-flex items-center rounded-full bg-gray-50 px-6 py-2">
            <p className="text-sm text-muted-foreground">
              Created with{" "}
              <span className="inline-block animate-pulse text-red-500">❤️</span>
              {" "}by{" "}
              <span className="font-medium text-rich-navy">Our Team</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
