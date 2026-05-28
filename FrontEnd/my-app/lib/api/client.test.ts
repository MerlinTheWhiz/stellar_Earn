import { describe, it, expect, beforeEach, vi } from 'vitest';
import { tokenManager } from './client';

describe('tokenManager', () => {
  const ACCESS_TOKEN_KEY = 'stellar_earn_access_token';

  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('returns null when no token exists', () => {
    expect(tokenManager.getAccessToken()).toBeNull();
  });

  it('returns valid JWT token when present', () => {
    const validToken = 'header.payload.signature';
    window.localStorage.setItem(ACCESS_TOKEN_KEY, validToken);
    expect(tokenManager.getAccessToken()).toBe(validToken);
  });

  it('removes invalid JWT token and returns null', () => {
    const invalidToken = 'invalid';
    window.localStorage.setItem(ACCESS_TOKEN_KEY, invalidToken);
    expect(tokenManager.getAccessToken()).toBeNull();
    expect(window.localStorage.getItem(ACCESS_TOKEN_KEY)).toBeNull();
  });

  it('handles localStorage error gracefully', () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('error');
    });
    const result = tokenManager.getAccessToken();
    expect(result).toBeNull();
  });
});