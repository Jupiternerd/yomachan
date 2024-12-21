//page.tsx

'use client'

import { useState } from 'react'
import { PublishForm } from './publishForm'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { PublishType } from './publishForm'
import { BookOpen, Plus } from 'lucide-react'

export default function PublishPage() {
  const [step, setStep] = useState(1)
  const [publishType, setPublishType] = useState<PublishType | null>(null)
  
  const totalSteps = publishType === 'novel' ? 4 : 3
  const progress = (step / totalSteps) * 100

  if (!publishType) {
    return (
      <div className="container max-w-4xl py-10 space-y-8 mx-auto text-white">
        <h1 className="text-3xl font-bold text-center">What would you like to publish?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 hover:border-primary cursor-pointer transition-colors" 
                onClick={() => setPublishType('novel')}>
            <div className="flex flex-col items-center space-y-4">
              <BookOpen className="w-12 h-12" />
              <h2 className="text-xl font-semibold">New Novel</h2>
              <p className="text-muted-foreground text-center">
                Start a new story and publish your first chapter
              </p>
            </div>
          </Card>
          <Card className="p-6 hover:border-primary cursor-pointer transition-colors"
                onClick={() => setPublishType('chapter')}>
            <div className="flex flex-col items-center space-y-4">
              <Plus className="w-12 h-12" />
              <h2 className="text-xl font-semibold">New Chapter</h2>
              <p className="text-muted-foreground text-center">
                Add a new chapter to one of your existing novels
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-10 space-y-8 mx-auto">
      <div className="space-y-2">
        <Progress value={progress} className="w-full"/>
        <p className="text-sm text-white text-center">
          Step {step} of {totalSteps}
        </p>
      </div>
      <PublishForm 
        type={publishType}
        step={step}
        onStepChange={setStep}
      />
    </div>
  )
}


  