import React, { useState } from 'react';
import { TextType } from './ReactSliderCaptcha';
import Card from './Card';
import { SuccessIcon } from './icons';

interface AnchorProps {
  text: TextType;
  fetchCaptcha: () => Promise<any>;
  submitResponse: (response: any, trail: any) => Promise<any>;
  verified: boolean;
}

function Anchor(props: AnchorProps) {
  const { text, fetchCaptcha, submitResponse, verified } = props;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleKey = (e: any) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      setOpen(true);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };
  return (
    <div>
      <div
        className="scaptcha-anchor-container scaptcha-anchor-element"
        onClick={handleOpen}
      >
        <button
          suppressHydrationWarning
          type="button"
          className={`scaptcha-anchor-checkbox ${
            !verified && 'scaptcha-anchor-checkbox-default'
          } scaptcha-anchor-element`}
          onKeyUp={handleKey}
        >
          {verified && <SuccessIcon />}
        </button>
        <div className="scaptcha-anchor-label scaptcha-anchor-element">
          {text.anchor}
        </div>
      </div>
      {!verified && open && (
        <div>
          <div className="scaptcha-hidden" onClick={handleClose} />
          <Card
            fetchCaptcha={fetchCaptcha}
            submitResponse={submitResponse}
            text={text}
          />
        </div>
      )}
    </div>
  );
}

export default Anchor;
