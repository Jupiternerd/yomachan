'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ImagePlus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import TiptapEditor from '../components/tiptap/tipTap'

export type PublishType = 'novel' | 'chapter'

export interface PublishFormData {
  type: PublishType
  novelId?: string
  title: string
  description: string
  tags: string[]
  isMature: boolean
  content: string
  coverImage?: File
}

export const AVAILABLE_TAGS = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
] as const

const MOCK_NOVELS = [
  { id: '1', title: 'The First Novel' },
  { id: '2', title: 'Another Story' },
]

interface PublishFormProps {
  type: PublishType
  step: number
  onStepChange: (step: number) => void
}

export function PublishForm({ type, step, onStepChange }: PublishFormProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  
  const { register, handleSubmit, watch } = useForm<PublishFormData>({
    defaultValues: {
      type,
      isMature: false,
    }
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCoverImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const onSubmit = (data: PublishFormData) => {
    console.log({ ...data, content, coverImage })
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const totalSteps = type === 'novel' ? 4 : 3

  const renderStep = () => {
    if (type === 'chapter') {
      switch (step) {
        case 1:
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Select Novel</h2>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a novel" className=""/>
                </SelectTrigger>
                <SelectContent>
                  {MOCK_NOVELS.map(novel => (
                    <SelectItem key={novel.id} value={novel.id} className="">
                      {novel.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="">Chapter Title</Label>
                  <Input
                    id="title"
                    placeholder="Chapter Title"
                    className=""
                    {...register('title', { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Write a brief description..."
                    className=""
                    {...register('description', { required: true })}
                  />
                </div>
              </div>
            </div>
          )
        case 2:
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold ">Upload Cover Image</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="coverImage"
                />
                <Label 
                  htmlFor="coverImage" 
                  className="cursor-pointer block "
                >
                  <div className="space-y-4">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="text-sm">
                      Click to upload or drag and drop
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 4MB
                      </p>
                    </div>
                  </div>
                </Label>
                {previewUrl && (
                  <div className="mt-4">
                    <img 
                      src={previewUrl} 
                      alt="Cover preview" 
                      className="max-h-64 mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        case 3:
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold ">Write Your Story</h2>
              <TiptapEditor
                onUpdate={html => setContent(html)}
                className="min-h-[500px]"
              />
            </div>
          )
      }
    } else {
      switch (step) {
        case 1:
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Create New Novel</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="">Title</Label>
                  <Input
                    id="title"
                    placeholder="Novel Title"
                    className=""
                    {...register('title', { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Write a brief description..."
                    className=""
                    {...register('description', { required: true })}
                  />
                </div>
              </div>
            </div>
          )
        case 2:
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold ">Upload Cover Image</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="coverImage"
                />
                <Label 
                  htmlFor="coverImage" 
                  className="cursor-pointer block "
                >
                  <div className="space-y-4">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="text-sm">
                      Click to upload or drag and drop
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 4MB
                      </p>
                    </div>
                  </div>
                </Label>
                {previewUrl && (
                  <div className="mt-4">
                    <img 
                      src={previewUrl} 
                      alt="Cover preview" 
                      className="max-h-64 mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        case 3:
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold ">Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="">Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_TAGS.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="mature" {...register('isMature')} />
                  <Label htmlFor="mature" className="t-black">Mature Content</Label>
                </div>
              </div>
            </div>
          )
        case 4:
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold ">Write Your Story</h2>
              <TiptapEditor
                onUpdate={html => setContent(html)}
                className="min-h-[500px]"
              />
            </div>
          )
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {renderStep()}
      
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => onStepChange(Math.max(1, step - 1))}
        >
          Back
        </Button>
        
        {step === totalSteps ? (
          <Button type="submit">
            Publish
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => onStepChange(Math.min(totalSteps, step + 1))}
          >
            Continue
          </Button>
        )}
      </div>
    </form>
  )
}