import { useState, useEffect, useRef } from 'react';
import { LoadingIcon } from './icons';
import { TextType } from './ReactSliderCaptcha';
import Challenge from './Challenge';

interface CardProps {
  text: TextType;
  fetchCaptcha: () => Promise<any>;
  submitResponse: (response: any, trail: any) => Promise<any>;
  hasReloadButton?: boolean;
}

function Card(props: CardProps) {
  const { text, fetchCaptcha, submitResponse, hasReloadButton } = props;
  const [key, setKey] = useState(Math.random());
  const [captcha, setCaptcha] = useState(false);
  const isMounted = useRef(false);

  const refreshCaptcha = () => {
    fetchCaptcha().then((newCaptcha) => {
      setTimeout(() => {
        if (!isMounted.current) return;
        setKey(Math.random());
        setCaptcha(newCaptcha);
      }, 300);
    });
  };
  const completeCaptcha = (response: any, trail: any) =>
    new Promise((resolve) => {
      submitResponse(response, trail).then((verified) => {
        if (verified) {
          resolve(true);
        } else {
          refreshCaptcha();
          resolve(false);
        }
      });
    });

  useEffect(() => {
    isMounted.current = true;
    refreshCaptcha();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="scaptcha-card-container scaptcha-card-element">
      {captcha ? (
        <Challenge
          key={key}
          text={text}
          captcha={captcha}
          completeCaptcha={completeCaptcha}
          reloadCaptcha={refreshCaptcha}
          hasReloadButton={hasReloadButton}
        />
      ) : (
        <div className="scaptcha-card-loading scaptcha-card-element">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
}

export default Card;
