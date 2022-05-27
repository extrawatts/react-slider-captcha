import { useState } from 'react';
import Anchor from './Anchor';
import Theme from './Theme';

const fetchCaptcha = (create: string | typeof Function) => async () =>
  create instanceof Function
    ? create()
    : fetch(create, {
        // Use create as API URL for fetch
        method: 'GET',
        credentials: 'include',
      }).then((message) => message.json());

const fetchVerification =
  (verify: string | typeof Function) => async (response: any, trail: any) =>
    verify instanceof Function
      ? verify(response, trail) // Use provided promise for verifying captcha
      : fetch(verify, {
          // Verification API URL provided instead
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            response,
            trail,
          }),
        }).then((message) => message.json());

export interface TextType {
  anchor: string;
  challenge: string;
}

//TODO: we can pass captchaOptions as a prop in here
interface ReactSliderCaptchaProps {
  callback: (token: string) => void;
  create: string | typeof Function;
  verify: string | typeof Function;
  variant?: 'light' | 'dark';
  text?: TextType;
  hasReloadButton?: boolean;
  hasOutsideClick?: boolean;
  hideButton?: boolean;
}

const SliderCaptcha = (props: ReactSliderCaptchaProps) => {
  const [verified, setVerified] = useState<boolean>(false);
  const callback = props.callback || ((token) => console.log(token));
  const create = props.create || 'captcha/create';
  const verify = props.verify || 'captcha/verify';
  const variant = props.variant || 'light';
  const text = props.text || {
    anchor: 'I am human',
    challenge: 'Slide to finish the puzzle',
  };
  const { hasReloadButton, hasOutsideClick, hideButton } = props;
  const submitResponse = (response: any, trail: any) =>
    new Promise((resolve) => {
      fetchVerification(verify)(response, trail).then((verification) => {
        if (
          !verification.result ||
          verification.result !== 'success' ||
          !verification.token
        ) {
          resolve(false);
        } else {
          setTimeout(() => {
            callback(verification.token);
            setVerified(true);
          }, 500);
          resolve(true);
        }
      });
    });
  return (
    <div className="scaptcha-container">
      <Theme variant={variant} />
      <Anchor
        text={text}
        fetchCaptcha={fetchCaptcha(create)}
        submitResponse={submitResponse}
        verified={verified}
        hasReloadButton={hasReloadButton}
        hasOutsideClick={hasOutsideClick}
        hideButton={hideButton}
      />
    </div>
  );
};

export default SliderCaptcha;
