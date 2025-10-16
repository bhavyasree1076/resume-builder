import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

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
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, ...resumeData } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const resume = await db.resume.create({
      data: {
        ...resumeData,
        userId,
        experience: resumeData.experience || [],
        education: resumeData.education || [],
        skills: resumeData.skills || [],
        projects: resumeData.projects || [],
        certifications: resumeData.certifications || [],
        languages: resumeData.languages || []
      }
    })

    return NextResponse.json(resume, { status: 201 })
  } catch (error) {
    console.error('Error creating resume:', error)
    return NextResponse.json({ error: 'Failed to create resume' }, { status: 500 })
  }
}