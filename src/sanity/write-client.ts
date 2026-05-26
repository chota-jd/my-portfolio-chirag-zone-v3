import { createClient } from '@sanity/client';

import { apiVersion, dataset, isSanityConfigured, projectId } from './env';

const writeToken = process.env.SANITY_API_WRITE_TOKEN;

export function isSanityWriteConfigured() {
  return isSanityConfigured() && Boolean(writeToken);
}

export const sanityWriteClient = isSanityWriteConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token: writeToken,
      useCdn: false,
    })
  : null;
