import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactNode, useState } from 'react';

export interface FormInput {
  name: string;
  email: string;
  message: string;
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs m-0 pt-1 text-destructive flex flex-row gap-1 items-center">
      {children}
    </p>
  );
}

export function ContactForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>();
  const [view, setView] = useState<'contact-form' | 'thank-you'>(
    'contact-form',
  );
  const [isLoading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<FormInput> = async (data, e) => {
    e?.preventDefault();

    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setView('thank-you');
    }
  };

  if (view === 'thank-you') {
    return (
      <div className="mt-8">
        <p className="text-sm text-muted-foreground">
          Message sent! Thanks for reaching out.{' '}
          <button
            className="text-primary hover:underline"
            onClick={() => setView('contact-form')}
          >
            Send another message
          </button>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="text-sm font-medium text-foreground block"
        >
          Name
        </label>
        <input
          id="name"
          {...register('name', { required: 'Please enter your name.' })}
          aria-invalid={!!errors.name}
          type="text"
          className="w-full h-10 px-3 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium text-foreground block"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          aria-invalid={!!errors.email}
          {...register('email', {
            required: 'Please enter your email.',
            pattern: {
              value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'This email appears invalid.',
            },
          })}
          className="w-full h-10 px-3 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="text-sm font-medium text-foreground block"
        >
          Message
        </label>
        <textarea
          id="message"
          {...register('message', { required: 'Please enter your message.' })}
          aria-invalid={!!errors.message}
          rows={5}
          className="w-full px-3 py-2 rounded-lg bg-card border border-border text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {errors.message && (
          <ErrorMessage>{errors.message.message}</ErrorMessage>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        formNoValidate
        className="w-full rounded-full font-display text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 py-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
