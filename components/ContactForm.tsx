'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import warningIcon from '../public/icons/warning.svg';

export interface FormInput {
  name: string;
  email: string;
  message: string;
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs m-0 pt-1 text-primary-content-error flex flex-row gap-1">
      <Image src={warningIcon} alt="Warning sign" className="size-4" />{' '}
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
      <p className="pb-2">
        Message sent! Thanks! 😊 You can now{' '}
        <a
          className="text-watusi underline cursor-pointer"
          onClick={() => {
            setView('contact-form');
            return false;
          }}
        >
          head back
        </a>{' '}
        to the contact form if you wish.
      </p>
    );
  }

  return (
    <div>
      <p>Don&apos;t be a stranger.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-2 flex flex-col">
          <label htmlFor="name" className="pb-1">
            Your name
          </label>
          <input
            id="name"
            {...register('name', { required: 'Please enter your name.' })}
            aria-invalid={!!errors.name}
            type="text"
            className={twMerge(
              'w-full lg:w-80 h-10 lg:h-9 p-2 bg-primary-background-dark rounded-md shadow-form-inner focus:outline-none focus:ring ring-primary-border-active',
              !!errors.name ? '' : '',
            )}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="py-2 flex flex-col">
          <label htmlFor="email" className="pb-1">
            Your email
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
            className={twMerge(
              'w-full lg:w-80 h-10 lg:h-9 p-2 bg-primary-background-dark rounded-md shadow-form-inner focus:outline-none focus:ring ring-primary-border-active',
              !!errors.email ? '' : '',
            )}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="py-2 flex flex-col">
          <label htmlFor="message" className="pb-1">
            Message
          </label>
          <textarea
            id="message"
            {...register('message', { required: 'Please enter your message.' })}
            aria-invalid={!!errors.name}
            className={twMerge(
              'lg:w-4/6 w-full h-48 lg:h-32 p-2 bg-primary-background-dark rounded-md shadow-form-inner resize-none focus:outline-none focus:ring ring-primary-border-active',
              !!errors.name ? '' : '',
            )}
          ></textarea>
          {errors.message && (
            <ErrorMessage>{errors.message.message}</ErrorMessage>
          )}
        </div>
        <div className="pt-3 flex flex-row justify-center lg:justify-start">
          <button
            type="submit"
            disabled={isLoading}
            formNoValidate
            className="bg-primary-button text-brand-content-inverse min-w-fit w-28 py-1 rounded-md bg-opacity-90 hover:bg-opacity-100 shadow-form-inner disabled:bg-opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
