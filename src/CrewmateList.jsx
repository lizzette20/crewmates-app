import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

export default function CrewmateList() {
  const [crewmates, setCrewmates] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) console.error('Error fetching crewmates:', error)
      else setCrewmates(data)
    }

    fetchData()
  }, [])

  const popularTrait = () => {
    const count = {}
    crewmates.forEach(c => {
      count[c.trait] = (count[c.trait] || 0) + 1
    })
    let max = 0, trait = 'None'
    for (let key in count) {
      if (count[key] > max) {
        max = count[key]
        trait = key
      }
    }
    return trait
  }

  return (
    <div className="card">
      <h2>Crewmate Gallery</h2>

      {crewmates.length === 0 ? (
        <p>No crewmates yet.</p>
      ) : (
        <>
          <p><strong>Total:</strong> {crewmates.length}</p>
          <p><strong>Popular Trait:</strong> {popularTrait()}</p>
          <p><strong>Mission Readiness:</strong> {Math.floor(Math.random() * 20) + 80}%</p>

          <ul>
            {crewmates.map(c => (
              <li key={c.id}>
                <Link to={`/crewmate/${c.id}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
