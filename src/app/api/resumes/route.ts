import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const resumeData = await request.json()

    if (!resumeData.userId || !resumeData.fullName || !resumeData.email) {
      return NextResponse.json(
        { error: 'User ID, full name, and email are required' },
        { status: 400 }
      )
    }

    const resume = await db.resume.create({
      data: {
        title: resumeData.title || 'Untitled Resume',
        fullName: resumeData.fullName,
        email: resumeData.email,
        phone: resumeData.phone,
        location: resumeData.location,
        website: resumeData.website,
        linkedin: resumeData.linkedin,
        github: resumeData.github,
        summary: resumeData.summary,
        experience: resumeData.experience || [],
        education: resumeData.education || [],
        skills: resumeData.skills || [],
        projects: resumeData.projects || [],
        certifications: resumeData.certifications || [],
        languages: resumeData.languages || [],
        template: resumeData.template || 'modern',
        userId: resumeData.userId
      }
    })

    return NextResponse.json(resume, { status: 201 })
  } catch (error) {
    console.error('Error creating resume:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const resumes = await db.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(resumes)
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
