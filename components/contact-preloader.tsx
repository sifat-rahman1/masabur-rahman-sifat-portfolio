'use client'

import { PagePreloader } from '@/components/page-preloader'

/**
 * ContactPreloader. Thin wrapper preserving the /contact intro (1000ms
 * hold, "Contact" label) on top of the shared PagePreloader.
 */
export function ContactPreloader() {
  return <PagePreloader label="Contact" duration={1000} />
}

export default ContactPreloader
