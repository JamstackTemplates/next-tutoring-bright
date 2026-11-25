// Shared prices in whole Australian dollars, GST included. Group prices are per subject in
// content/subjects.ts. Prices are information for enquiries; the site takes no payments.

export const pricing = {
  /** One-to-one session, any subject. */
  oneToOne: { price: 95, minutes: 60 },
  /** The free learning check: a chat and informal assessment. */
  learningCheck: { price: 0, minutes: 30 },
  /** How group classes are invoiced. */
  invoiceNote: 'Group classes are invoiced per term once enrolment is confirmed by the centre.',
  currency: 'AUD',
} as const;

/** "$45" style display for whole-dollar prices; 0 shows as "Free". */
export function formatPrice(amount: number): string {
  return amount === 0 ? 'Free' : `$${amount}`;
}
