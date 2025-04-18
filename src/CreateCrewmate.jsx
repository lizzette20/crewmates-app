import { useState } from 'react'
import { supabase } from './supabaseClient'

const categoryOptions = {
  Engineer: ['Data Pad', 'Bug Tracker', 'Hacking Tool'],
  Pilot: ['Navigation Map', 'AutoPilot', 'Radar Scanner'],
  Medic: ['Medkit', 'Scanner', 'Vitals Monitor']
}

export default function CreateCrewmate() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    class: '',
    primary_tool: '',
    level: '',
    trait: '',
    alignment: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('crewmates').insert([formData])
    if (error) {
      console.error(error)
    } else {
      alert('Crewmate created!')
      setFormData({
        name: '',
        category: '',
        class: '',
        primary_tool: '',
        level: '',
        trait: '',
        alignment: ''
      })
    }
  }

  return (
    <div className="card">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Create a Crewmate</h2>

      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select one</option>
          {Object.keys(categoryOptions).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {formData.category && (
          <>
            <label>Primary Tool</label>
            <select
              name="primary_tool"
              value={formData.primary_tool}
              onChange={handleChange}
              required
            >
              <option value="">Select tool</option>
              {categoryOptions[formData.category].map((tool) => (
                <option key={tool} value={tool}>{tool}</option>
              ))}
            </select>
          </>
        )}

        {['name', 'class', 'level', 'trait', 'alignment'].map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required={['name', 'class', 'level'].includes(field)}
            />
          </div>
        ))}

        <button type="submit" style={{ marginTop: '2rem' }}>Add Crewmate</button>
      </form>
    </div>
  )
}
