# Physiobuddies Therapist Brand Spec

Source: uploaded therapist dashboard and mobile reference screenshots in this project folder.

## Tokens

```css
:root {
  --bg:      oklch(96.5% 0.018 236);
  --surface: oklch(99.2% 0.010 190);
  --fg:      oklch(19% 0.045 246);
  --muted:   oklch(52% 0.025 246);
  --border:  oklch(88% 0.014 235);
  --accent:  oklch(35% 0.085 236);

  --font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif;
  --font-body:    -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'IBM Plex Mono', ui-monospace, Menlo, monospace;
}
```

## Extended Status Tokens

```css
:root {
  --success: oklch(58% 0.145 150);
  --warning: oklch(72% 0.145 82);
  --danger:  oklch(58% 0.18 28);
  --info:    oklch(57% 0.12 220);
  --tint:    oklch(97.5% 0.020 190);
  --nav:     oklch(31% 0.082 238);
}
```

## Layout Posture

- Light medical canvas with pale blue background and white or faint mint surfaces.
- Deep blue navigation/header bars carry the strongest brand weight; keep accent usage decisive.
- Cards use compact spacing, 8px or smaller radii, thin grey borders, and very subtle shadow only for elevation.
- Status is text-first with restrained tinted chips: green verified/paid, red rejected/processing, amber pending.
- Forms are direct and operational: clear labels, full-width inputs, dashed upload zones, and primary CTAs centered or sticky near the bottom.
