'use client';

import { useForm } from 'react-hook-form';
import { ReactNode, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import warningIcon from '../public/icons/warning.svg';
import { sendContactEmail, FormState } from '@/app/contact/actions'; // Import the server action

export interface FormInput {
  name: string;
  email: string;
  message:string;
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
    formState: { errors, isSubmitting }, // Use isSubmitting from react-hook-form
    handleSubmit,
    reset, // To reset the form after successful submission
  } = useForm<FormInput>();

  const initialState: FormState = { message: '', sent: false };
  // Pass sendContactEmail directly to useFormState
  // The form data will be automatically passed to the action
  const [serverState, formAction] = useFormState(sendContactEmail, initialState);

  const [view, setView] = useState<'contact-form' | 'thank-you'>(
    'contact-form',
  );

  // Effect to switch to 'thank-you' view and reset form upon successful submission
  useEffect(() => {
    if (serverState.sent) {
      setView('thank-you');
      reset(); // Reset react-hook-form fields
    }
  }, [serverState.sent, reset]);
  
  // Effect to display server messages (e.g., errors from server-side validation)
  // You might want to display these messages in your UI
  useEffect(() => {
    if (serverState.message && !serverState.sent) {
      // Example: alert(serverState.message); 
      // Or, set it to a state variable to display inline
      console.log("Server message:", serverState.message);
    }
  }, [serverState.message, serverState.sent]);


  if (view === 'thank-you') {
    return (
      <div>
        <p className="pb-2">
          Message sent! Thanks! 😊 You can now{' '}
          <a
            className="text-watusi underline cursor-pointer"
            onClick={() => {
              setView('contact-form');
              // serverState needs to be reset if the user wants to send another message.
              // However, useFormState doesn't have a built-in reset for its state.
              // A common pattern is to manage this via component key resetting or
              // by not reusing the form instance for a "new" submission immediately.
              // For now, just switching view. If issues arise, this might need refinement.
              return false;
            }}
          >
            head back
          </a>{' '}
          to the contact form if you wish.
        </p>
        {/* Optionally, display the success message from serverState if available */}
        {serverState.sent && serverState.message && <p>{serverState.message}</p>}
      </div>
    );
  }

  return (
    <div>
      <p>Don&apos;t be a stranger.</p>
      {/* Pass the formAction to the form's action attribute */}
      <form action={formAction}>
        <div className="py-2 flex flex-col">
          <label htmlFor="name" className="pb-1">
            Your name
          </label>
          <input
            id="name"
            {...register('name', { required: 'Please enter your name.' })}
            aria-invalid={!!errors.name}
            type="text"
            name="name" // Ensure name attribute is present for FormData
            className={twMerge(
              'w-full lg:w-80 h-10 lg:h-9 p-2 bg-primary-background-dark rounded-md shadow-form-inner focus:outline-none focus:ring ring-primary-border-active',
              !!errors.name ? 'ring-primary-content-error' : '', // Example error styling
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
            name="email" // Ensure name attribute is present for FormData
            className={twMerge(
              'w-full lg:w-80 h-10 lg:h-9 p-2 bg-primary-background-dark rounded-md shadow-form-inner focus:outline-none focus:ring ring-primary-border-active',
              !!errors.email ? 'ring-primary-content-error' : '', // Example error styling
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
            aria-invalid={!!errors.message} // Corrected from errors.name
            name="message" // Ensure name attribute is present for FormData
            className={twMerge(
              'lg:w-4/6 w-full h-48 lg:h-32 p-2 bg-primary-background-dark rounded-md shadow-form-inner resize-none focus:outline-none focus:ring ring-primary-border-active',
              !!errors.message ? 'ring-primary-content-error' : '', // Example error styling
            )}
          ></textarea>
          {errors.message && (
            <ErrorMessage>{errors.message.message}</ErrorMessage>
          )}
        </div>
        
        {/* Display server-side error messages (non-field specific) */}
        {serverState?.message && !serverState.sent && (
          <div className="py-2">
            <ErrorMessage>{serverState.message}</ErrorMessage>
          </div>
        )}

        <div className="pt-3 flex flex-row justify-center lg:justify-start">
          <button
            type="submit"
            disabled={isSubmitting} // Use isSubmitting from react-hook-form
            className="bg-primary-button text-brand-content-inverse min-w-fit w-28 py-1 rounded-md bg-opacity-90 hover:bg-opacity-100 shadow-form-inner disabled:bg-opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
