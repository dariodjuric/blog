import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactNode, useState } from 'react';

export interface FormInput {
  name: string;
  email: string;
  message: string;
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs mt-1 text-destructive animate-fade-in-up">
      {children}
    </p>
  );
}

const inputBase =
  'w-full px-3 rounded-lg bg-card border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors';
const inputOk = `${inputBase} border-border`;
const inputErr = `${inputBase} border-destructive/60`;

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
          className={`h-10 ${errors.name ? inputErr : inputOk}`}
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
          className={`h-10 ${errors.email ? inputErr : inputOk}`}
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
          className={`py-2 resize-none ${errors.message ? inputErr : inputOk}`}
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
