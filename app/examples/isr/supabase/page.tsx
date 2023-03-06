import { ExternalLink } from '#/ui/examples/external-link';

// cache this page for 1 minute
export const revalidate = 60;

export default function Page() {
  return (
    <div className="prose-sm prose prose-invert max-w-none">
      <h1 className="text-xl font-bold">Incremental Static Regeneration</h1>

      <ul>
        <li>
          In this example, our products on our Supabase database were statically
          pre-rendered at build time and are periodically revalidated every 10
          seconds.
        </li>
        <li>
          Try navigating to each product and noting the timestamp of when the
          page was rendered. Refresh the page after 10 seconds to trigger a
          revalidation for the next request. Refresh again to see the
          revalidated page.
        </li>
      </ul>

      <div className="flex gap-2">
        <ExternalLink href="https://beta.nextjs.org/docs/data-fetching/fetching#revalidating-data">
          Docs
        </ExternalLink>
        <ExternalLink href="https://github.com/vercel/app-playground/tree/main/app/isr">
          Code
        </ExternalLink>
      </div>
    </div>
  );
}