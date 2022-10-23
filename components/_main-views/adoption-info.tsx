import { PropsWithChildren } from 'react';
import { renderMarkdown } from '@/root/shared-utilities-and-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React, { FormEvent } from 'react';

interface IAdoptionInfoProps extends PropsWithChildren {
  content: string; // markdown
}

const AdoptionInfo: React.FC<IAdoptionInfoProps> = ({ content }) => {
  const formRef = React.createRef<HTMLFormElement>();
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  function encode(data: {[key: string]: any}) {
    return Object.keys(data)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Execute the reCAPTCHA when the form is submitted
    recaptchaRef.current?.execute();
  };

  const onReCAPTCHAChange = (captchaCode: string|null) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if(!captchaCode) {
      return;
    }
    if (!formRef.current?.checkValidity()) {
      alert('please fill out the entire contact form');
      return;
    }

    const formData = new FormData(formRef.current || undefined);

    // Else reCAPTCHA was executed successfully so proceed with the 
    // alert
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        'form-name': formData.get('form-name'), 
        'g-recaptcha-response': captchaCode, 
        'name': formData.get('name'), 
        'email': formData.get('email'), 
        'message': formData.get('message')
      }),
    })
    .then(() => { window.location.href = '/success/'; })
    .catch((error) => alert(error));

    // Reset the reCAPTCHA so that it can be executed again if user 
    // submits another email.
    //recaptchaRef.current?.reset();
  }

  return (
    <div className="subpage-container">
      <header className="subpage-header">Adoption Info</header>
      {renderMarkdown(content)}
      <form
        ref={formRef}
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="favorite-cat-name"
        data-netlify-recaptcha="true"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name: <input type="text" name="name" required />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type="email" name="email" required />
          </label>
        </p>
        <p className="hidden">
          <label>
            Favorite Cat Name: <input name="favorite-cat-name" />
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name="message" required ></textarea>
          </label>
        </p>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="normal"
          sitekey={process.env.SITE_RECAPTCHA_KEY || '6LeidaMiAAAAAMbTx2qR4nXAjZkmi4NxvV2Bo7TY'}
          onChange={onReCAPTCHAChange}
        />
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  );
};

export default AdoptionInfo;
