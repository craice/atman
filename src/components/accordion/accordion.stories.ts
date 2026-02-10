import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './accordion.js';

const meta: Meta = {
  title: 'Components/Data Display/Accordion',
  component: 'atman-accordion',
  tags: ['autodocs', 'stable'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow multiple items open at once',
    },
  },
  args: {
    multiple: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <atman-accordion ?multiple=${args.multiple}>
      <atman-accordion-item expanded>
        <span slot="header">What is Atman Design System?</span>
        Atman is a lean, accessible, and modern Design System built with Web Components, TypeScript, and CSS Custom Properties.
      </atman-accordion-item>
      <atman-accordion-item>
        <span slot="header">How do I install it?</span>
        Install via npm: <code>npm install atman-ds</code>. Then import the components you need.
      </atman-accordion-item>
      <atman-accordion-item>
        <span slot="header">Is it accessible?</span>
        Yes! All components are WCAG AA compliant with proper ARIA attributes and keyboard navigation.
      </atman-accordion-item>
    </atman-accordion>
  `,
};

export const Multiple: Story = {
  render: () => html`
    <atman-accordion multiple>
      <atman-accordion-item expanded>
        <span slot="header">Section 1</span>
        Content for section 1. Multiple sections can be open simultaneously.
      </atman-accordion-item>
      <atman-accordion-item expanded>
        <span slot="header">Section 2</span>
        Content for section 2. This is also open by default.
      </atman-accordion-item>
      <atman-accordion-item>
        <span slot="header">Section 3</span>
        Content for section 3. Click to expand.
      </atman-accordion-item>
    </atman-accordion>
  `,
};

export const WithDisabled: Story = {
  render: () => html`
    <atman-accordion>
      <atman-accordion-item>
        <span slot="header">Available Section</span>
        This section can be toggled.
      </atman-accordion-item>
      <atman-accordion-item disabled>
        <span slot="header">Disabled Section</span>
        This content is hidden and the section cannot be toggled.
      </atman-accordion-item>
      <atman-accordion-item>
        <span slot="header">Another Available Section</span>
        This section can also be toggled.
      </atman-accordion-item>
    </atman-accordion>
  `,
};

export const FAQ: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h3 style="font-family: var(--atman-font-family); color: var(--atman-color-text); margin-bottom: 16px;">Frequently Asked Questions</h3>
      <atman-accordion>
        <atman-accordion-item>
          <span slot="header">What payment methods do you accept?</span>
          We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans.
        </atman-accordion-item>
        <atman-accordion-item>
          <span slot="header">Can I cancel my subscription?</span>
          Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.
        </atman-accordion-item>
        <atman-accordion-item>
          <span slot="header">Do you offer refunds?</span>
          We offer a 30-day money-back guarantee for all plans. Contact our support team for assistance.
        </atman-accordion-item>
        <atman-accordion-item>
          <span slot="header">How do I contact support?</span>
          You can reach our support team via email at support@example.com or through the in-app chat widget.
        </atman-accordion-item>
      </atman-accordion>
    </div>
  `,
};
