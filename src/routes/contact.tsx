import { createFileRoute } from '@tanstack/react-router';
import { ContactForm } from '@/components/ContactForm';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="py-16 md:py-20 max-w-md mx-auto px-5 min-h-screen">
      <div className="animate-fade-in-up">
        <ContactForm />
      </div>
    </div>
  );
}
