import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if user already exists
    let user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Create new user
      user = await db.user.create({
        data: {
          email,
          name: name || null
        }
      })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating/fetching user:', error)
    return NextResponse.json({ error: 'Failed to create/fetch user' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { email },
      include: {
        resumes: {
          orderBy: { updatedAt: 'desc' }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}