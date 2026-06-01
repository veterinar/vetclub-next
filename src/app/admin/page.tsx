'use client';

import { Admin, Resource } from 'react-admin';
import { authProvider } from './authProvider';
import { dataProvider } from './dataProvider';
import { ArticleList, ArticleEdit, ArticleCreate } from './resources/articles';

export default function AdminPage() {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      basename="/admin"
      requireAuth
      title="VetClub Admin"
      theme={{
        palette: {
          mode: 'light',
          primary: { main: '#2e7d32' },
          secondary: { main: '#4caf50' },
        },
      }}
    >
      <Resource
        name="articles"
        list={ArticleList}
        edit={ArticleEdit}
        create={ArticleCreate}
        options={{ label: 'Статьи' }}
        recordRepresentation="title"
      />
    </Admin>
  );
}
