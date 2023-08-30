import { stream } from "@netlify/functions";

export const handler = stream(async (event) => {
  if(event.httpMethod !== 'POST') {
    return {
      headers: {
        // This is the mimetype for server-sent events
        "content-type": "text/event-stream",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      },
      statusCode: 200
    };
  }
  const json = JSON.parse(event.body as string);

  // The response body returned from "fetch" is a "ReadableStream",
  // so you can return it directly in your streaming response
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Set this environment variable to your own key
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: json.message.slice(0, 500) },
      ],
      // Use server-sent events to stream the response
      stream: true,
    }),
  });

  return {
    headers: {
      // This is the mimetype for server-sent events
      "content-type": "text/event-stream",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    },
    statusCode: 200,
    // Pipe the event stream from OpenAI to the client
    body: res.body,
  };
});
