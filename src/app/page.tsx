'use client'

import { useState, useEffect } from 'react'
import { ResumeBuilder } from '@/components/resume-builder'
import { ResumePreview } from '@/components/resume-preview'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, Eye, Edit, Save, FolderOpen, Trash2, Printer } from 'lucide-react'
import { exportToPDFWithRetry, exportToPDFFallback } from '@/lib/pdf-export'
import { toast } from 'sonner'
import { TemplateSelector } from '@/components/template-selector'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function Home() {
  const [activeTab, setActiveTab] = useState('edit')
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [savedResumes, setSavedResumes] = useState<any[]>([])
  const [currentUserId, setCurrentUserId] = useState('demo-user')
  const [isLoading, setIsLoading] = useState(false)
  const [resumeData, setResumeData] = useState({
    title: 'My Resume',
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    template: 'modern'
  })

  // Initialize user on component mount
  useEffect(() => {
    initializeUser()
  }, [])

  useEffect(() => {
    if (currentUserId && currentUserId !== 'demo-user') {
      loadSavedResumes()
    }
  }, [currentUserId])

  const initializeUser = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'demo@example.com',
          name: 'Demo User'
        })
      })
      
      if (response.ok) {
        const user = await response.json()
        setCurrentUserId(user.id)
      }
    } catch (error) {
      console.error('Error initializing user:', error)
    }
  }

  const handleResumeDataChange = (newData: any) => {
    setResumeData(prev => ({ ...prev, ...newData }))
  }

  const handleExportPDF = async () => {
    if (!resumeData.fullName) {
      toast.error('Please fill in your name before exporting.')
      return
    }

    try {
      toast.loading('Generating PDF...', { id: 'pdf-export' })
      await exportToPDFWithRetry('resume-content', `${resumeData.fullName || 'resume'}_${Date.now()}.pdf`)
      toast.success('Resume exported successfully!', { id: 'pdf-export' })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to export resume. Please try again.', { id: 'pdf-export' })
      console.error('PDF export error:', error)
    }
  }

  const handleSaveResume = async () => {
    if (!resumeData.fullName || !resumeData.email) {
      toast.error('Please fill in at least your name and email before saving.')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUserId,
          ...resumeData
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        toast.success('Resume saved successfully!')
        loadSavedResumes()
      } else {
        toast.error(data.error || 'Failed to save resume')
        console.error('Save error:', data)
      }
    } catch (error) {
      toast.error('Failed to save resume. Please try again.')
      console.error('Save error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadSavedResumes = async () => {
    if (!currentUserId || currentUserId === 'demo-user') {
      return
    }
    
    try {
      const response = await fetch(`/api/resumes?userId=${currentUserId}`)
      if (response.ok) {
        const resumes = await response.json()
        setSavedResumes(resumes)
      } else {
        console.error('Failed to load resumes')
      }
    } catch (error) {
      console.error('Load resumes error:', error)
    }
  }

  const loadResume = (resume: any) => {
    setResumeData({
      title: resume.title,
      fullName: resume.fullName,
      email: resume.email,
      phone: resume.phone,
      location: resume.location,
      website: resume.website,
      linkedin: resume.linkedin,
      github: resume.github,
      summary: resume.summary,
      experience: resume.experience || [],
      education: resume.education || [],
      skills: resume.skills || [],
      projects: resume.projects || [],
      certifications: resume.certifications || [],
      languages: resume.languages || [],
      template: resume.template
    })
    toast.success('Resume loaded successfully!')
  }

  const deleteResume = async (resumeId: string) => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        toast.success('Resume deleted successfully!')
        loadSavedResumes()
      } else {
        toast.error('Failed to delete resume')
      }
    } catch (error) {
      toast.error('Failed to delete resume')
      console.error('Delete error:', error)
    }
  }

  const handlePrintResume = async () => {
    if (!resumeData.fullName) {
      toast.error('Please fill in your name before printing.')
      return
    }

    try {
      toast.loading('Preparing print...', { id: 'print-resume' })
      await exportToPDFFallback('resume-content', `${resumeData.fullName || 'resume'}_${Date.now()}.pdf`)
      toast.success('Print window opened!', { id: 'print-resume' })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to prepare resume for printing.', { id: 'print-resume' })
      console.error('Print error:', error)
    }
  }

  const handleTemplateChange = (templateId: string) => {
    handleResumeDataChange({ template: templateId })
    setShowTemplateDialog(false)
    toast.success(`Template changed to ${templateId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-lg text-gray-600 mb-6">Create professional resumes in minutes</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={handleSaveResume} variant="outline" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Resume'}
            </Button>
            
            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Change Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Choose a Template</DialogTitle>
                </DialogHeader>
                <TemplateSelector 
                  selectedTemplate={resumeData.template}
                  onTemplateChange={handleTemplateChange}
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={loadSavedResumes}>
                  <FolderOpen className="w-4 h-4 mr-2" />
                  My Resumes ({savedResumes.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>My Saved Resumes</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {savedResumes.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No saved resumes yet</p>
                  ) : (
                    savedResumes.map((resume) => (
                      <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{resume.title}</h3>
                          <p className="text-sm text-gray-600">{resume.fullName || 'No name'}</p>
                          <p className="text-xs text-gray-500">
                            Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => loadResume(resume)}
                          >
                            Load
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteResume(resume.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Resume
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="edit" className="space-y-6">
            <ResumeBuilder 
              resumeData={resumeData} 
              onDataChange={handleResumeDataChange}
            />
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Resume Preview</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleExportPDF}>
                      <Download className="w-4 h-4 mr-2" />
                      Export as PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={handlePrintResume}>
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div id="resume-content">
                  <ResumePreview resumeData={resumeData} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}