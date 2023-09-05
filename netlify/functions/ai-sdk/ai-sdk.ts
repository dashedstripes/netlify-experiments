import { type Handler, stream, type HandlerContext, type HandlerEvent } from '@netlify/functions'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

function netlifyStream(f: (event: HandlerEvent, context: HandlerContext) => Promise<StreamingTextResponse>): Handler {
  return stream(async (event, context) => {
    const ff = await f(event, context);
    return {
      headers: {
        'content-type': 'text/event-stream',
      },
      statusCode: 200,
      body: ff.body
    }
  })
}

export const handler: Handler = netlifyStream(async (event, context) => {
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

  return new StreamingTextResponse(stream)
})