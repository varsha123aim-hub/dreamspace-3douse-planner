import { useState } from 'react'
import './AIHouseAssistant.css'

function AIHouseAssistant() {
  const [prompt, setPrompt] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [loading, setLoading] = useState(false)

  function generateDesign() {
    if (!prompt.trim()) {
      setSuggestion('Please enter your house design requirements.')
      return
    }

    setLoading(true)
    setSuggestion('')

    setTimeout(() => {
      const text = prompt.toLowerCase()
      let result = ''

      if (text.includes('bedroom')) {
        result = 'Bedroom Design Suggestion'
        + '\n\n• Use a comfortable king-size bed.'
        + '\n• Add a wardrobe near the entrance.'
        + '\n• Use soft lighting and neutral wall colours.'
        + '\n• Keep enough walking space.'
      } else if (text.includes('kitchen')) {
        result = 'Modern Kitchen Design Suggestion'
        + '\n\n• Use an L-shaped kitchen layout.'
        + '\n• Add overhead storage cabinets.'
        + '\n• Choose light-coloured countertops.'
        + '\n• Keep the cooking and washing areas separate.'
      } else if (text.includes('living')) {
        result = 'Living Room Design Suggestion'
        + '\n\n• Place a comfortable sofa.'
        + '\n• Add a modern TV unit.'
        + '\n• Use warm ambient lighting.'
        + '\n• Add indoor plants for a fresh look.'
      } else {
        result = 'Your House Design Suggestion'
        + '\n\n• Choose a modern and practical layout.'
        + '\n• Keep rooms spacious and well ventilated.'
        + '\n• Use natural lighting.'
        + '\n• Select colours that complement each other.'
        + '\n• Plan furniture according to available space.'
      }

      setSuggestion(result)
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="ai-assistant">
      <div className="ai-title">
        <span className="ai-icon">✦</span>
        <div>
          <h2>AI House Design Assistant</h2>
          <p>Get smart ideas for your dream home</p>
        </div>
      </div>

      <textarea
        placeholder="Describe your dream home... e.g. Modern 2 bedroom house"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={generateDesign} disabled={loading}>
        {loading ? 'Generating...' : '✦ Generate Design Ideas'}
      </button>

      {suggestion && (
        <div className="ai-result">
          <h3>✦ Design Suggestions</h3>
          <p>{suggestion}</p>
          <small>Demo suggestions – Real AI will be connected later.</small>
        </div>
      )}
    </section>
  )
}

export default AIHouseAssistant