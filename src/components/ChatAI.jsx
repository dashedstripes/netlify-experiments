import { useChat } from 'ai/react'

export default function ChatAI() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/.netlify/functions/ai-sdk'
  })

  return (
    <div>
      <div id="output" className="min-h-screen pt-20 max-w-[65ch] mx-auto">
        <h1 className="font-bold p-8 bg-teal-100 rounded-xl mb-8 text-center">This example uses JSX + vercel/ai</h1>

        {messages.map(m => {
          if(m.role === 'user') {
            return (
              <div key={m.id} className='p-8 bg-slate-800 rounded-xl text-white mb-8'>
                <h3 className='font-bold'>You</h3>
                <p>{m.content}</p>
              </div>
            )
          } else {
            return (
              <div key={m.id} className='p-8 bg-slate-100 rounded-xl mb-8'>
                <h3 className='font-bold'>Netlify</h3>
                <p>{m.content}</p>
              </div>
            )
          }
        })}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-slate-300 py-8">
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(e)
        }} className="max-w-[65ch] mx-auto flex gap-4">
          <input
              className="border p-4 rounded block w-full"
              value={input}
              onChange={handleInputChange}
              placeholder='Send a message...'
            />
        </form>
      </div>
    </div>
  )
}