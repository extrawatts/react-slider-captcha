# @tokensuite/react-slider-captcha-v2-react

## Installation

React frontend:

```
npm i @tokensuite/react-slider-captcha-v2-react
```

## Usage

React:

```
import SliderCaptcha from '@tokensuite/react-slider-captcha-v2-react';

function verifiedCallback(token) {
  console.log('Captcha token: ' + token);
}

function App() {
  return (
    <SliderCaptcha
      create="https://example.com/captcha/create"
      verify="https://example.com/captcha/verify"
      callback={verifiedCallback}
    />
  );
}
```

### React component props

| Name     | Type                                  | Default                                                             | Description                                                                                                                          |
| :------- | ------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| callback | func                                  | `(token) => console.log(token)`                                     | Called with token on successful verification                                                                                         |
| create   | string or func                        | `captcha/create`                                                    | Either the URL to fetch data from or a `function ()` returning a promise which resolves with `{ background, slider }` as PNG buffers |
| verify   | string or func                        | `captcha/verify`                                                    | Either the URL to fetch data from or a `function (response, trail)` returning a promise which resolves with `{ result, token }`      |
| text     | { anchor: string, challenge: string } | `{ anchor: 'I am human', challenge: 'Slide to finish the puzzle' }` | Text used for captcha                                                                                                                |
| variant  | string                                | `light`                                                             | Use `'light'` for light theme, `'dark'` for dark theme                                                                               |
| hasReloadButton  | boolean                                | false                                                             | Use false for no reload button, true for a reload button on top right                                                                               |
| hasOutsideClick  | boolean                                | false                                                             | Use false for no outside click, true for a closing on outside click                                                                               |
| hideButton  | boolean                                | false                                                             | If false the click to solve captcha button will be hidden                                                                               |

Light:\
![](https://raw.githubusercontent.com/adrsch/slider-captcha/master/light.png)\
Dark:\
![](https://raw.githubusercontent.com/adrsch/slider-captcha/master/dark.png)

## Inspiration

  [Slider Captcha](https://github.com/adrsch/slider-captcha) - A captcha library for web applications from [adrsch](https://github.com/adrsch) (MIT License)
