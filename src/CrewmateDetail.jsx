import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

export default function CrewmateDetail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)

  useEffect(() => {
    async function fetchCrewmate() {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching crewmate:', error)
      } else {
        setCrewmate(data)
      }
    }

    fetchCrewmate()
  }, [id])

  if (!crewmate) return <p>Loading crewmate info...</p>

  return (
    <div>
      <h2>{crewmate.name}</h2>
      <p><strong>Class:</strong> {crewmate.class}</p>
      <p><strong>Primary Tool:</strong> {crewmate.primary_tool}</p>
      <p><strong>Level:</strong> {crewmate.level}</p>
      <p><strong>Trait:</strong> {crewmate.trait}</p>
      <p><strong>Alignment:</strong> {crewmate.alignment}</p>

      <Link to={`/crewmate/${crewmate.id}/edit`}>Edit</Link>
      <Link to="/">← Back to Crew</Link>
    </div>
  )
}
