import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../components/card/card.js';
import '../../components/button/button.js';
import '../../components/badge/badge.js';
import '../../components/icon/icon.js';
import '../../components/divider/divider.js';

const meta: Meta = {
  title: 'Examples/Pricing Cards',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const PricingCards: Story = {
  render: () => html`
    <style>
      .pricing-container {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        max-width: 1100px;
        margin: 0 auto;
        padding: 48px 24px;
      }

      .pricing-header {
        text-align: center;
        margin-bottom: 48px;
      }

      .pricing-title {
        font-size: 36px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 12px;
      }

      .pricing-subtitle {
        font-size: 18px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0;
      }

      .pricing-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 24px;
      }

      .toggle-label {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
      }

      .toggle-label.active {
        color: var(--atman-color-text, #212121);
        font-weight: 500;
      }

      .pricing-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        align-items: stretch;
      }

      @media (max-width: 900px) {
        .pricing-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
      }

      .pricing-card {
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 16px;
        padding: 32px;
        display: flex;
        flex-direction: column;
        position: relative;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .pricing-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--atman-shadow-lg);
      }

      .pricing-card.featured {
        border-color: var(--atman-color-primary, #1A73E8);
        border-width: 2px;
      }

      .pricing-card.featured::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--atman-color-primary, #1A73E8);
        border-radius: 16px 16px 0 0;
      }

      .plan-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
      }

      .plan-name {
        font-size: 20px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 8px;
      }

      .plan-desc {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 24px;
        line-height: 1.5;
      }

      .plan-price {
        display: flex;
        align-items: baseline;
        gap: 4px;
        margin-bottom: 8px;
      }

      .price-currency {
        font-size: 24px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
      }

      .price-amount {
        font-size: 48px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        line-height: 1;
      }

      .price-period {
        font-size: 16px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .plan-billing {
        font-size: 13px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
        margin-bottom: 24px;
      }

      .plan-features {
        list-style: none;
        padding: 0;
        margin: 0 0 32px;
        flex: 1;
      }

      .plan-feature {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 8px 0;
        font-size: 14px;
        color: var(--atman-color-text, #212121);
      }

      .plan-feature atman-icon {
        color: var(--atman-color-success, #34A853);
        flex-shrink: 0;
        margin-top: 2px;
      }

      .plan-feature.disabled {
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .plan-feature.disabled atman-icon {
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .plan-cta {
        margin-top: auto;
      }
    </style>

    <div class="pricing-container">
      <div class="pricing-header">
        <h1 class="pricing-title">Simple, Transparent Pricing</h1>
        <p class="pricing-subtitle">Choose the plan that's right for your team</p>

        <div class="pricing-toggle">
          <span class="toggle-label">Monthly</span>
          <atman-button variant="ghost" size="sm">
            <atman-icon name="toggle-right" size="lg"></atman-icon>
          </atman-button>
          <span class="toggle-label active">Yearly <atman-badge variant="success" size="sm">Save 20%</atman-badge></span>
        </div>
      </div>

      <div class="pricing-grid">
        <div class="pricing-card">
          <h3 class="plan-name">Starter</h3>
          <p class="plan-desc">Perfect for individuals and small projects</p>

          <div class="plan-price">
            <span class="price-currency">$</span>
            <span class="price-amount">9</span>
            <span class="price-period">/month</span>
          </div>
          <p class="plan-billing">Billed annually ($108/year)</p>

          <ul class="plan-features">
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Up to 3 projects
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              5GB storage
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Basic analytics
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Email support
            </li>
            <li class="plan-feature disabled">
              <atman-icon name="x" size="sm"></atman-icon>
              Custom domains
            </li>
            <li class="plan-feature disabled">
              <atman-icon name="x" size="sm"></atman-icon>
              Team collaboration
            </li>
          </ul>

          <div class="plan-cta">
            <atman-button variant="outline" fullWidth>Get Started</atman-button>
          </div>
        </div>

        <div class="pricing-card featured">
          <div class="plan-badge">
            <atman-badge variant="primary">Most Popular</atman-badge>
          </div>
          <h3 class="plan-name">Pro</h3>
          <p class="plan-desc">Best for growing teams and businesses</p>

          <div class="plan-price">
            <span class="price-currency">$</span>
            <span class="price-amount">29</span>
            <span class="price-period">/month</span>
          </div>
          <p class="plan-billing">Billed annually ($348/year)</p>

          <ul class="plan-features">
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Unlimited projects
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              100GB storage
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Advanced analytics
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Priority support
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Custom domains
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Up to 10 team members
            </li>
          </ul>

          <div class="plan-cta">
            <atman-button variant="primary" fullWidth>Get Started</atman-button>
          </div>
        </div>

        <div class="pricing-card">
          <h3 class="plan-name">Enterprise</h3>
          <p class="plan-desc">For large organizations with custom needs</p>

          <div class="plan-price">
            <span class="price-currency">$</span>
            <span class="price-amount">99</span>
            <span class="price-period">/month</span>
          </div>
          <p class="plan-billing">Billed annually ($1,188/year)</p>

          <ul class="plan-features">
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Everything in Pro
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Unlimited storage
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Custom integrations
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              24/7 dedicated support
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              SLA guarantee
            </li>
            <li class="plan-feature">
              <atman-icon name="check" size="sm"></atman-icon>
              Unlimited team members
            </li>
          </ul>

          <div class="plan-cta">
            <atman-button variant="outline" fullWidth>Contact Sales</atman-button>
          </div>
        </div>
      </div>
    </div>
  `,
};
