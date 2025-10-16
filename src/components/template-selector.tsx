'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  preview: string
  features: string[]
}

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateChange: (templateId: string) => void
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with a professional look',
    preview: 'Modern template with blue header and clean layout',
    features: ['Professional', 'Clean layout', 'Blue accent colors']
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume format suitable for conservative industries',
    preview: 'Classic template with traditional formatting',
    features: ['Traditional', 'Conservative', 'Timeless']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative professionals and designers',
    preview: 'Creative template with unique layout and colors',
    features: ['Creative', 'Unique layout', 'Colorful']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and clean design focusing on content',
    preview: 'Minimal template with lots of white space',
    features: ['Minimal', 'Content-focused', 'Elegant']
  }
]

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {templates.map((template) => (
        <Card 
          key={template.id} 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedTemplate === template.id 
              ? 'ring-2 ring-blue-500 shadow-lg' 
              : 'hover:ring-1 hover:ring-gray-300'
          }`}
          onClick={() => onTemplateChange(template.id)}
        >
          <CardContent className="p-4">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
              <div className="text-center p-4">
                <div className={`w-16 h-16 mx-auto mb-2 rounded ${
                  template.id === 'modern' ? 'bg-blue-500' :
                  template.id === 'classic' ? 'bg-gray-700' :
                  template.id === 'creative' ? 'bg-purple-500' :
                  'bg-gray-300'
                }`}></div>
                <p className="text-xs text-gray-600">{template.preview}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{template.name}</h3>
                {selectedTemplate === template.id && (
                  <Check className="w-5 h-5 text-blue-500" />
                )}
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2">
                {template.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {template.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}