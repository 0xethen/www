import type { HGEvent } from "@/lib/meta";

export function addToCalendar(event: HGEvent, type: "apple" | "google" | "outlook") {
  const formatICSDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const buildICS = () => {
    const uid = `${event.shortName || event.name}-${event.startDate.toISOString()}`.replace(
      /\s+/g,
      "-",
    );
    return `BEGIN:VCALENDAR
      VERSION:2.0
      PRODID:-//HackGwinnett//Calendar//EN
      CALSCALE:GREGORIAN
      METHOD:PUBLISH
      BEGIN:VEVENT
      UID:${uid}
      DTSTAMP:${formatICSDate(new Date())}
      DTSTART:${formatICSDate(event.startDate)}
      DTEND:${formatICSDate(event.endDate)}
      SUMMARY:${event.name}
      DESCRIPTION:${event.description}
      LOCATION:${event.location.name}, ${event.location.address}
      END:VEVENT
      END:VCALENDAR`;
  };

  const filename = `${event.shortName || event.name}.ics`;

  if (type === "google") {
    const start = event.startDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const end = event.endDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(`${event.location.name}, ${event.location.address}`);
    const text = encodeURIComponent(event.name);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  if (type === "outlook") {
    const start = encodeURIComponent(event.startDate.toISOString());
    const end = encodeURIComponent(event.endDate.toISOString());
    const subject = encodeURIComponent(event.name);
    const body = encodeURIComponent(event.description);
    const location = encodeURIComponent(`${event.location.name}, ${event.location.address}`);

    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&body=${body}&startdt=${start}&enddt=${end}&location=${location}`;
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  const blob = new Blob([buildICS()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}
