import { File, FormData } from 'formdata-node';
import uploadImage from '../uploadImage';
import { test, describe, expect } from 'vitest';

describe('uploadImage()', () => {
  test('uploads image and returns a public URL', async () => {
    const mockFile = new File(['hello'], 'avatar.png', { type: 'image/png' });

    // Cast to browser-compatible File for your uploadImage function
    const result = await uploadImage(mockFile as unknown as globalThis.File);
    
 if (result instanceof Error) throw result;

    expect(result).toHaveProperty('url');
    if ('url' in result) {
      expect(result.url).toBe('https://mocked.storage/mockfile.png');
    }
  }, 10000);
});
