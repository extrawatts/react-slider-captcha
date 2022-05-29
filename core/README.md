# @tokensuite/react-slider-captcha-v2-core

## Installation
Backend:

```
npm i @tokensuite/react-slider-captcha-v2-core
```

## Usage

Express:

```
import {createCaptcha, verifyCaptcha} from '@tokensuite/react-slider-captcha-v2-core'; // or @tokensuite/react-slider-captcha-v2-core/lib/esm

app.get('/captcha/create', function (req, res) {
  sliderCaptcha.create()
    .then(function ({data, solution}) {
      req.session.captcha = solution;
      req.session.save();
      res.status(200).send(data);
    });
});

app.post('/captcha/verify', function (req, res) {
  sliderCaptcha.verify(req.session.captcha, req.body)
    .then(function (verification) {
      if (verification.result === 'success') {
        req.session.token = verification.token;
        req.session.save();
      }
      res.status(200).send(verification);
    });
});
```

For quick tryout in Next.js api:

```
import {createCaptcha, verifyCaptcha} from '@tokensuite/react-slider-captcha-v2-core'; // or @tokensuite/react-slider-captcha-v2-core/lib/esm
export let solution: number;

export default async function handler(req: any, res: any) {
  createCaptcha()
    .then((resp: any) => {
      solution = resp.solution;
      res.status(200).send(resp.data);
    })
    .catch((err: any) => {
      res.status(500).send(err);
    });
}

export default async function handler(req: any, res: any) {
  verifyCaptcha(solution, req.body).then(function (verification: any) {
    res.status(200).send(verification);
  });
}

```

### Create captcha options

`sliderCaptcha.create({option: value})`

| Name        | Type   | Default                    | Description                                            |
| :---------- | ------ | -------------------------- | ------------------------------------------------------ |
| image       | buffer | randomly generated pattern | Background image used for captcha - resized to 250x150 |
| fill        | string | `#000`                     | Color used in overlay of puzzle piece on background    |
| stroke      | string | `#fff`                     | Color for outline of puzzle piece                      |
| strokeWidth | string | `0.4`                      | Puzzle piece outline width                             |
| opacity     | string | `0.5`                      | Opacity of puzzle piece overlay on background          |
| distort     | bool   | false                      | Apply distortion to the puzzle piece                   |
| rotate      | bool   | false                      | Apply a random rotation to the puzzle piece            |

### Verify captcha options

`sliderCaptcha.verify(captcha, {response, trail: {x, y}}, {option: value})`

| Name      | Type   | Default | Description                               |
| :-------- | ------ | ------- | ----------------------------------------- |
| tolerance | number | 7       | Allowed deviation from true captcha value |

## Inspiration

  [Slider Captcha](https://github.com/adrsch/slider-captcha) - A captcha library for web applications from [adrsch](https://github.com/adrsch) (MIT License)