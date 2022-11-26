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
  catch {
    console.log("No settings found");
  }
}