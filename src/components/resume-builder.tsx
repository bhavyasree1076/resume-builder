'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'

interface ResumeBuilderProps {
  resumeData: any
  onDataChange: (data: any) => void
}

export function ResumeBuilder({ resumeData, onDataChange }: ResumeBuilderProps) {
  const [activeSection, setActiveSection] = useState('personal')

  const updateField = (field: string, value: any) => {
    onDataChange({ [field]: value })
  }

  const addArrayItem = (field: string, defaultItem: any) => {
    const currentArray = resumeData[field] || []
    onDataChange({ [field]: [...currentArray, defaultItem] })
  }

  const updateArrayItem = (field: string, index: number, item: any) => {
    const currentArray = resumeData[field] || []
    const newArray = [...currentArray]
    newArray[index] = item
    onDataChange({ [field]: newArray })
  }

  const removeArrayItem = (field: string, index: number) => {
    const currentArray = resumeData[field] || []
    const newArray = currentArray.filter((_: any, i: number) => i !== index)
    onDataChange({ [field]: newArray })
  }

  const moveArrayItem = (field: string, index: number, direction: 'up' | 'down') => {
    const currentArray = resumeData[field] || []
    const newArray = [...currentArray]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    
    if (newIndex >= 0 && newIndex < newArray.length) {
      [newArray[index], newArray[newIndex]] = [newArray[newIndex], newArray[index]]
      onDataChange({ [field]: newArray })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Section Navigation */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { id: 'personal', label: 'Personal Info' },
              { id: 'summary', label: 'Summary' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'languages', label: 'Languages' }
            ].map(section => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Form Content */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>
              {activeSection === 'personal' && 'Personal Information'}
              {activeSection === 'summary' && 'Professional Summary'}
              {activeSection === 'experience' && 'Work Experience'}
              {activeSection === 'education' && 'Education'}
              {activeSection === 'skills' && 'Skills'}
              {activeSection === 'projects' && 'Projects'}
              {activeSection === 'certifications' && 'Certifications'}
              {activeSection === 'languages' && 'Languages'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Personal Information */}
            {activeSection === 'personal' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Resume Title</Label>
                    <Input
                      id="title"
                      value={resumeData.title || ''}
                      onChange={(e) => updateField('title', e.target.value)}
                      placeholder="e.g., Software Engineer Resume"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={resumeData.fullName || ''}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.email || ''}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.phone || ''}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.location || ''}
                      onChange={(e) => updateField('location', e.target.value)}
                      placeholder="New York, NY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={resumeData.website || ''}
                      onChange={(e) => updateField('website', e.target.value)}
                      placeholder="https://johndoe.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={resumeData.linkedin || ''}
                      onChange={(e) => updateField('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={resumeData.github || ''}
                      onChange={(e) => updateField('github', e.target.value)}
                      placeholder="https://github.com/johndoe"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Summary */}
            {activeSection === 'summary' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={resumeData.summary || ''}
                    onChange={(e) => updateField('summary', e.target.value)}
                    placeholder="Write a brief professional summary highlighting your key qualifications and career goals..."
                    rows={6}
                  />
                </div>
              </div>
            )}

            {/* Experience */}
            {activeSection === 'experience' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Work Experience</h3>
                  <Button
                    onClick={() => addArrayItem('experience', {
                      company: '',
                      position: '',
                      startDate: '',
                      endDate: '',
                      current: false,
                      description: ''
                    })}
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
                
                {(resumeData.experience || []).map((exp: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveArrayItem('experience', index, 'up')}
                          disabled={index === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveArrayItem('experience', index, 'down')}
                          disabled={index === (resumeData.experience || []).length - 1}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('experience', index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Company</Label>
                        <Input
                          value={exp.company || ''}
                          onChange={(e) => updateArrayItem('experience', index, { ...exp, company: e.target.value })}
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <Label>Position</Label>
                        <Input
                          value={exp.position || ''}
                          onChange={(e) => updateArrayItem('experience', index, { ...exp, position: e.target.value })}
                          placeholder="Job Title"
                        />
                      </div>
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={exp.startDate || ''}
                          onChange={(e) => updateArrayItem('experience', index, { ...exp, startDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={exp.endDate || ''}
                          onChange={(e) => updateArrayItem('experience', index, { ...exp, endDate: e.target.value })}
                          disabled={exp.current}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Description</Label>
                      <Textarea
                        value={exp.description || ''}
                        onChange={(e) => updateArrayItem('experience', index, { ...exp, description: e.target.value })}
                        placeholder="Describe your responsibilities and achievements..."
                        rows={4}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Education */}
            {activeSection === 'education' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Education</h3>
                  <Button
                    onClick={() => addArrayItem('education', {
                      institution: '',
                      degree: '',
                      field: '',
                      startDate: '',
                      endDate: '',
                      gpa: ''
                    })}
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </div>
                
                {(resumeData.education || []).map((edu: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Education {index + 1}</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveArrayItem('education', index, 'up')}
                          disabled={index === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveArrayItem('education', index, 'down')}
                          disabled={index === (resumeData.education || []).length - 1}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('education', index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Institution</Label>
                        <Input
                          value={edu.institution || ''}
                          onChange={(e) => updateArrayItem('education', index, { ...edu, institution: e.target.value })}
                          placeholder="University Name"
                        />
                      </div>
                      <div>
                        <Label>Degree</Label>
                        <Input
                          value={edu.degree || ''}
                          onChange={(e) => updateArrayItem('education', index, { ...edu, degree: e.target.value })}
                          placeholder="Bachelor's, Master's, etc."
                        />
                      </div>
                      <div>
                        <Label>Field of Study</Label>
                        <Input
                          value={edu.field || ''}
                          onChange={(e) => updateArrayItem('education', index, { ...edu, field: e.target.value })}
                          placeholder="Computer Science, etc."
                        />
                      </div>
                      <div>
                        <Label>GPA</Label>
                        <Input
                          value={edu.gpa || ''}
                          onChange={(e) => updateArrayItem('education', index, { ...edu, gpa: e.target.value })}
                          placeholder="3.8"
                        />
                      </div>
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={edu.startDate || ''}
                          onChange={(e) => updateArrayItem('education', index, { ...edu, startDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={edu.endDate || ''}
                          onChange={(e) => updateArrayItem('education', index, { ...edu, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Skills */}
            {activeSection === 'skills' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Skills</h3>
                  <Button
                    onClick={() => addArrayItem('skills', {
                      name: '',
                      level: 'Intermediate',
                      category: 'Technical'
                    })}
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </div>
                
                {(resumeData.skills || []).map((skill: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Skill {index + 1}</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('skills', index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Skill Name</Label>
                        <Input
                          value={skill.name || ''}
                          onChange={(e) => updateArrayItem('skills', index, { ...skill, name: e.target.value })}
                          placeholder="JavaScript, React, etc."
                        />
                      </div>
                      <div>
                        <Label>Level</Label>
                        <Select
                          value={skill.level || 'Intermediate'}
                          onValueChange={(value) => updateArrayItem('skills', index, { ...skill, level: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select
                          value={skill.category || 'Technical'}
                          onValueChange={(value) => updateArrayItem('skills', index, { ...skill, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technical">Technical</SelectItem>
                            <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                            <SelectItem value="Languages">Languages</SelectItem>
                            <SelectItem value="Tools">Tools</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Projects */}
            {activeSection === 'projects' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Projects</h3>
                  <Button
                    onClick={() => addArrayItem('projects', {
                      name: '',
                      description: '',
                      technologies: [],
                      url: ''
                    })}
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </div>
                
                {(resumeData.projects || []).map((project: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Project {index + 1}</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('projects', index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Project Name</Label>
                        <Input
                          value={project.name || ''}
                          onChange={(e) => updateArrayItem('projects', index, { ...project, name: e.target.value })}
                          placeholder="Project Name"
                        />
                      </div>
                      <div>
                        <Label>Project URL</Label>
                        <Input
                          value={project.url || ''}
                          onChange={(e) => updateArrayItem('projects', index, { ...project, url: e.target.value })}
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Description</Label>
                      <Textarea
                        value={project.description || ''}
                        onChange={(e) => updateArrayItem('projects', index, { ...project, description: e.target.value })}
                        placeholder="Describe the project and your role..."
                        rows={3}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Certifications */}
            {activeSection === 'certifications' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Certifications</h3>
                  <Button
                    onClick={() => addArrayItem('certifications', {
                      name: '',
                      issuer: '',
                      date: '',
                      url: ''
                    })}
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Certification
                  </Button>
                </div>
                
                {(resumeData.certifications || []).map((cert: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Certification {index + 1}</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('certifications', index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Certification Name</Label>
                        <Input
                          value={cert.name || ''}
                          onChange={(e) => updateArrayItem('certifications', index, { ...cert, name: e.target.value })}
                          placeholder="AWS Certified Developer"
                        />
                      </div>
                      <div>
                        <Label>Issuer</Label>
                        <Input
                          value={cert.issuer || ''}
                          onChange={(e) => updateArrayItem('certifications', index, { ...cert, issuer: e.target.value })}
                          placeholder="Amazon Web Services"
                        />
                      </div>
                      <div>
                        <Label>Date</Label>
                        <Input
                          type="month"
                          value={cert.date || ''}
                          onChange={(e) => updateArrayItem('certifications', index, { ...cert, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Certificate URL</Label>
                        <Input
                          value={cert.url || ''}
                          onChange={(e) => updateArrayItem('certifications', index, { ...cert, url: e.target.value })}
                          placeholder="https://example.com/certificate"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Languages */}
            {activeSection === 'languages' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Languages</h3>
                  <Button
                    onClick={() => addArrayItem('languages', {
                      name: '',
                      proficiency: 'Intermediate'
                    })}
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Language
                  </Button>
                </div>
                
                {(resumeData.languages || []).map((lang: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Language {index + 1}</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('languages', index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Language</Label>
                        <Input
                          value={lang.name || ''}
                          onChange={(e) => updateArrayItem('languages', index, { ...lang, name: e.target.value })}
                          placeholder="English, Spanish, etc."
                        />
                      </div>
                      <div>
                        <Label>Proficiency</Label>
                        <Select
                          value={lang.proficiency || 'Intermediate'}
                          onValueChange={(value) => updateArrayItem('languages', index, { ...lang, proficiency: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Native">Native</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}