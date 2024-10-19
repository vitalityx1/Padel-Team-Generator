'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Users, Trophy } from 'lucide-react'
import dynamic from 'next/dynamic'

const InitialPage = dynamic(() => import('./InitialPage'), { ssr: false })

export default function PadelTeamGenerator() {
  const [courts, setCourts] = useState(5)
  const [rounds, setRounds] = useState(3)
  const [players, setPlayers] = useState<string[]>([])
  const [generatedTeams, setGeneratedTeams] = useState<string[][][]>([])
  const [error, setError] = useState<string | null>(null)
  const [showInitialPage, setShowInitialPage] = useState(true)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'

  useEffect(() => {
    const cachedTeams = localStorage.getItem('padelTeams')
    if (cachedTeams) {
      setGeneratedTeams(JSON.parse(cachedTeams))
      setShowInitialPage(false)
    }
  }, [])

  useEffect(() => {
    setPlayers(Array(courts * 4).fill(''))
  }, [courts])

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players]
    newPlayers[index] = value
    setPlayers(newPlayers)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const nextIndex = (index + 1) % players.length
      inputRefs.current[nextIndex]?.focus()
    }
  }

  const generateTeams = () => {
    setError(null);
    const filledPlayers = players.filter(player => player.trim() !== '');
    if (filledPlayers.length !== players.length) {
      setError(`Voer alstublieft namen in voor alle ${players.length} spelers.`);
      return;
    }
  
    const teams: string[][][] = [];
    const playerPartners: { [key: string]: Set<string> } = {};
  
    filledPlayers.forEach(player => {
      playerPartners[player] = new Set();
    });
  
    for (let round = 0; round < rounds; round++) {
      const roundTeams: string[][] = [];
      let availablePlayers = [...filledPlayers];
  
      for (let court = 0; court < courts; court++) {
        const courtPlayers: string[] = [];
  
        for (let i = 0; i < 4; i++) {
          if (availablePlayers.length === 0) {
            // If we run out of available players, reset the list
            availablePlayers = [...filledPlayers];
          }
  
          // Choose a random player from the available players
          const randomIndex = Math.floor(Math.random() * availablePlayers.length);
          const chosenPlayer = availablePlayers[randomIndex];
  
          courtPlayers.push(chosenPlayer);
          availablePlayers.splice(randomIndex, 1);
  
          // Update partnerships
          courtPlayers.forEach(p => {
            if (p !== chosenPlayer) {
              playerPartners[chosenPlayer].add(p);
              playerPartners[p].add(chosenPlayer);
            }
          });
        }
  
        roundTeams.push(courtPlayers);
      }
  
      teams.push(roundTeams);
    }
  
    setGeneratedTeams(teams);
    localStorage.setItem('padelTeams', JSON.stringify(teams));
    window.scrollTo(0, 0);
  };

  const resetTeams = () => {
    setGeneratedTeams([])
    setPlayers(Array(courts * 4).fill(''))
    localStorage.removeItem('padelTeams')
    setShowInitialPage(true)
    window.scrollTo(0, 0)
  }

  const populateRandomNames = () => {
    const randomNames = [
      "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason",
      "Isabella", "William", "Mia", "James", "Charlotte", "Benjamin", "Amelia",
      "Lucas", "Harper", "Henry", "Evelyn", "Alexander", "Abigail", "Michael",
      "Emily", "Daniel", "Elizabeth", "Jacob", "Sofia", "Logan", "Avery", "Jackson"
    ]
    const shuffled = [...randomNames].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, players.length)
    setPlayers(selected)
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleStart = (selectedCourts: number, selectedRounds: number) => {
    setCourts(selectedCourts)
    setRounds(selectedRounds)
    setShowInitialPage(false)
    window.scrollTo(0, 0)
  }

  if (showInitialPage) {
    return <InitialPage onStart={handleStart} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-600 p-4">
      <div ref={topRef} />
      <div className="max-w-md mx-auto md:max-w-4xl">
        <Card className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <CardHeader className="bg-blue-600 text-white p-6">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-10 h-10 text-white mr-3" />
              <CardTitle className="text-2xl font-extrabold">Padel Team Generator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {generatedTeams.length === 0 && (
              <>
                {isDevelopment && (
                  <div className="flex justify-center mb-6">
                    <Button onClick={populateRandomNames} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-sm shadow-lg transform transition hover:scale-105">
                      Vul willekeurige namen in
                    </Button>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {players.map((player, index) => (
                    <div key={index} className="relative">
                      <Label htmlFor={`player-${index}`} className="text-sm font-medium text-gray-700 mb-1 block">
                        Speler {index + 1}
                      </Label>
                      <div className="relative">
                        <Input
                          id={`player-${index}`}
                          value={player}
                          onChange={(e) => handlePlayerChange(index, e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, index)}
                          ref={(el) => { inputRefs.current[index] = el }}
                          placeholder={`Speler ${index + 1}`}
                          className="pr-8 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <Users className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Fout</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {generatedTeams.length === 0 ? (
              <div className="flex justify-center">
                <Button onClick={generateTeams} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-base shadow-lg transform transition hover:scale-105">
                  Genereer Teams
                </Button>
              </div>
            ) : (
              <>
                {generatedTeams.map((round, roundIndex) => (
                  <Card key={roundIndex} className="mb-6 bg-gradient-to-br from-white to-blue-100 shadow-lg overflow-hidden border border-gray-200">
                    <CardHeader className="bg-blue-500 text-white p-3">
                      <CardTitle className="text-xl font-bold">Ronde {roundIndex + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="grid gap-4 md:grid-cols-3">
                        {round.map((court, courtIndex) => (
                          <div key={courtIndex} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                            <div className="bg-blue-400 text-white py-2 px-3">
                              <h3 className="text-base font-semibold">Baan {courtIndex + 1}</h3>
                            </div>
                            <div className="p-3">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                  <p className="font-medium text-blue-600 pb-1 mb-2 border-b-2 border-blue-200">Team A</p>
                                  <div className="space-y-1 relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-blue-300"></div>
                                    {court.slice(0, 2).map((player, index) => (
                                      <p key={index} className="text-sm pl-4 relative">
                                        <span className="absolute left-0 top-1/2 w-3 h-px bg-blue-300"></span>
                                        {player}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                                <div className="relative">
                                  <p className="font-medium text-blue-600 pb-1 mb-2 border-b-2 border-blue-200">Team B</p>
                                  <div className="space-y-1 relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-blue-300"></div>
                                    {court.slice(2, 4).map((player, index) => (
                                      <p key={index} className="text-sm pl-4 relative">
                                        <span className="absolute left-0 top-1/2 w-3 h-px bg-blue-300"></span>
                                        {player}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="flex justify-center mt-6">
                  <Button onClick={resetTeams} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-base shadow-lg transform transition hover:scale-105">
                    Verwijder resultaat
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <div ref={bottomRef} />
    </div>
  )
}