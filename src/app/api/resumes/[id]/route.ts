import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const resume = await db.resume.findUnique({
      where: { id }
    })

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { userId, ...resumeData } = body

    const resume = await db.resume.update({
      where: { id },
      data: {
        ...resumeData,
        experience: resumeData.experience || [],
        education: resumeData.education || [],
        skills: resumeData.skills || [],
        projects: resumeData.projects || [],
        certifications: resumeData.certifications || [],
        languages: resumeData.languages || []
      }
    })

    return NextResponse.json(resume)
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.resume.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Resume deleted successfully' })
  } catch (error) {
    console.error('Error deleting resume:', error)
    return NextResponse.json({ error: 'Failed to delete resume' }, { status: 500 })
  }
}