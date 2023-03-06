import { ExternalLink } from '#/ui/examples/external-link';

export default function Page() {
  return (
    <div className="prose-sm prose prose-invert max-w-none">
      <h1 className="text-xl font-bold">Single Page Application (SPA)</h1>

      <ul>
        <li>
          In this example, static rendering is used to pre-render three posts.
          The result of the rendering is stored on a CDN and re-used for each
          request.
        </li>
        <li>Post 1 and 2 are statically pre-rendered at build time.</li>
        <li>
          A random third post is statically rendered on-demand the first time it
          is requested
        </li>
        <li>
          Try navigating to each post and noting the timestamp of when the page
          was rendered.
        </li>
        <li>
          Examples are provided for the default <strong>Fetch API</strong> or
          for connecting to a <strong> Supabase</strong> database API
        </li>
      </ul>

      <div className="flex gap-2">
        <ExternalLink href="https://beta.nextjs.org/docs/data-fetching/fetching#static-data">
          Docs
        </ExternalLink>
        <ExternalLink href="https://github.com/vercel/app-playground/tree/main/app/ssg">
          Code
        </ExternalLink>
      </div>
    </div>
  );
}