import { type Handler, stream } from '@netlify/functions'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const handler: Handler = stream(async (event, context) => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{ role: 'system', content: "write a little poem"}]
  })
  
  const stream = OpenAIStream(response)

  return {
    headers: {
      "content-type": "text/event-stream",
    },
    statusCode: 200,
    body: stream,
  }
})
