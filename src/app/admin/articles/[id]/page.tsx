export const dynamic = 'force-dynamic';

import EditClient from './EditClient';

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  return <EditClient params={params} />;
}
