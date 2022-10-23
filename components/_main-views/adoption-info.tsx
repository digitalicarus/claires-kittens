import { PropsWithChildren } from 'react';
import { renderMarkdown } from '@/root/shared-utilities-and-types';

interface IAdoptionInfoProps extends PropsWithChildren {
  content: string; // markdown
}

const AdoptionInfo: React.FC<IAdoptionInfoProps> = ({ content }) => (
  <div className="subpage-container">
    <header className="subpage-header">Adoption Info</header>
    {renderMarkdown(content)}
    <form
      name="contact"
      method="POST"
      action="/success"
      data-netlify="true"
      netlify-honeypot="favorite-cat-name"
      data-netlify-recaptcha="true"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p>
        <label>
          Your Name: <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Your Email: <input type="email" name="email" />
        </label>
      </p>
      <p className="hidden">
        <label>
          Favorite Cat Name: <input name="favorite-cat-name" />
        </label>
      </p>
      <p>
        <label>
          Message: <textarea name="message"></textarea>
        </label>
      </p>
      <div data-netlify-recaptcha="true"></div>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  </div>
);

export default AdoptionInfo;
