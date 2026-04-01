import { AUTHOR_NAME, SITE_URL } from '@/lib/constants';
import { createFileRoute } from '@tanstack/react-router';
import { ContactForm } from '@/components/ContactForm';

const contactTitle = `Contact — ${AUTHOR_NAME}`;

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: contactTitle },
      {
        name: 'description',
        content: `Get in touch with ${AUTHOR_NAME}.`,
      },
      { property: 'og:title', content: contactTitle },
      { property: 'og:url', content: `${SITE_URL}/contact` },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="py-16 md:py-20 max-w-md mx-auto px-5">
      <div className="animate-fade-in-up">
        <ContactForm />
      </div>
    </div>
  );
}
