import OpenAI from "openai";
import { OPEN_AI_API } from "../../Constants";

const openai = new OpenAI({
  apiKey: OPEN_AI_API,  dangerouslyAllowBrowser: true,
});

const response = openai.responses.create({
  model: "gpt-4o-mini",
  input: "write a haiku about ai",
  store: true,
});

response.then((result) => console.log(result.output_text)); 

export default openai;