'use client';

import * as React from 'react';
import { useEffectEvent } from 'use-effect-event';

// Sanity 5.25+ expects React.useEffectEvent; Next.js may bundle an older React.
if (typeof React.useEffectEvent !== 'function') {
  Object.assign(React, { useEffectEvent });
}
