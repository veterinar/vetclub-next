import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  RichTextField,
  NumberField,
  Toolbar,
  SaveButton,
  DeleteWithConfirmButton,
  required,
  TopToolbar,
  CreateButton,
  useRecordContext,
} from 'react-admin';

// List view — shows all articles in a table
export const ArticleList = () => (
  <List
    sort={{ field: 'id', order: 'DESC' }}
    perPage={25}
    actions={
      <TopToolbar>
        <CreateButton label="Новая статья" />
      </TopToolbar>
    }
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" label="ID" sortable />
      <TextField source="title" label="Название" sortable />
      <TextField source="category" label="Категория" sortable />
      <TextField source="description" label="Описание" sortable />
      <TextField source="slug" label="URL" sortable />
      <EditButton label="" />
      <DeleteWithConfirmButton
        label=""
        confirmTitle="Удалить статью?"
        confirmContent="Это действие нельзя отменить."
        mutationMode="pessimistic"
      />
    </Datagrid>
  </List>
);

// Custom toolbar for edit form
const ArticleEditToolbar = () => (
  <Toolbar>
    <SaveButton label="Сохранить" />
    <DeleteWithConfirmButton
      label="Удалить"
      confirmTitle="Удалить статью?"
      confirmContent="Это действие нельзя отменить."
      mutationMode="pessimistic"
    />
  </Toolbar>
);

// Edit view — edit existing article
export const ArticleEdit = () => (
  <Edit title={<ArticleTitle />}>
    <SimpleForm toolbar={<ArticleEditToolbar />}>
      <TextInput source="id" label="ID" disabled fullWidth />
      <TextInput source="title" label="Название" validate={[required()]} fullWidth />
      <TextInput source="metaTitle" label="Meta Title" fullWidth />
      <TextInput source="description" label="Описание" fullWidth multiline rows={2} />
      <TextInput source="keywords" label="Ключевые слова" fullWidth />
      <TextInput source="category" label="Категория" fullWidth />
      <TextInput source="slug" label="URL (slug)" fullWidth />
      <TextInput
        source="content"
        label="Контент (HTML)"
        fullWidth
        multiline
        rows={20}
      />
    </SimpleForm>
  </Edit>
);

// Create view — new article
export const ArticleCreate = () => (
  <Create title="Новая статья">
    <SimpleForm>
      <TextInput source="id" label="ID" validate={[required()]} fullWidth helperText="Уникальный идентификатор статьи" />
      <TextInput source="title" label="Название" validate={[required()]} fullWidth />
      <TextInput source="metaTitle" label="Meta Title" fullWidth />
      <TextInput source="description" label="Описание" fullWidth multiline rows={2} />
      <TextInput source="keywords" label="Ключевые слова" fullWidth />
      <TextInput source="category" label="Категория" fullWidth />
      <TextInput source="slug" label="URL (slug)" fullWidth />
      <TextInput
        source="content"
        label="Контент (HTML)"
        fullWidth
        multiline
        rows={20}
      />
    </SimpleForm>
  </Create>
);

// Dynamic title showing article name
const ArticleTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <span>Редактирование: {record.title}</span>;
};
