import { TabGroup } from '#/ui/examples/tab-group';
import React from 'react';

export const metadata = {
  title: 'Server Side Rendering (SSR)',
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-9">
      <TabGroup
        path="/examples/ssr"
        items={[
          {
            text: 'Home',
          },
          {
            text: 'Default',
            slug: 'default',
          },
          {
            text: 'Supabase',
            slug: 'supabase',
          },
        ]}
      />
      <div>{children}</div>
    </div>
  );
}
