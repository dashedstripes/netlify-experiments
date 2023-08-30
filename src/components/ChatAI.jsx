export default function ChatAI() {
  return (
    <div>
      <div id="output" className="min-h-screen pt-20 max-w-[65ch] mx-auto">
        <h1 className="font-bold p-8 bg-teal-100 rounded-xl mb-8 text-center">This example uses JSX + vercel/ai</h1>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-slate-300 py-8">
        <form id="form" className="max-w-[65ch] mx-auto flex gap-4">
          <input type="text" name="message" className="border p-4 rounded block w-full"/>
          <button type="submit" id="submit" className="px-4 py-2 bg-slate-100 rounded">Send</button>
        </form>
      </div>
    </div>
  )
}