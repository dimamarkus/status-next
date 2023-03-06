'use client';

import { clientSideSupabase } from '#/lib/supabase-client';
import { RenderingInfo } from '#/ui/examples/rendering-info';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState<PostgrestSingleResponse<any>>();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await clientSideSupabase
        .from('products')
        .select()
        .match({ id: params.id })
        .single();

      setResponse(res);
      setIsLoading(false);
    };

    fetchProduct();
  }, []);

  if (isLoading) return <div />;

  if (!response || !response.data) {
    return notFound();
  } else if (response.error) {
    const { error } = response as PostgrestSingleResponse<any>;
    throw new Error(error?.message);
  }

  const product = response.data;

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-3">
      <div className="space-y-3 col-span-full lg:col-span-4">
        <h1 className="text-2xl font-medium text-gray-200 capitalize truncate">
          {product.name}
        </h1>
        <p className="font-medium text-gray-500 line-clamp-3">
          {product.description}
        </p>
      </div>
      <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
        <RenderingInfo type="spa" />
      </div>
    </div>
  );
}