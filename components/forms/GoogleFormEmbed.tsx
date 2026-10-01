import { GOOGLE_FORM_HEIGHT, googleFormUrl, type GoogleFormKey } from '@/lib/googleForms';

const TITLES: Record<GoogleFormKey, string> = {
  waitlist: 'Join the MindX waitlist',
  designPartner: 'Apply to the MindX design partner programme',
  newsletter: 'Subscribe to the MindX newsletter',
};

/**
 * One of the three site forms, as a Google Form in an iframe. Answers go to
 * Google (the form's Responses tab and its linked Sheet), not to this site.
 */
export function GoogleFormEmbed({ form, className }: { form: GoogleFormKey; className?: string }) {
  const src = googleFormUrl(form);

  if (!src) {
    return (
      <p role="status" className={className}>
        This form isn&apos;t connected yet. Please check back soon.
      </p>
    );
  }

  return (
    <iframe
      src={src}
      title={TITLES[form]}
      loading="lazy"
      width="100%"
      height={GOOGLE_FORM_HEIGHT[form]}
      className={`block w-full rounded-card border-0 bg-white ${className ?? ''}`}
    >
      Loading form…
    </iframe>
  );
}
