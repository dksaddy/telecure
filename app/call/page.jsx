// app/call/page.js
import { Suspense } from 'react';
import CallPageClient from './components/CallPageClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading Call...</div>}>
      <CallPageClient />
    </Suspense>
  );
}
