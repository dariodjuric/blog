import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  contactFormSchema,
  submitContactForm,
  type ContactFormInput,
} from '@/lib/contact.api';

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs mt-1 text-destructive animate-fade-in-up">
      {children}
    </p>
  );
}

export function ContactForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });
  const [view, setView] = useState<'contact-form' | 'thank-you'>(
    'contact-form',
  );
  const [isLoading, setLoading] = useState(false);
  const onSubmit = async (data: ContactFormInput) => {
    setLoading(true);
    try {
      await submitContactForm({ data });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setView('thank-you');
    }
  };

  if (view === 'thank-you') {
    return (
      <div className="mt-12 flex flex-col items-center text-center animate-fade-in-up">
        <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-5">
          <svg
            className="w-7 h-7 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Message sent
        </h2>
        <p className="mt-2 max-w-[16rem]">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <button
          className="mt-6 text-sm text-primary hover:text-primary/80 transition-colors font-medium underline cursor-pointer"
          onClick={() => setView('contact-form')}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Contact
        </h1>
        <p className="mt-2">Don&apos;t be a stranger &mdash; say hello.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name')}
          aria-invalid={!!errors.name || undefined}
          className="h-10"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email || undefined}
          className="h-10"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          {...register('message')}
          aria-invalid={!!errors.message || undefined}
          rows={5}
          className="resize-none"
        />
        {errors.message && (
          <ErrorMessage>{errors.message.message}</ErrorMessage>
        )}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full font-display font-semibold"
        size="lg"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
