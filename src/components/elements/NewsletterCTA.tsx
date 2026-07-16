import { useForm } from "@tanstack/react-form-start";
import { z } from "zod";
import { toast } from "sonner";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMobile } from "@/lib/browser";

const formSchema = z.object({
  email: z.email("Enter a valid email address"),
});

export function NewsletterCTA({ className }: { className?: string }) {
  const { breakpoint } = useMobile();
  const isMobile = breakpoint === "sm";

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      toast.info("Thank you for subscribing to our newsletter!");
    },
  });

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        {/* className="prose prose-headings:mt-0 prose-headings:mb-2" */}
        <h2 className="text-2xl font-bold mt-0 mb-2">Join our newsletter</h2>
        <p className="text-gray-600 text-sm md:text-base">
          Stay in the know about upcoming events, volunteer/learning opportunities, and the latest
          news from the HackGwinnett team by subscribing to our newsletter.
        </p>
      </div>

      <form
        id="newsletter-cta-form"
        className="flex flex-col md:flex-row gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          await form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Email address"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                <FieldDescription className="text-xs md:text-sm">
                  By signing up for the HackGwinnett newsletter, you agree to receive our updates
                  and communications. Don't worry: we won't pester you with constant emails (we hate
                  spam too!)
                  {/*  We promise to only send you the good stuff, and you can unsubscribe at any time! */}
                </FieldDescription>
              </Field>
            );
          }}
        />
        <Button type="submit" size={isMobile ? "sm" : "default"}>
          Sign me up, chief!
        </Button>
      </form>
    </div>
  );
}
