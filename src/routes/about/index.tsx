import { createFileRoute } from "@tanstack/react-router";
import showdown from "showdown";
// @ts-ignore
import targetblank from "showdown-target-blank";
import { revalidateLogic, useForm } from "@tanstack/react-form-start"; // replace with react-form-start once #1882 is resolved
import { z } from "zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RiFileCopyLine } from "@remixicon/react";
import { copy, getGWEmailUrl, popup } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useMobile } from "@/lib/browser";
import { allPosts } from "cms/posts";
// TODO: Switch to Zod Mini

export const Route = createFileRoute("/about/")({
  loader: async () => {
    const content = allPosts.find((p) => "about" === p._meta.path.slugify());
    return { content };
  },
  component: RouteComponent,
});

const CONTACT_EMAIL = "hackgwinnett@gmail.com"; // @hackgwinnett.org soon??? 👀

const emailProviders: { id: string; label: string; description?: React.ReactNode }[] = [
  { id: "default", label: "My email app", description: "your device's default mail client" },
  { id: "gmail", label: "Gmail", description: "the Gmail web client" },
  { id: "yahoo", label: "Yahoo!", description: "the Yahoo! Mail web client" },
  { id: "outlook", label: "Microsoft Outlook", description: "the Outlook.com web client" },
  { id: "protonmail", label: "ProtonMail", description: "the ProtonMail web client" },
  { id: "gcps", label: "GCPS Mail", description: "your Google Workspace email" },
];

const formSchema = z.object({
  subject: z.string().min(2, "Subject line is required"),
  message: z.string().min(1, "Body is required").max(500, "Body must be less than 500 characters"),
  provider: z.enum(emailProviders.map((option) => option.id)),
});

function RouteComponent() {
  const { content } = Route.useLoaderData();
  const md = new showdown.Converter({
    tables: true,
    strikethrough: true,
    tasklists: true,
    parseImgDimensions: true,
    extensions: [targetblank],
  });

  return (
    <div className="min-h-safe-dvh">
      {/* TODO: replace with header from social media posts with the hexagonic thingy? */}
      <div className="relative bg-black flex items-center justify-center h-24 overflow-hidden sm:h-36 lg:h-48">
        <div className="absolute inset-0 bg-hg-green striped-hg-green-alt/20 opacity-50" />
        <h1 className="relative font-light font-brand text-5xl uppercase text-white sm:text-6xl lg:text-8xl">
          About Us
        </h1>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="my-8" />
        <main className="p-4 flex flex-col lg:flex-row justify-between gap-8">
          {content ? (
            <div
              className="typeset max-w-none space-y-2"
              dangerouslySetInnerHTML={{ __html: md.makeHtml(content.content) }}
            />
          ) : (
            "not found"
          )}

          <div className="lg:min-w-md">
            <ContactForm />
          </div>
        </main>
      </div>
    </div>
  );
}

function ContactForm() {
  const form = useForm({
    defaultValues: {
      subject: "",
      message: "",
      provider: "default",
    },
    validators: {
      onDynamic: formSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    onSubmit({ value }) {
      let url: string = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(value.subject)}&body=${encodeURIComponent(value.message)}`;
      if (import.meta.env.DEV) alert(JSON.stringify(value));
      if (typeof window === "undefined") return;

      const subject = encodeURIComponent(value.subject || "");
      const body = encodeURIComponent(value.message || "");
      const to = encodeURIComponent(CONTACT_EMAIL);

      switch (value.provider) {
        case "gmail":
          url = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
          break;
        case "yahoo":
          url = `https://compose.mail.yahoo.com/?to=${to}&subject=${subject}&body=${body}`;
          break;
        case "outlook":
          url = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${to}&subject=${subject}&body=${body}`;
          break;
        case "protonmail":
          url = `https://mail.proton.me/compose?to=${to}&subject=${subject}&body=${body}`;
          break;
        case "gcps":
          url = getGWEmailUrl({
            to: CONTACT_EMAIL,
            subject: value.subject,
            body: value.message,
          });
          break;
      }

      switch (value.provider) {
        case "gmail":
          break;
        case "yahoo":
          break;
        case "outlook":
          break;
        case "protonmail":
          break;
        case "gcps":
          url = getGWEmailUrl({
            to: CONTACT_EMAIL,
            subject: value.subject,
            body: value.message,
          });
          break;
      }

      popup(
        url,
        "_blank",
        600,
        700,
        value.provider !== "default" ? "location=yes, scrollbars=yes" : "noopener,noreferrer",
      );
    },
  });

  const { breakpoint, isMobileDevice } = useMobile();
  const isMobile = breakpoint === "sm";

  const copyEmail = () => {
    if (isMobileDevice && !confirm("Copy email address to clipboard?")) return;
    copy(CONTACT_EMAIL);
  };

  const getMailProvider = (providerId: string) => {
    return emailProviders.find((p) => p.id === providerId);
  };

  return (
    <form
      id="contact"
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <Card size={isMobile ? "sm" : "default"} className="max-w-full lg:max-w-md">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Get in touch with the HackGwinnett team via email.</CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup className="gap-4">
            <form.Field
              name="subject"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      placeholder="HackGwinnett inquiry"
                      aria-invalid={isInvalid}
                      minLength={2}
                      required
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="message"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Body</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Message"
                      className="min-h-30"
                      aria-invalid={isInvalid}
                      minLength={1}
                      maxLength={500}
                      required
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="provider"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Send with</FieldLabel>
                    <Select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value || "default")}
                      aria-invalid={isInvalid}
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {emailProviders.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {getMailProvider(field.state.value)?.description && (
                      <FieldDescription>
                        This email will be sent via{" "}
                        {getMailProvider(field.state.value)?.description}
                      </FieldDescription>
                    )}
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="submit">Send...</Button>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button type="button" variant="outline" size="icon" onClick={copyEmail}>
                  <RiFileCopyLine />
                </Button>
              }
            />
            <TooltipContent>Copy email address to clipboard</TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
    </form>
  );
}
