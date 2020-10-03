# Kanji Clock Card by [@sopelj](https://www.github.com/sopelj)

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)
![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]

A simple clock widget using Japanese Kanji for time and date

*Please ⭐️ this repo if you find it useful*

![12h](./images/12h.png)
![12h Kanji](./images/12h-kanji.png)

## Options

| Name              | Type    | Requirement  | Description                                 | Default       |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------- |
| type              | string  | **Required** | `custom:kanji-clock-card`                   |               |  
| use_24h           | boolean | **Optional** | Use 24 hour clock                           | `false`       |
| short_weekdays    | boolean | **Optional** | Abbreviate weekdays to single kanji         | `false`       |
| kanji_numbers     | boolean | **Optional** | Convert numbers to kanji                    | `false`       |

## Installation with Hacs

```yaml
- url: "lovelace-kanji-clock-card/kanji-clock-card.js"
  type: module
```

## Credits

This was created using the [Boilerplate Card](https://github.com/custom-cards/boilerplate-card) by [@iantrich](https://www.github.com/iantrich)

[commits-shield]: https://img.shields.io/github/commit-activity/y/sopelj/lovelace-kanji-clock-card.svg?style=for-the-badge
[commits]: https://github.com/sopelj/lovelace-kanji-clock-card/commits/master
[forum]: https://community.home-assistant.io/c/projects/frontend
[license-shield]: https://img.shields.io/github/license/sopelj/lovelace-kanji-clock-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/maintenance/yes/2020.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/sopelj/lovelace-kanji-clock-card.svg?style=for-the-badge
[releases]: https://github.com/sopelj/lovelace-kanji-clock-card/releases
