import { PropsWithChildren, useState } from 'react';
import { renderMarkdown } from '@/root/shared-utilities-and-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React, { FormEvent } from 'react';
import styles from './adoption-info.module.scss';

interface IAdoptionInfoProps extends PropsWithChildren {
  content: string; // markdown
}

//-- TODO: move these into the CMS
const emailAddress = 'contact@claireskittens.com';
const contactEmailComponents: IEmailComponents = {
  to: emailAddress,
  subject: "I'm interested in Claire's Kittens!",
  body: "Please tell me more about [favorite kittens] :)"
};

//-- TODO: move all this encoding and email stuff into utilities
function encodePostData(data: {[key: string]: any}) {
  return Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    )
    .join("&");
}

interface IEmailComponents {
  to: string;
  subject: string;
  body: string;
}

function getNativeEmailHref ({ to, subject, body }: IEmailComponents): string {
  return `mailto:${to}?subject=${subject}`
}

function getGmailWebmailHref ({ to, subject, body }: IEmailComponents): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}&to=${to}`;
}
function getYahooWebmailHref ({ to, subject, body }: IEmailComponents): string {
  return `http://compose.mail.yahoo.com/?subj=${subject}&amp;body=${body}&amp;to=${to}`;
}
function getMsWebmailHref ({ to, subject, body }: IEmailComponents): string {
  return `https://outlook.live.com/default.aspx?rru=compose&amp;subject=${subject}&amp;body=${body}&amp;to=${to}`;
}
function getAolWebmailHref ({ to, subject, body }: IEmailComponents): string {
  return `http://mail.aol.com/mail/compose-message.aspx?subject=${subject}&amp;body=${body}&amp;to=${to}`;
}

const AdoptionInfo: React.FC<IAdoptionInfoProps> = ({ content }) => {
  const formRef = React.createRef<HTMLFormElement>();
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  const [captchaCode, setCaptchaCode] = useState<string|null>(null);
  const [copyEmailSuccess, setCopyEmailSuccess] = useState<string>('');

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress).then(() => {
      setCopyEmailSuccess('Copied!');
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (captchaCode) {
      const formData = new FormData(formRef.current || undefined);
      const postBody = encodePostData({
          'form-name': formData.get('form-name'), 
          'g-recaptcha-response': captchaCode, 
          'name': formData.get('name'), 
          'email': formData.get('email'), 
          'message': formData.get('message')
      });

      const success = () => {
        alert('Thank you so much! We\'ll be in touch.');
        window.location.href = '/'; 
      }

      const fakeSubmit = () => {
        console.log('submit: ', postBody);
        success();
      }

      //fakeSubmit(); return;

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: postBody
      })
      .then(success)
      .catch((error) => alert(error));
    }
  };

  const onReCAPTCHAClear = () => {
    setCaptchaCode(null);
  }

  const onReCAPTCHAChange = (captchaCode: string|null) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if(!captchaCode) {
      return; // how did this happen?
    }

    setCaptchaCode(captchaCode);
  }

  return (
    <div className={`${styles['adoption-info']} subpage-container`}>
      <header className="subpage-header">Adoption Info</header>
      {renderMarkdown(content)}
      <section className="oldschool">
        <h1>Your Email Client</h1>
        <p className="copy-email">
          Click this link to use your computer's Email: <a href={getNativeEmailHref(contactEmailComponents)}>{emailAddress}</a>
          <p>
            or <button onClick={copyEmail}>Copy Email Address</button> <span className="success">{ copyEmailSuccess }</span>
          </p>
        </p>
      </section>
      <section className="webmail">
        <h1>Web Email Links</h1>
        <ul>
            <li>
              <a href={getGmailWebmailHref(contactEmailComponents)} onClick={() => { return true; }} target="_blank">Gmail</a>
            </li>
            <li>
              <a href={getYahooWebmailHref(contactEmailComponents)} onClick={() => { return true; }} target="_blank">Yahoo</a>
            </li>
            <li>
              <a href={getMsWebmailHref(contactEmailComponents)} onClick={() => { return true; }} target="_blank">Hotmail, Outlook Web 365, Live Mail</a>
            </li>
            <li>
              <a href={getAolWebmailHref(contactEmailComponents)} onClick={() => { return true; }} target="_blank">AOL Mail</a>
            </li>
        </ul>
      </section>
      <section className="contact">
        <h1>Contact Form</h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="favorite-cat-name"
          data-netlify-recaptcha="true"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label>
              Your Name <input type="text" name="name" required />
            </label>
          </p>
          <p>
            <label>
              Your Email <input type="email" name="email" required />
            </label>
          </p>
          <p className="hidden">
            <label>
              Favorite Cat Name <input name="favorite-cat-name" />
            </label>
          </p>
          <p>
            <label>
              Message <textarea name="message" required ></textarea>
            </label>
          </p>
          <p className="recaptcha">
            <ReCAPTCHA
              ref={recaptchaRef}
              size="normal"
              sitekey={process.env.SITE_RECAPTCHA_KEY || '6LeidaMiAAAAAMbTx2qR4nXAjZkmi4NxvV2Bo7TY'}
              onChange={onReCAPTCHAChange}
              onErrored={onReCAPTCHAClear}
              onExpired={onReCAPTCHAClear}
            />
          </p>
          <p className="send-btn-wrapper">
            <button type="submit">Send</button>
          </p>
        </form>
      </section>
    </div>
  );
};

export default AdoptionInfo;
