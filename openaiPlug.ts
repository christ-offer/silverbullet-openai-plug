import { editor } from "$sb/silverbullet-syscall/mod.ts";
import { OpenAI } from "./lib/openai.ts";
import { readYamlPage } from "$sb/lib/yaml_page.ts";
import { readSecrets } from "$sb/lib/secrets_page.ts";

export async function getKeys() {
  try {
  const [token] = await readSecrets(["openai"]);
  return token;
} catch {
  console.error("No openai token found");
}
}

export async function readSettings() {
  try {
    const allSettings = await readYamlPage("openai/settings");
    return allSettings;
}
  catch (e) {
    console.log(e);
    return [];
  }
}

export async function fullPageCodeCompletion() {
  const request = await readSettings();
  const prompt = await editor.getText();
  request.codeCompletion.prompt = prompt;
  console.log(request.codeCompletion)
  const apiKey = await getKeys();
  const openai = new OpenAI(apiKey);
  const response = await openai.createCompletion(request.codeCompletion);

  editor.insertAtCursor(response.choices[0].text);
}

export async function selectionCodeCompletion() {
  const selectedText = await editor.getText()
  const selection = await editor.getSelection()
  const prompt = selectedText.slice(selection.from, selection.to)
  const request = await readSettings();
  request.codeCompletion.prompt = prompt;
  console.log(request.codeCompletion)
  const apiKey = await getKeys();
  const openai = new OpenAI(apiKey);
  const response = await openai.createCompletion(request.codeCompletion);
  
  editor.insertAtPos(response.choices[0].text, selection.to)
}

export async function fullPageCompletion() {
  const request = await readSettings();
  const prompt = await editor.getText();
  request.completion.prompt = prompt;
  console.log(request.completion)
  const apiKey = await getKeys();
  const openai = new OpenAI(apiKey);
  const response = await openai.createCompletion(request.completion);

  editor.insertAtCursor(response.choices[0].text);
}

export async function selectionCompletion() {
  const selectedText = await editor.getText()
  const selection = await editor.getSelection()
  const prompt = selectedText.slice(selection.from, selection.to)
  const request = await readSettings();
  request.completion.prompt = prompt;
  console.log(request.completion)
  const apiKey = await getKeys();
  const openai = new OpenAI(apiKey);
  const response = await openai.createCompletion(request.completion);
  
  editor.insertAtPos(response.choices[0].text, selection.to)
}

export async function imageGeneration() {
  const request = await readSettings();
  const selectedText = await editor.getText()
  const selection = await editor.getSelection()
  const prompt = selectedText.slice(selection.from, selection.to)
  request.imageGeneration.prompt = prompt;
  console.log(request.imageGeneration)
  const apiKey = await getKeys();
  const openai = new OpenAI(apiKey);
  const response = await openai.createImage(request.imageGeneration);

  editor.insertAtPos(response.data[0].url, selection.to);
}