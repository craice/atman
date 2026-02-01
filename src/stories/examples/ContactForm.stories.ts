import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../components/input/input.js';
import '../../components/button/button.js';
import '../../components/icon/icon.js';
import '../../components/card/card.js';
import '../../components/checkbox/checkbox.js';
import '../../components/select/select.js';

const meta: Meta = {
  title: 'Examples/Contact Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const ContactForm: Story = {
  render: () => html`
    <style>
      .contact-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px;
        max-width: 900px;
        font-family: var(--atman-font-family, 'Geist', sans-serif);
      }

      @media (max-width: 768px) {
        .contact-container { grid-template-columns: 1fr; }
      }

      .contact-info {
        padding: 32px 0;
      }

      .contact-title {
        font-size: 32px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 12px;
      }

      .contact-subtitle {
        font-size: 16px;
        color: var(--atman-color-text-secondary, #616161);
        line-height: 1.6;
        margin: 0 0 32px;
      }

      .contact-methods {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .contact-method {
        display: flex;
        gap: 16px;
      }

      .method-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: rgba(26, 115, 232, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--atman-color-primary, #1A73E8);
        flex-shrink: 0;
      }

      .method-content h4 {
        font-size: 16px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 4px;
      }

      .method-content p {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0;
      }

      .contact-form-wrapper {
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 16px;
        padding: 32px;
      }

      .form-title {
        font-size: 20px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 24px;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 16px;
      }

      @media (max-width: 500px) {
        .form-row { grid-template-columns: 1fr; }
      }

      .form-group {
        margin-bottom: 16px;
      }

      .form-label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: var(--atman-color-text, #212121);
        margin-bottom: 6px;
      }

      .form-label .required {
        color: var(--atman-color-destructive, #EA4335);
      }

      .form-textarea {
        width: 100%;
        min-height: 120px;
        padding: 12px 16px;
        font-family: inherit;
        font-size: 14px;
        color: var(--atman-color-text, #212121);
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 8px;
        resize: vertical;
        transition: border-color 0.2s, box-shadow 0.2s;
      }

      .form-textarea:focus {
        outline: none;
        border-color: var(--atman-color-primary, #1A73E8);
        box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
      }

      .form-textarea::placeholder {
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .form-checkbox-group {
        margin: 20px 0;
      }

      .form-footer {
        margin-top: 24px;
      }

      .social-links {
        display: flex;
        gap: 12px;
        margin-top: 32px;
        padding-top: 32px;
        border-top: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .social-link {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--atman-color-surface-hover, #F5F5F5);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--atman-color-text-secondary, #616161);
        transition: all 0.2s;
        cursor: pointer;
      }

      .social-link:hover {
        background: var(--atman-color-primary, #1A73E8);
        color: white;
      }
    </style>

    <div class="contact-container">
      <div class="contact-info">
        <h1 class="contact-title">Get in Touch</h1>
        <p class="contact-subtitle">
          Have a question or want to work together? We'd love to hear from you.
          Fill out the form or reach out directly using the info below.
        </p>

        <div class="contact-methods">
          <div class="contact-method">
            <div class="method-icon">
              <atman-icon name="mail" size="md"></atman-icon>
            </div>
            <div class="method-content">
              <h4>Email</h4>
              <p>hello@atman.design</p>
            </div>
          </div>

          <div class="contact-method">
            <div class="method-icon">
              <atman-icon name="phone" size="md"></atman-icon>
            </div>
            <div class="method-content">
              <h4>Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div class="contact-method">
            <div class="method-icon">
              <atman-icon name="map-pin" size="md"></atman-icon>
            </div>
            <div class="method-content">
              <h4>Office</h4>
              <p>123 Design Street, San Francisco, CA 94102</p>
            </div>
          </div>

          <div class="contact-method">
            <div class="method-icon">
              <atman-icon name="clock" size="md"></atman-icon>
            </div>
            <div class="method-content">
              <h4>Hours</h4>
              <p>Mon - Fri: 9AM - 6PM PST</p>
            </div>
          </div>
        </div>

        <div class="social-links">
          <a class="social-link"><atman-icon name="twitter" size="sm"></atman-icon></a>
          <a class="social-link"><atman-icon name="linkedin" size="sm"></atman-icon></a>
          <a class="social-link"><atman-icon name="github" size="sm"></atman-icon></a>
          <a class="social-link"><atman-icon name="dribbble" size="sm"></atman-icon></a>
        </div>
      </div>

      <div class="contact-form-wrapper">
        <h2 class="form-title">Send us a message</h2>

        <form>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">First name <span class="required">*</span></label>
              <atman-input placeholder="John"></atman-input>
            </div>
            <div class="form-group">
              <label class="form-label">Last name <span class="required">*</span></label>
              <atman-input placeholder="Doe"></atman-input>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Email <span class="required">*</span></label>
            <atman-input type="email" placeholder="john@example.com">
              <atman-icon name="mail" size="sm" slot="prefix"></atman-icon>
            </atman-input>
          </div>

          <div class="form-group">
            <label class="form-label">Subject</label>
            <atman-select placeholder="Select a topic">
              <atman-option value="general">General Inquiry</atman-option>
              <atman-option value="support">Technical Support</atman-option>
              <atman-option value="sales">Sales Question</atman-option>
              <atman-option value="partnership">Partnership</atman-option>
              <atman-option value="other">Other</atman-option>
            </atman-select>
          </div>

          <div class="form-group">
            <label class="form-label">Message <span class="required">*</span></label>
            <textarea class="form-textarea" placeholder="Tell us how we can help..."></textarea>
          </div>

          <div class="form-checkbox-group">
            <atman-checkbox>
              I agree to the privacy policy and terms of service
            </atman-checkbox>
          </div>

          <div class="form-footer">
            <atman-button variant="primary" fullWidth>
              <atman-icon name="send" size="sm" slot="prefix"></atman-icon>
              Send Message
            </atman-button>
          </div>
        </form>
      </div>
    </div>
  `,
};
