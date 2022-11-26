import { editor, space } from "$sb/silverbullet-syscall/mod.ts";
import { OpenAIApi } from "./lib/openai.ts";

export async function fullTextCompletion() {
  const apiKey = await space.readPage('/openai/settings')
  const openai = new OpenAIApi(apiKey);
  const prompt = await editor.getText();
  const response = await openai.createCodeCompletion({
    model: "code-davinci-002",
    prompt,
    max_tokens: 100,
    temperature: 0.7,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: "",
  });
  
  const choice = response.choices[0];
  const text = choice.text;
  editor.insertAtCursor(text);
}

export async function selectionCompletion() {
  const apiKey = await space.readPage('/openai/settings')
  const selection = await editor.getSelection()
  const selectedText = await editor.getText()
  const prompt = selectedText.slice(selection.from, selection.to)
  const openai = new OpenAIApi(apiKey);
  const response = await openai.createCodeCompletion({
    model: "code-davinci-002",
    prompt,
    max_tokens: 100,
    temperature: 0.7,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: "",
  });
  
  const choice = response.choices[0];
  const text = choice.text;
  editor.insertAtCursor(text);
}