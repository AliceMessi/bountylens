# BountyLens — demo video script (≤3:00, target 2:20)

> Voce principale: ElevenLabs → voce `A.d.C` (narrazione EN)
> Presenter/avatar: Higgsfield → voce `Alfredo` (solo intro 0-15s, stesso testo Scena 1)
> Screen reali obbligatori: demo URL + CLI live Token Factory nei log (i giudici li chiedono)

## Voiceover EN (~300 parole, ~2:20 a 135 wpm)

File audio: `assets/voiceover-ADС.mp3` (da ElevenLabs, voce A.d.C)

```
[0:00-0:15] Hunting GitHub bounties wastes hours. Assigned issues, crowded threads, vague specs, zero payouts. I triaged 34 real issues — and built BountyLens to filter them in seconds.

[0:15-0:55] Paste any issue. BountyLens returns go or skip, a feasibility score, risk flags like already-assigned or crowded, and a TDD test plan. Try the three presets: clean goes, crowded hundred-dollar hook skips, assigned seven-fifty skips.

[0:55-1:40] Under the hood: NVIDIA Nemotron on Nebius Token Factory. One OpenAI-compatible endpoint. Nano 30B for fast everyday triage, Ultra for deep reasoning. Strict JSON in, parsed verdict out, offline heuristic fallback so the demo never breaks. Live verified: three for three, nemotron mode.

[1:40-2:10] Repo is public MIT, tests five of five green, docs explain Nemotron plus Token Factory. Scan the QR for the live demo.

[2:10-2:25] BountyLens — stop working for free. Built by Alfredo, Hoken Tech, for the Nebius x NVIDIA hackathon.
```

## Timeline montaggio

| T | Video (Higgsfield) | Audio |
|---|---|---|
| 0:00-0:15 | Higgsfield presenter `Alfredo`: close-up dev + bounty-board overlay. Prompt sotto (A) | ElevenLabs A.d.C mix basso / oppure voce Alfredo sync |
| 0:15-0:55 | Screen-recording reale demo.html: click 3 preset (usa `assets/demo-*.png` come storyboard) | A.d.C voiceover |
| 0:55-1:40 | Screen-recording CLI live: `NEBIUS_API_KEY … node dist/src/index.js` → `mode: nemotron` + endpoint Token Factory in evidenza | A.d.C voiceover |
| 1:40-2:10 | Higgsfield B-roll (prompt B): server corridor + JSON cards go/skip | A.d.C voiceover |
| 2:10-2:25 | Outro Higgsfield (prompt C): logo BountyLens + QR `assets/qr-demo.png` fullscreen 4s | A.d.C voiceover chiusura |

## Higgsfield — comandi pronti

Account attivo: creator plan. Voce presenter: seleziona `Alfredo` nello step avatar/audio.

```bash
# (A) Intro presenter 8s — voce Alfredo
higgsfield generate create seedance_2_5 --prompt "close-up of a focused italian developer at a dark workstation, shallow depth of field, floating GitHub bounty cards marked $750 assigned and $100 crowded, subtle push-in, cinematic, 16:9" --duration 8 --resolution 1080p --aspect_ratio 16:9 --wait

# (B) B-roll infrastruttura 8s
higgsfield generate create seedance_2_5 --prompt "slow dolly through a dark GPU server corridor with green status lights, holographic JSON cards floating: go 0.8, skip crowded, skip assigned, clean tech aesthetic, 16:9" --duration 8 --resolution 1080p --aspect_ratio 16:9 --wait

# (C) Outro logo — immagine statica per i 4s finali con QR in montaggio
higgsfield generate create gpt_image_2_5 --prompt "minimal dark tech outro card, centered text BountyLens, subtitle stop working for free, neon green accents on near-black, wide 16:9, empty right third for QR code" --aspect_ratio 16:9 --resolution 2k --wait
```

Montaggio: incolla QR (`assets/qr-demo.png`) a destra dell'outro per 4s + link demo in descrizione YouTube.

## ElevenLabs — istruzioni (voce A.d.C)

1. Apri ElevenLabs → Text to Speech → voce `A.d.C` → modello Eleven v3 / Multilingual v2, stability ~60, clarity ~75.
2. Incolla il blocco voiceover sopra (tutto, con pause naturali ai punti).
3. Generate → scarica MP3 → salva come `projects/nebius-nemotron-agent/assets/voiceover-ADС.mp3`.
4. Durata target ≤2:30. Se sfora, taglia la frase "Scan the QR…" (opzionale).

## Checklist pre-upload YouTube

- [ ] Pubblico, titolo `BountyLens — Nemotron Bounty Triage (Nebius x NVIDIA)`, ≤3:00
- [ ] Si vedono: Token Factory URL nei log + `mode: nemotron` + demo.html reale
- [ ] Descrizione con demo URL https://alicemessi.github.io/bountylens/demo.html + repo https://github.com/AliceMessi/bountylens
- [ ] Sottotitoli EN auto-check
