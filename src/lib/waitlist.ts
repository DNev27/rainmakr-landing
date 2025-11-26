export async function getWaitlistCount() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/api/waitlist/count`, {
    // keep this in sync with the route's cache TTL (60s)
    next: { revalidate: 60 },
  });
  if (!res.ok) return 0;
  const data = await res.json().catch(() => ({}));
  return Number(data.count ?? 0);
}
