import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function ContactPage() {
  const [showPopup, setShowPopup] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setShowPopup(true);
    reset();
    setTimeout(() => setShowPopup(false), 1000);
  };

  return (
    <main className="mx-auto max-w-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>

      {showPopup ? (
        <div className="flex items-center gap-2 rounded border border-green-300 bg-green-50 px-2 py-1">
          <span className="icon-[line-md--check-all] inline-block w-6 h-6 text-green-700" />
          <p className="text-green-700 font-medium">
            Thanks! Your message has been sent. We will be in contact soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("fullName")}
              placeholder="Full name"
              className="w-full rounded border p-2"
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600 rounded border border-red-300 bg-amber-50 px-2 py-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("subject")}
              placeholder="Subject"
              className="w-full rounded border p-2"
              aria-invalid={!!errors.subject}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600 rounded border border-amber-300 bg-amber-50 px-2 py-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email address"
              className="w-full rounded border p-2"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 rounded border border-amber-300 bg-amber-50 px-2 py-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              {...register("message")}
              placeholder="Your message"
              rows={5}
              className="w-full rounded border p-2"
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 rounded border border-amber-300 bg-amber-50 px-2 py-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </main>
  );
}

export default ContactPage;
