import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@/components/ui/ethendotapp/link";
import { eventInfo } from "@/lib/meta";
import { cn } from "@/lib/utils";

export const faq: { value: string; trigger: string; content: string | React.ReactNode }[] = [
  {
    value: "cta",
    trigger: "How can I participate?",
    content: (
      <>
        To attend {eventInfo.hackathon.name}, simply{" "}
        <Link to="/go/$slug" params={{ slug: "register" }} search={{ ref: "faq-cta" }}>
          register for the event
        </Link>{" "}
        and show up on the day of! If you're interested in volunteering or sponsoring, please{" "}
        <Link to="/about" hash="contact">
          contact us
        </Link>{" "}
        for more information.
      </>
    ),
  },
  {
    value: "what",
    trigger: "What is a hackathon?",
    content: `A hackathon is a competition where participants come together during a short period of time (in our case, ${Math.floor((eventInfo.hackathon.endDate.getTime() - eventInfo.hackathon.startDate.getTime()) / (1000 * 60 * 60))} hours) to develop a project related to the theme of the event. It's a fun and competitive way to practice computer science, software development, and problem-solving!`,
  },
  {
    value: "who",
    trigger: "Who can attend?",
    content:
      "All middle and high school students in Georgia are welcome to attend! No prior experience is required.",
  },
  {
    value: "cost",
    trigger: "How much does it cost to attend?",
    content: (
      <>
        Admission is completely free! To secure your spot before the event (and decide which
        workshops interest you),{" "}
        <Link to="/go/$slug" params={{ slug: "register" }} search={{ ref: "faq-cost" }}>
          sign up for the event
        </Link>{" "}
        now!
      </>
    ),
  },
  {
    value: "experience",
    trigger: "What if I don't know how to code?",
    content: `That's perfectly fine! Hackathons are a great way to learn, meet new people, and gain experience. We offer beginner-friendly workshops and also cover more advanced concepts at ${eventInfo.hackathon.name} for those who want a challenge.`,
  },
  {
    value: "prizes",
    trigger: "Will there be prizes?",
    content: (
      <>
        Yes! Prizes are up for grabs for participants who place on the podium (first, second, and
        third). Plus, special prizes are awarded to participants that stand out in their submission
        (e.g., most creative, best solo project, etc.). Prizes are sponsored by State Farm and our{" "}
        <Link to="/" hash="sponsors">
          other amazing sponsors
        </Link>
        .
      </>
    ),
  },
  {
    value: "teams",
    trigger: "How do teams work?",
    content:
      "You can work solo or in a team of up to three people—it's completely up to you! Teams can be formed before or during the event.",
  },
  {
    value: "schedule",
    trigger: "What's the schedule?",
    content: `${eventInfo.hackathon.name} is on ${eventInfo.hackathon.startDate.toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" })} from ${eventInfo.hackathon.startDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} to ${eventInfo.hackathon.endDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}, including opening ceremony, workshops, work time, project submissions, and an awards ceremony. You'll recieve a schedule at the event with details on each segment of the day!`,
  },
  {
    value: "food",
    trigger: "Will food be provided?",
    content:
      "Lunch and other refreshments (snacks and drinks) will be available for purchase throughout the day. You can pre-order lunch when you register (or bring your own food if you'd like!).",
  },
  {
    value: "items",
    trigger: "What should I bring?",
    content:
      "Bring your laptop, charger, student ID, and a positive attitude! It's OK to bring headphones or any other peripherals that help you code. You must use the internet access provided on campus. You may also bring a lunch for the mid-day break in the cafeteria.",
  },
];

export function HackathonFAQ({
  className,
  responsiveText = true,
}: {
  className?: string;
  responsiveText?: boolean;
}) {
  return (
    <Accordion
      className={cn("w-full lg:max-w-lg xl:max-w-xl border", className)}
      defaultValue={["cta"]}
    >
      {faq.map((item) => (
        <AccordionItem key={item.value} value={item.value} className="border-b last:border-b-0">
          <AccordionTrigger
            className={cn("px-4", responsiveText && "text-base lg:text-sm xl:text-base")}
          >
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent
            className={cn("px-4", responsiveText && "text-base lg:text-sm xl:text-base")}
          >
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
