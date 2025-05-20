import { useEffect } from 'react';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, Grid, GridColumn, TextField, VerticalLayout, Dialog, DatePicker, ComboBox } from '@vaadin/react-components'; 
import { Notification } from '@vaadin/react-components/Notification';
import { CancionService } from 'Frontend/generated/endpoints';
import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';
import { useDataProvider } from '@vaadin/hilla-react-crud';
import type { GridItemModel } from '@vaadin/react-components';

export const config: ViewConfig = {
  title: 'Cancion',
  menu: {
    icon: 'vaadin:music',
    order: 1,
    title: 'Cancion',
  },
};

type CancionEntryFormProps = {
  onCancionCreated?: () => void;
};
function CancionEntryForm(props: CancionEntryFormProps) {
  const nombre = useSignal('');
  const genero = useSignal('');
  const duracion = useSignal('');
  const url = useSignal('');
  const tipo = useSignal('');
  const album = useSignal('');
  const dialogOpened = useSignal(false);

  const generos = useSignal<{ value: string, label: string }[]>([]);
  const albumes = useSignal<{ value: string, label: string }[]>([]);
  const tipos = useSignal<string[]>([]);

  useEffect(() => {
    CancionService.listaGenero().then(data => {
      generos.value = (data ?? []).map((a: any) => ({
        value: a.value,
        label: a.label
      }));
    });
    CancionService.listaAlbum().then(data => {
      albumes.value = (data ?? []).map((v: any) => ({
        value: v.value,
        label: v.label
      }));
    });
    CancionService.listTipo().then(data => {
      tipos.value = (data ?? []).filter((e): e is string => typeof e === 'string');
    });
  }, []);

  const createCancion = async () => {
    try {
      if (nombre.value.trim() && genero.value.trim() && duracion.value.trim() && url.value.trim() && tipo.value.trim() && album.value.trim()) {
        const idGenero = parseInt(genero.value)+1;
        const idAlbum = parseInt(album.value)+1;
        await CancionService.create(nombre.value, idGenero, parseInt(duracion.value), url.value, tipo.value, idAlbum);
        if (props.onCancionCreated) props.onCancionCreated();
        nombre.value = '';
        genero.value = '';
        duracion.value = '';
        url.value = '';
        tipo.value = '';
        album.value = '';
        dialogOpened.value = false;
        Notification.show('Cancion creado', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo crear, faltan o hay datos inválidos', {
          duration: 5000,
          position: 'top-center',
          theme: 'error',
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Dialog
        modeless
        headerTitle="Nueva Cancion"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }: { detail: { value: boolean } }) => {
          dialogOpened.value = detail.value;
        }}
        footer={
          <>
            <Button onClick={() => (dialogOpened.value = false)}>Cancelar</Button>
            <Button onClick={createCancion} theme="primary">
              Registrar
            </Button>
          </>
        }>
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField
            label="Nombre"
            value={nombre.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (nombre.value = evt.detail.value)}
          />
          <ComboBox
            label="Genero"
            items={generos.value}
            itemLabelPath="label"
            itemValuePath="value"
            value={genero.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (genero.value = evt.detail.value)}
          />
          <TextField
            label="duracion"
            value={duracion.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (duracion.value = evt.detail.value)}
          />
          <TextField
            label="url"
            value={url.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (url.value = evt.detail.value)}
          />
          <ComboBox
            label="Tipo"
            items={tipos.value}
            value={tipo.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (tipo.value = evt.detail.value)}
          />
          <ComboBox
            label="Album"
            items={albumes.value}
            itemLabelPath="label"
            itemValuePath="value"
            value={album.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (album.value = evt.detail.value)}
          />
        </VerticalLayout>
      </Dialog>
      <Button onClick={() => (dialogOpened.value = true)}>Agregar</Button>
    </>
  );
}

export default function CancionView() {
  const dataProvider = useDataProvider<any>({
    list: async () => {
      const result = await CancionService.listCancion();
      return (result ?? []).filter((item): item is Record<string, unknown> => item !== undefined);
    },
  });

  function indexIndex({ model }: { model: GridItemModel<any> }) {
    return <span>{model.index + 1}</span>;
  }

  return (
    <main className="w-full h-full flex flex-col box-border gap-s p-m">
      <ViewToolbar title="Lista de Canciones">
        <Group>
          <CancionEntryForm onCancionCreated={dataProvider.refresh} />
        </Group>
      </ViewToolbar>
      <Grid dataProvider={dataProvider.dataProvider}>
        <GridColumn renderer={indexIndex} header="Numero" />
        <GridColumn path="nombre" header="Nombre" />
        <GridColumn path="idGenero" header="Genero" />
        <GridColumn path="duracion" header="Duracion" />
        <GridColumn path="url" header="Url" />
        <GridColumn path="tipo" header="Tipo" />
        <GridColumn path="idAlbum" header="Album" />
      </Grid>
    </main>
  );
}