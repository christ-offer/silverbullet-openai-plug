import { editor } from "$sb/silverbullet-syscall/mod.ts";
import { readYamlPage } from "$sb/lib/yaml_page.ts";
import { readSecrets } from "$sb/lib/secrets_page.ts";
import { OpenAI } from "https://deno.land/x/openai_mini@0.3.1/mod.ts";

export async function getKeys() {
  try {
  const [token] = await readSecrets(["openai"]);
  return token;
} catch {
  console.error("No openai token found");
  editor.flashNotification(`SECRETS page missing, or OpenAI API token not configured correctly.`, "error");
}
}
// Hello there
export async function readSettings() {
  try {
    const allSettings = await readYamlPage("openai/settings");
    return allSettings;
}
  catch (e) {
    console.log(e);
    editor.flashNotification(`Settings page missing, or settings not configured correctly.`, "error");
    return [];
  }
}

export async function fullPageCodeCompletion() {
  const request = await readSettings();
  const prompt = await editor.getText();
  request.codeCompletion.prompt = prompt;
  console.log(request.codeCompletion)
  try {
    const apiKey = await getKeys();
    const openai = new OpenAI(apiKey);
    editor.flashNotification("Generating completion...", "info");
    const response = await openai.createCompletion(request.codeCompletion);
    editor.insertAtCursor(response.choices[0].text);
  }
  catch (err) {
    console.log(err);
    editor.flashNotification(`Something went wrong`, "error");
  }
  editor.flashNotification(`Generation complete`, "info");
}

export async function selectionCodeCompletion() {
  const selectedText = await editor.getText()
  const selection = await editor.getSelection()
  const prompt = selectedText.slice(selection.from, selection.to)
  const request = await readSettings();
  request.codeCompletion.prompt = prompt;
  console.log(request.codeCompletion)
  try {
    const apiKey = await getKeys();
    const openai = new OpenAI(apiKey);
    editor.flashNotification("Generating completion...", "info");
    const response = await openai.createCompletion(request.codeCompletion);
    editor.insertAtPos(response.choices[0].text, selection.to)
  }
  catch (err) {
    console.log(err);
    editor.flashNotification(`Something went wrong`, "error");
  }
  editor.flashNotification(`Generation complete`, "info");
}

export async function fullPageCompletion() {
  const request = await readSettings();
  const prompt = await editor.getText();
  request.completion.prompt = prompt;
  console.log(request.completion)
  try {
    const apiKey = await getKeys();
    const openai = new OpenAI(apiKey);
    editor.flashNotification("Generating completion...", "info");
    const response = await openai.createCompletion(request.completion);
    editor.insertAtCursor(response.choices[0].text);
  }
  catch (err) {
    console.log(err);
    editor.flashNotification(`Something went wrong`, "error");
  }
  editor.flashNotification(`Generation complete`, "info");
}

export async function selectionCompletion() {
  const selectedText = await editor.getText()
  const selection = await editor.getSelection()
  const prompt = selectedText.slice(selection.from, selection.to)
  const request = await readSettings();
  request.completion.prompt = prompt;
  console.log(request.completion)
  try {
    const apiKey = await getKeys();
    const openai = new OpenAI(apiKey);
    editor.flashNotification("Generating completion...", "info");
    const response = await openai.createCompletion(request.completion);
    editor.insertAtPos(response.choices[0].text, selection.to)
  }
  catch (err) {
    console.log(err);
    editor.flashNotification(`Something went wrong`, "error");
  }
  editor.flashNotification(`Generation complete`, "info");
}

export async function imageGeneration() {
  const request = await readSettings();
  const selectedText = await editor.getText()
  const selection = await editor.getSelection()
  const prompt = selectedText.slice(selection.from, selection.to)
  request.imageGeneration.prompt = prompt;
  console.log(request.imageGeneration)
  editor.flashNotification("Generating image...", "info");
  try {
    const apiKey = await getKeys();
    const openai = new OpenAI(apiKey);
    const response = await openai.createImage(request.imageGeneration);
    editor.insertAtPos(`![${prompt}](${response.data[0].url})`, selection.to);
    //console.log(response)
  }
  catch (err) {
    console.log(err);
    editor.flashNotification(`Something went wrong`, "error");
  }
  editor.flashNotification(`Generation complete`, "info");
}

export async function editSelection() {
  const selectedText = await editor.getText()
  const selection = await editor.getSelection()
  const prompt = selectedText.slice(selection.from, selection.to)
  const request = await readSettings();
  const instruction: string | undefined = await editor.prompt("Enter edit instruction, for example 'Fix spelling' or 'Translate to Latin'")
  request.edit.input = prompt;
  request.edit.instruction = instruction;
  console.log(request.edit)
  try {
    const apiKey = await getKeys();
    const openai = new OpenAI(apiKey);
    editor.flashNotification("Generating edit...", "info");
    const response = await openai.createEdit(request.edit);
    editor.insertAtPos(`\n\n Edited text: \n\n` + response.choices[0].text, selection.to)
  }
  catch (err) {
    console.log(err);
    editor.flashNotification(`Something went wrong`, "error");
  }
  editor.flashNotification(`Generation complete`, "info");
}