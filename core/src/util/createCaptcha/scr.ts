import createCaptcha from "./createCaptcha";

createCaptcha()
  .then((captcha) => {
    console.log(captcha);
  })
  .catch((err) => {
    console.log(err);
  });
