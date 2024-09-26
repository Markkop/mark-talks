'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, PresentationIcon, MessageSquareIcon } from "lucide-react"

interface Talk {
  title: string
  date: string
  location: string
  description: string
  presentationLink: string
  feedbackLink: string
  isPast: boolean
  coverImage: string
  tags: string[]
}

const talks: Talk[] = [
  {
    title: "The Future of Web Development",
    date: "2023-05-15",
    location: "TechConf, San Francisco",
    description: "Exploring upcoming trends and technologies in web development.",
    presentationLink: "https://example.com/future-web-dev",
    feedbackLink: "https://example.com/feedback-future-web-dev",
    isPast: true,
    coverImage: "/placeholder.svg?height=200&width=400",
    tags: ["Web Dev", "Future Trends", "JavaScript"],
  },
  {
    title: "Mastering React Hooks",
    date: "2023-09-20",
    location: "ReactCon, New York",
    description: "Deep dive into advanced React Hooks and custom hook creation.",
    presentationLink: "https://example.com/react-hooks",
    feedbackLink: "https://example.com/feedback-react-hooks",
    isPast: false,
    coverImage: "/placeholder.svg?height=200&width=400",
    tags: ["React", "Hooks", "Frontend"],
  },
  // Add more talks as needed
]

function TalkCard({ talk }: { talk: Talk }) {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${talk.isPast ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={talk.coverImage}
          alt={`Cover for ${talk.title}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{talk.title}</CardTitle>
        <CardDescription className="flex flex-col space-y-1">
          <span className="flex items-center">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {talk.date}
          </span>
          <span className="flex items-center">
            <MapPinIcon className="mr-1 h-4 w-4" />
            {talk.location}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-600">{talk.description}</p>
        <div className="flex flex-wrap gap-2">
          {talk.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 p-4">
        <Button variant="outline" className="flex items-center" asChild>
          <a href={talk.presentationLink} target="_blank" rel="noopener noreferrer">
            <PresentationIcon className="mr-2 h-4 w-4" />
            View Presentation
          </a>
        </Button>
        <Button variant="outline" className="flex items-center" asChild>
          <a href={talk.feedbackLink} target="_blank" rel="noopener noreferrer">
            <MessageSquareIcon className="mr-2 h-4 w-4" />
            Give Feedback
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function TalksPageComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <header className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">My Talks</h1>
        <p className="text-lg text-gray-600">Explore my past and upcoming presentations</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {talks.map((talk, index) => (
          <TalkCard key={index} talk={talk} />
        ))}
      </div>
    </div>
  )
}