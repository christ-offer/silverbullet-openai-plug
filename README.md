# SilverBullet plug for OpenAI Completions

Currently does two things, completions based on the full page or completions
based on selection.

The commands are:

- OpenAI: Full Page Completion
- OpenAI: Selection Completion

To set up your API Key, create a page at /openai/settings and put only the api
key there.

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
