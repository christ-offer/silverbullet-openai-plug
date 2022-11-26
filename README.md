# SilverBullet plug for OpenAI Completions

Warning: Do not use other than on localhost. There is no encryption or any
security in place at all.

For this to work you will have to create a page called `SECRETS`. And create a
yaml codeblock that looks like this:

```yaml
openai: your-key-here
```

You will also need to specify the model/engine settings in a page called
`openai/settings` and create a yaml codeblock that looks like this:

```yaml
codeCompletion:
  model: code-davinci-002
  max_tokens: 200
  temperature: 1
  top_p: 1
  n: 1
  stream: false
  logprobs: null
  stop: ""
completion:
  model: text-davinci-002
  max_tokens: 200
  temperature: 0.7
  top_p: 1
  n: 1
  stream: false
  logprobs: null
  stop: ""
edit:
  model: text-edit-davinci-001
  instruction: "Fix any spelling mistake"
imageGeneration:
  n: 1
  size: "1024x1024"
```

It uses a OpenAI Library/Wrapper I made myself. You can find it here:
https://codeberg.org/pyotrgrowpotkin/deno-openai

The current commands are:

- OpenAI: Full Page Completion
  - Creates a completion based on the full content of the current page
- OpenAI: Selection Completion
  - Creates a completion based on the selected text

## Wait, SilverBullet?

If you don't know what it is, check its [webpage](https://silverbullet.md), but
if you want me to spoil the fun: it is an extensible note taking app with
markdown and plain files at its core (well... there is a bit of magic in there
too, but what good it would be without a little magic?)

## Installation

You can also install it directly from this github repo, by adding the following
to your `PLUGS` note:

```
- github:christ-offer/silverbullet-openai-plug/openai.plug.json
```

to your `PLUGS` file, run `Plugs: Update` command and off you go!

## Build

To build this plug, make sure you have `plugos-bundle` installed. If not, be
sure to have [Deno](https://deno.land) installed first, then run:

```shell
deno install -f -A --unstable --importmap https://deno.land/x/silverbullet/import_map.json https://deno.land/x/silverbullet/plugos/bin/plugos-bundle.ts
```

After this, build the plug with

```shell
deno task build
```

Or to watch for changes and rebuild automatically

```shell
deno task watch
```

Then, load the locally built plug, add it to your `PLUGS` note with an absolute
path, for instance:

```
- file:/Users/you/path/to/openai.plug.json
```

And run the `Plugs: Update` command in SilverBullet.
