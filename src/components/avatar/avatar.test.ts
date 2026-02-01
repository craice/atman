import { describe, it, expect } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanAvatar } from './avatar.js';
import './avatar.js';

describe('atman-avatar', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanAvatar>('atman-avatar');
    await elementUpdated(el);

    expect(el.size).toBe('md');
  });

  it('should apply size classes correctly', async () => {
    const el = fixture<AtmanAvatar>('atman-avatar');

    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      el.size = size;
      await elementUpdated(el);

      const avatar = el.shadowRoot?.querySelector('.avatar');
      expect(avatar?.classList.contains(`avatar--${size}`)).toBe(true);
    }
  });

  it('should render image when src is provided', async () => {
    const el = fixture<AtmanAvatar>('atman-avatar');
    el.src = 'https://example.com/avatar.jpg';
    el.alt = 'User avatar';
    await elementUpdated(el);

    const img = el.shadowRoot?.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('https://example.com/avatar.jpg');
    expect(img?.getAttribute('alt')).toBe('User avatar');
  });

  it('should render initials when provided', async () => {
    const el = fixture<AtmanAvatar>('atman-avatar');
    el.initials = 'JD';
    await elementUpdated(el);

    const initialsEl = el.shadowRoot?.querySelector('.avatar__initials');
    expect(initialsEl?.textContent?.trim()).toBe('JD');
  });

  it('should show fallback icon when no src or initials', async () => {
    const el = fixture<AtmanAvatar>('atman-avatar');
    await elementUpdated(el);

    const fallback = el.shadowRoot?.querySelector('.avatar__fallback');
    expect(fallback).toBeTruthy();
  });

  it('should prefer src over initials', async () => {
    const el = fixture<AtmanAvatar>('atman-avatar');
    el.src = 'https://example.com/avatar.jpg';
    el.initials = 'JD';
    await elementUpdated(el);

    const img = el.shadowRoot?.querySelector('img');
    const initials = el.shadowRoot?.querySelector('.avatar__initials');

    expect(img).toBeTruthy();
    expect(initials).toBeNull();
  });

  it('should show initials when image fails to load', async () => {
    const el = fixture<AtmanAvatar>('atman-avatar');
    el.src = 'https://example.com/invalid.jpg';
    el.initials = 'JD';
    await elementUpdated(el);

    // Simulate image error
    const img = el.shadowRoot?.querySelector('img');
    img?.dispatchEvent(new Event('error'));
    await elementUpdated(el);

    const initials = el.shadowRoot?.querySelector('.avatar__initials');
    expect(initials?.textContent?.trim()).toBe('JD');
  });

  it('should have role="img"', async () => {
    const el = fixture<AtmanAvatar>('atman-avatar');
    await elementUpdated(el);

    const avatar = el.shadowRoot?.querySelector('.avatar');
    expect(avatar?.getAttribute('role')).toBe('img');
  });

  it('should set aria-label when alt is provided', async () => {
    const el = fixture<AtmanAvatar>('atman-avatar');
    el.alt = 'John Doe';
    await elementUpdated(el);

    const avatar = el.shadowRoot?.querySelector('.avatar');
    expect(avatar?.getAttribute('aria-label')).toBe('John Doe');
  });
});
