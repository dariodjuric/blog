import { ContactForm } from '@/components/ContactForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <h2>Contact me</h2>
      <ContactForm />
    </>
  );
}
