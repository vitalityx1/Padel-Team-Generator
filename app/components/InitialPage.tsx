'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Clock } from 'lucide-react'

export default function InitialPage({ onStart }: { onStart: (courts: number, rounds: number) => void }) {
  const [courts, setCourts] = useState(5)
  const [rounds, setRounds] = useState(3)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onStart(courts, rounds)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-600 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md md:max-w-lg mx-auto">
        <Card className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <CardHeader className="bg-blue-600 text-white p-6">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-12 h-12 text-white mr-4" />
              <CardTitle className="text-3xl font-extrabold text-center">Padel Team Generator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <p className="text-gray-700 text-center text-sm md:text-base">
              Deze app helpt je bij het maken van evenwichtige teams voor je padel-sessies. 
              Kies het aantal banen en rondes, en voer de spelersnamen in. 
              Wij zorgen voor een eerlijke verdeling over meerdere rondes.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="courts" className="text-lg font-semibold text-blue-800 block">
                  Aantal beschikbare banen
                </Label>
                <Select value={courts.toString()} onValueChange={(value) => setCourts(Number(value))}>
                  <SelectTrigger id="courts" className="w-full bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecteer aantal banen" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'baan' : 'banen'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rounds" className="text-lg font-semibold text-blue-800 block">
                  Aantal rondes
                </Label>
                <Select value={rounds.toString()} onValueChange={(value) => setRounds(Number(value))}>
                  <SelectTrigger id="rounds" className="w-full bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecteer aantal rondes" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'ronde' : 'rondes'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-sm">Elke ronde duurt ongeveer 30 minuten</span>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform transition hover:scale-105"
              >
                Start
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}