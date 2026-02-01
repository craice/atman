/**
 * Vitest Setup File
 * Configures the test environment for Web Components
 */

import { beforeAll, afterEach } from 'vitest';

// Import all components to register custom elements
import '../index.js';

beforeAll(() => {
  // Any global setup can go here
});

afterEach(() => {
  // Clean up the DOM after each test
  document.body.innerHTML = '';
});

/**
 * Helper to wait for a Lit element to complete its update cycle
 */
export async function elementUpdated(element: HTMLElement): Promise<void> {
  // @ts-ignore - updateComplete is a Lit property
  if (element.updateComplete) {
    // @ts-ignore
    await element.updateComplete;
  }
  // Additional frame for rendering
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

/**
 * Helper to create and append an element to the document
 */
export function fixture<T extends HTMLElement>(tagName: string): T {
  const element = document.createElement(tagName) as T;
  document.body.appendChild(element);
  return element;
}

/**
 * Helper to simulate click event
 */
export function click(element: HTMLElement): void {
  element.click();
}

/**
 * Helper to simulate keyboard event
 */
export function pressKey(element: HTMLElement, key: string, options: Partial<KeyboardEventInit> = {}): void {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    composed: true,
    ...options,
  });
  element.dispatchEvent(event);
}
