"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface MoodEntry {
  id: string
  date: string
  mood: string
  journal: string
}

export default function MoodJournal() {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [journalEntry, setJournalEntry] = useState("")
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [quote, setQuote] = useState({
    text: "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
    author: "Unknown",
  })

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😌", label: "Calm" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😟", label: "Worried" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Frustrated" },
    { emoji: "🤕", label: "In Pain" },
    { emoji: "😴", label: "Tired" },
  ]

  const journalPrompts = [
    "What helped ease your back pain today?",
    "How did your mood affect your physical comfort today?",
    "What activities made you feel better today?",
    "What are you grateful for today despite any pain?",
    "What self-care practices did you try today?",
    "How did your sleep affect your pain levels today?",
    "What's one small win you had today?",
    "What's something you're looking forward to tomorrow?",
  ]

  const motivationalQuotes = [
    {
      text: "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
      author: "Unknown",
    },
    { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
    { text: "Healing is a matter of time, but it is sometimes also a matter of opportunity.", author: "Hippocrates" },
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
    },
    {
      text: "Out of suffering have emerged the strongest souls; the most massive characters are seared with scars.",
      author: "Kahlil Gibran",
    },
    {
      text: "Although the world is full of suffering, it is also full of the overcoming of it.",
      author: "Helen Keller",
    },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    {
      text: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'",
      author: "Mary Anne Radmacher",
    },
  ]

  useEffect(() => {
    // Load mood entries from localStorage or use sample data
    const storedEntries = localStorage.getItem("moodEntries")
    if (storedEntries) {
      setMoodEntries(JSON.parse(storedEntries))
    } else {
      // Sample data for demonstration
      const today = new Date()
      const sampleData: MoodEntry[] = Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(today)
        date.setDate(date.getDate() - (6 - index))
        const dateString = date.toISOString().split("T")[0]

        // Random mood
        const randomMood = moods[Math.floor(Math.random() * moods.length)]

        return {
          id: `sample-${index}`,
          date: dateString,
          mood: randomMood.label,
          journal: `Today I felt ${randomMood.label.toLowerCase()}. ${index % 2 === 0 ? "My back pain was manageable." : "I struggled with back pain today but tried to stay positive."}`,
        }
      })

      setMoodEntries(sampleData)
      localStorage.setItem("moodEntries", JSON.stringify(sampleData))
    }

    // Set random quote
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])
  }, [])

  // Get random journal prompt
  const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)]

  // Check if there's an entry for the selected date
  const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
  const existingEntry = moodEntries.find((entry) => entry.date === selectedDateStr)

  useEffect(() => {
    if (existingEntry) {
      setSelectedMood(existingEntry.mood)
      setJournalEntry(existingEntry.journal)
    } else {
      setSelectedMood(null)
      setJournalEntry("")
    }
  }, [selectedDate, existingEntry])

  const handleSaveEntry = () => {
    if (!selectedMood) {
      toast({
        title: "Mood required",
        description: "Please select how you're feeling today",
        variant: "destructive",
      })
      return
    }

    const dateStr = format(selectedDate, "yyyy-MM-dd")

    // Check if entry for this date already exists
    const existingEntryIndex = moodEntries.findIndex((entry) => entry.date === dateStr)

    let updatedEntries: MoodEntry[]

    if (existingEntryIndex >= 0) {
      // Update existing entry
      updatedEntries = [...moodEntries]
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries[existingEntryIndex],
        mood: selectedMood,
        journal: journalEntry,
      }

      toast({
        title: "Journal updated",
        description: `Your mood journal for ${format(selectedDate, "MMMM d")} has been updated`,
      })
    } else {
      // Add new entry
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        date: dateStr,
        mood: selectedMood,
        journal: journalEntry,
      }

      updatedEntries = [...moodEntries, newEntry].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      )

      toast({
        title: "Journal saved",
        description: `Your mood journal for ${format(selectedDate, "MMMM d")} has been saved`,
      })
    }

    setMoodEntries(updatedEntries)
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries))
  }

  const getMoodEmoji = (moodLabel: string) => {
    const mood = moods.find((m) => m.label === moodLabel)
    return mood ? mood.emoji : "😐"
  }

  // Function to highlight dates with entries
  const dateHasEntry = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return moodEntries.some((entry) => entry.date === dateStr)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="mb-6 text-3xl font-bold text-teal-600">Mood & Motivation Journal</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Check-in</CardTitle>
            <CardDescription>Track your emotional wellbeing alongside your physical health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">How are you feeling today?</h3>
              <div className="grid grid-cols-4 gap-2">
                {moods.map((mood) => (
                  <Button
                    key={mood.label}
                    variant="outline"
                    className={`flex h-auto flex-col gap-1 p-3 ${selectedMood === mood.label ? "border-2 border-teal-500 bg-teal-50" : ""}`}
                    onClick={() => setSelectedMood(mood.label)}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Journal Entry</h3>
              <p className="text-xs text-muted-foreground">Prompt: {randomPrompt}</p>
              <Textarea
                placeholder="Write about your day, feelings, and reflections..."
                rows={6}
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
              />
            </div>

            <Button onClick={handleSaveEntry} className="w-full bg-teal-600 hover:bg-teal-700">
              Save Journal Entry
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View and select dates to journal</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                modifiers={{
                  hasEntry: (date) => dateHasEntry(date),
                }}
                modifiersClassNames={{
                  hasEntry: "bg-teal-100 font-bold text-teal-900",
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Inspiration</CardTitle>
              <CardDescription>Motivation to keep you going</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="mb-2 italic">"{quote.text}"</p>
                <p className="text-right text-sm font-medium">— {quote.author}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
            <CardDescription>Your mood journey over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {moodEntries
                .slice(-5)
                .reverse()
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start justify-between rounded-lg border p-3"
                    onClick={() => {
                      setSelectedDate(new Date(entry.date))
                    }}
                  >
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl">
                        {getMoodEmoji(entry.mood)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{format(new Date(entry.date), "MMMM d, yyyy")}</p>
                          <Badge variant="outline">{entry.mood}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{entry.journal}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">
                      View
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
