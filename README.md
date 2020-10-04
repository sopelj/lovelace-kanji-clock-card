# Kanji Clock Card by [@sopelj](https://www.github.com/sopelj)

[![GitHub Release][https://img.shields.io/github/release/sopelj/lovelace-kanji-clock-card.svg?style=for-the-badge]][https://github.com/sopelj/lovelace-kanji-clock-card/releases]
[![License][https://img.shields.io/github/license/sopelj/lovelace-kanji-clock-card.svg?style=for-the-badge]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)
![Project Maintenance][https://img.shields.io/maintenance/yes/2020.svg?style=for-the-badge]

A simple clock widget using Japanese Kanji for time and date

*Please ⭐️ this repo if you find it useful*

![Example](./examples/cards.png)

## Options

| Name              | Type    | Requirement  | Description                                 | Default       |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------- |
| type              | string  | **Required** | `custom:kanji-clock-card`                   |               |  
| use_24h           | boolean | **Optional** | Use 24 hour clock                           | `false`       |
| short_weekdays    | boolean | **Optional** | Abbreviate weekdays to single kanji         | `true`       |
| kanji_numbers     | boolean | **Optional** | Convert numbers to kanji                    | `false`       |

## Installation with Hacs

```yaml
- url: /hacsfiles/lovelace-kanji-clock-card/kanji-clock-card.js
  type: module
```

## Troubleshooting

If it is displaying strangely, please be sure you have a font that can display Kanji. I set it to use 'Sarasa UI J', 'Noto Sans JP', Helvetica then Arial in that order. You can customize the font (or any other style for that matter) with the [Card Mod](https://github.com/thomasloven/lovelace-card-mod) if you wish.

## Development

Clone the repo and run `yarn install` or `npm install`.

You can then run `yarn run start` to run `rollup` watch. You can then add the developement card by adding the following to your lovelace config. (Replacing IP_ADDRESS with the IP of the computer on which you're running the command) *You may need to temporarily allow loading of mixed resources if you are testing on a site with HTTPS*

```yaml
- url: http://IP_ADDRESS/kanji-clock-card.js
  type: module
```

You can then use `yarn run lint` and then `yarn run build`

## Credits

This was created using the [Boilerplate Card](https://github.com/custom-cards/boilerplate-card) by [@iantrich](https://www.github.com/iantrich)
