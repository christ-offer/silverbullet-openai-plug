import { editor } from "$sb/silverbullet-syscall/mod.ts";
import { OpenAIApi } from "./lib/openai.ts";
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

export async function fullTextCompletion() {
  const request = await readSettings();
  const prompt = await editor.getText();
  request.prompt = prompt;
  console.log(request)
  const apiKey = await getKeys();
  const openai = new OpenAIApi(apiKey);
  const response = await openai.createCodeCompletion(request);

  editor.insertAtCursor(response.choices[0].text);
}

export async function selectionCompletion() {
  const selectedText = await editor.getText()
  const selection = await editor.getSelection()
  const prompt = selectedText.slice(selection.from, selection.to)
  const request = await readSettings();
  request.prompt = prompt;
  console.log(request)
  const apiKey = await getKeys();
  const openai = new OpenAIApi(apiKey);
  const response = await openai.createCodeCompletion(request);
  
  editor.insertAtPos(response.choices[0].text, selection.to)
}