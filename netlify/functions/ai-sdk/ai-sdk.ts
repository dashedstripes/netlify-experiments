import { type Handler, stream } from '@netlify/functions'
import { OpenAIStream } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const handler: Handler = stream(async (event, context) => {
  const { messages } = await JSON.parse(event?.body as string);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages
  })
  
  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      console.log(completion)
    }
  })

  return {
    headers: {
      'content-type': 'text/event-stream'
    },
    statusCode: 200,
    body: stream
  }
})