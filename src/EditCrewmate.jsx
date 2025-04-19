import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

export default function EditCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    class: '',
    primary_tool: '',
    level: '',
    trait: '',
    alignment: ''
  })

  useEffect(() => {
    async function fetchCrewmate() {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('❌ Error fetching crewmate:', error)
      } else {
        console.log('📥 Loaded data:', data)
        setFormData(data)
      }
    }

    fetchCrewmate()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updates = {
      id: id, // required for upsert
      name: formData.name,
      category: formData.category,
      class: formData.class,
      primary_tool: formData.primary_tool,
      level: parseInt(formData.level),
      trait: formData.trait,
      alignment: formData.alignment
    }

    console.log('📤 Submitting this data:', updates)

    const { data, error } = await supabase
      .from('crewmates')
      .upsert(updates, { onConflict: 'id' })
      .select()

    if (error) {
      console.error('❌ Error updating crewmate:', error)
    } else {
      console.log('✅ Updated data:', data)
      alert('Crewmate updated!')
      navigate(`/crewmate/${id}`)
    }
  }

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this crewmate?')
    if (!confirmed) return

    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting:', error)
    } else {
      alert('Crewmate deleted.')
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Edit Crewmate</h2>
      {['name', 'category', 'class', 'primary_tool', 'level', 'trait', 'alignment'].map((field) => (
        <div key={field}>
          <label>{field}</label>
          <input
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required={['name', 'class', 'primary_tool', 'level'].includes(field)}
          />
        </div>
      ))}
      <button type="submit">Update</button>
      <button
        type="button"
        onClick={handleDelete}
        style={{ marginLeft: '1rem', color: 'red' }}
      >
        Delete
      </button>
    </form>
  )
}

