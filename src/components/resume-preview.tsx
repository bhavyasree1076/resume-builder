'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Phone, Mail, Globe, Linkedin, Github } from 'lucide-react'

interface ResumePreviewProps {
  resumeData: any
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  const renderModernTemplate = () => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            {resumeData.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {resumeData.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {resumeData.email}
              </div>
            )}
            {resumeData.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {resumeData.phone}
              </div>
            )}
            {resumeData.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {resumeData.location}
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
            {resumeData.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <a href={resumeData.website} className="hover:underline">
                  {resumeData.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {resumeData.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                <a href={resumeData.linkedin} className="hover:underline">
                  LinkedIn
                </a>
              </div>
            )}
            {resumeData.github && (
              <div className="flex items-center gap-1">
                <Github className="w-4 h-4" />
                <a href={resumeData.github} className="hover:underline">
                  GitHub
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {resumeData.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Work Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp: any, index: number) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-2 top-6 w-0.5 h-full bg-gray-300"></div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {exp.position}
                        </h3>
                        <p className="text-lg text-blue-600 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </p>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu: any, index: number) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Technical', 'Soft Skills', 'Languages', 'Tools'].map(category => {
                const categorySkills = resumeData.skills.filter((skill: any) => skill.category === category)
                if (categorySkills.length === 0) return null
                
                return (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-700 mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill: any, index: number) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {skill.name} ({skill.level})
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Projects
            </h2>
            <div className="space-y-4">
              {resumeData.projects.map((project: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.name}
                    </h3>
                    {project.url && (
                      <a 
                        href={project.url} 
                        className="text-blue-600 hover:underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-700 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.certifications.map((cert: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800">
                    {cert.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {cert.issuer}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-600">
                      {formatDate(cert.date)}
                    </p>
                    {cert.url && (
                      <a 
                        href={cert.url} 
                        className="text-blue-600 hover:underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {resumeData.languages && resumeData.languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {resumeData.languages.map((lang: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{lang.name}</span>
                  <Badge variant="outline">{lang.proficiency}</Badge>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  const renderClassicTemplate = () => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border-2 border-gray-800">
      {/* Header */}
      <div className="bg-gray-800 text-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          {resumeData.fullName || 'Your Name'}
        </h1>
        <div className="text-lg space-y-1">
          {resumeData.email && <p>{resumeData.email}</p>}
          {resumeData.phone && <p>{resumeData.phone}</p>}
          {resumeData.location && <p>{resumeData.location}</p>}
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
          {resumeData.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <a href={resumeData.website} className="hover:underline">
                {resumeData.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {resumeData.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <a href={resumeData.linkedin} className="hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {resumeData.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <a href={resumeData.github} className="hover:underline">
                GitHub
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {resumeData.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-800 pb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed text-center">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-800 pb-2">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp: any, index: number) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {exp.position}
                  </h3>
                  <p className="text-lg text-gray-600 font-medium">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-800 pb-2">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu: any, index: number) => (
                <div key={index} className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-800 pb-2">
              SKILLS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Technical', 'Soft Skills', 'Languages', 'Tools'].map(category => {
                const categorySkills = resumeData.skills.filter((skill: any) => skill.category === category)
                if (categorySkills.length === 0) return null

                return (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-700 mb-2 text-center">{category}</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {categorySkills.map((skill: any, index: number) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {skill.name} ({skill.level})
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-800 pb-2">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {resumeData.projects.map((project: any, index: number) => (
                <div key={index} className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.name}
                  </h3>
                  {project.url && (
                    <a
                      href={project.url}
                      className="text-gray-600 hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                  {project.description && (
                    <p className="text-gray-700 leading-relaxed mt-2">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-800 pb-2">
              CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.certifications.map((cert: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-gray-800">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {cert.issuer}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {formatDate(cert.date)}
                    </p>
                    {cert.url && (
                      <a
                        href={cert.url}
                        className="text-gray-600 hover:underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {resumeData.languages && resumeData.languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-800 pb-2">
              LANGUAGES
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {resumeData.languages.map((lang: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{lang.name}</span>
                  <Badge variant="outline">{lang.proficiency}</Badge>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  const renderCreativeTemplate = () => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header with creative design */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2 tracking-wide">
            {resumeData.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {resumeData.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {resumeData.email}
              </div>
            )}
            {resumeData.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {resumeData.phone}
              </div>
            )}
            {resumeData.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {resumeData.location}
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
            {resumeData.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <a href={resumeData.website} className="hover:underline">
                  {resumeData.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {resumeData.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                <a href={resumeData.linkedin} className="hover:underline">
                  LinkedIn
                </a>
              </div>
            )}
            {resumeData.github && (
              <div className="flex items-center gap-1">
                <Github className="w-4 h-4" />
                <a href={resumeData.github} className="hover:underline">
                  GitHub
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary with creative styling */}
        {resumeData.summary && (
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              About Me
            </h2>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed text-lg">
                {resumeData.summary}
              </p>
            </div>
          </section>
        )}

        {/* Experience with creative cards */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Experience Journey
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp: any, index: number) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {exp.position}
                      </h3>
                      <p className="text-lg text-purple-600 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu: any, index: number) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-purple-600 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills with creative badges */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Technical', 'Soft Skills', 'Languages', 'Tools'].map(category => {
                const categorySkills = resumeData.skills.filter((skill: any) => skill.category === category)
                if (categorySkills.length === 0) return null

                return (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-700 mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill: any, index: number) => (
                        <Badge key={index} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Projects
            </h2>
            <div className="space-y-4">
              {resumeData.projects.map((project: any, index: number) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.name}
                    </h3>
                    {project.url && (
                      <a
                        href={project.url}
                        className="text-purple-600 hover:underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-700 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.certifications.map((cert: any, index: number) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800">
                    {cert.name}
                  </h3>
                  <p className="text-purple-600 font-medium">
                    {cert.issuer}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {formatDate(cert.date)}
                    </p>
                    {cert.url && (
                      <a
                        href={cert.url}
                        className="text-purple-600 hover:underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {resumeData.languages && resumeData.languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {resumeData.languages.map((lang: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{lang.name}</span>
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">{lang.proficiency}</Badge>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  const renderMinimalTemplate = () => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Minimal Header */}
      <div className="bg-white p-8 border-b border-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            {resumeData.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {resumeData.email && <p>{resumeData.email}</p>}
            {resumeData.phone && <p>{resumeData.phone}</p>}
            {resumeData.location && <p>{resumeData.location}</p>}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {resumeData.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-wide">
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-wide">
              Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-gray-600">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu: any, index: number) => (
                <div key={index}>
                  <h3 className="text-lg font-medium text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-gray-600">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-wide">
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {resumeData.skills.map((skill: any, index: number) => (
                <span key={index} className="text-gray-700">
                  {skill.name}
                  {index < resumeData.skills.length - 1 && ' • '}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  // Render the selected template
  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'classic':
        return renderClassicTemplate()
      case 'creative':
        return renderCreativeTemplate()
      case 'minimal':
        return renderMinimalTemplate()
      case 'modern':
      default:
        return renderModernTemplate()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div id="resume-content" className="resume-print-container">
        {renderTemplate()}
      </div>
      
      <style jsx global>{`
        .resume-print-container {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
        
        @media print {
          .resume-print-container {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          
          /* Preserve all colors and formatting in print */
          .resume-print-container *,
          .resume-print-container *:before,
          .resume-print-container *:after {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Preserve gradients with explicit values */
          .resume-print-container .bg-gradient-to-r.from-blue-600.to-blue-800 {
            background: linear-gradient(to right, #2563eb, #1e40af) !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .resume-print-container .bg-gradient-to-r.from-purple-600.via-pink-600.to-red-600 {
            background: linear-gradient(to right, #9333ea, #db2777, #dc2626) !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Preserve text colors */
          .resume-print-container .text-blue-600 { color: #2563eb !important; }
          .resume-print-container .text-purple-600 { color: #9333ea !important; }
          .resume-print-container .text-pink-600 { color: #db2777 !important; }
          .resume-print-container .text-gray-800 { color: #1f2937 !important; }
          .resume-print-container .text-gray-700 { color: #374151 !important; }
          .resume-print-container .text-gray-600 { color: #4b5563 !important; }
          .resume-print-container .text-white { color: #ffffff !important; }
          
          /* Preserve background colors */
          .resume-print-container .bg-blue-600 { background-color: #2563eb !important; }
          .resume-print-container .bg-purple-600 { background-color: #9333ea !important; }
          .resume-print-container .bg-pink-600 { background-color: #db2777 !important; }
          .resume-print-container .bg-gray-800 { background-color: #1f2937 !important; }
          .resume-print-container .bg-white { background-color: #ffffff !important; }
          
          /* Preserve border colors */
          .resume-print-container .border-blue-600 { border-color: #2563eb !important; }
          .resume-print-container .border-gray-800 { border-color: #1f2937 !important; }
          .resume-print-container .border-gray-300 { border-color: #d1d5db !important; }
          
          /* Preserve layout */
          .resume-print-container .flex { display: flex !important; }
          .resume-print-container .grid { display: grid !important; }
          .resume-print-container .text-center { text-align: center !important; }
          .resume-print-container .font-bold { font-weight: bold !important; }
          .resume-print-container .font-semibold { font-weight: 600 !important; }
        }
      `}</style>
    </div>
  )
}