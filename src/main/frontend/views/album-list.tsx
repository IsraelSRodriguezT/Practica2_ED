import { useEffect } from 'react';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, ComboBox, Dialog, Grid, GridColumn, GridItemModel, DatePicker, TextField, VerticalLayout } from '@vaadin/react-components';
import { Notification } from '@vaadin/react-components/Notification';
import { AlbumService } from 'Frontend/generated/endpoints';
import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';
import { useDataProvider } from '@vaadin/hilla-react-crud';

export const config: ViewConfig = {
  title: 'Album',
  menu: {
    icon: 'vaadin:disc',
    order: 1,
    title: 'Album',
  },
};

type AlbumEntryFormProps = {
  onAlbumCreated?: () => void;
};

function AlbumEntryForm(props: AlbumEntryFormProps) {
  const nombre = useSignal('');
  const fecha = useSignal('');
  const banda = useSignal('');
  const dialogOpened = useSignal(false);

  const bandas = useSignal<{ value: string, label: string }[]>([]);

  useEffect(() => {
    AlbumService.listaBanda().then(data => {
      bandas.value = (data ?? []).map((a: any) => ({
        value: a.value,
        label: a.label
      }));
    });
  }, []);

  const createAlbum = async () => {
    try {
      if (nombre.value && fecha.value && banda.value) {
        const idBanda = parseInt(banda.value) + 1;;
        await AlbumService.create(
          nombre.value,
          fecha.value,
          idBanda
        );
        if (props.onAlbumCreated) props.onAlbumCreated();
        nombre.value = '';
        fecha.value = '';
        banda.value = '';
        dialogOpened.value = false;
        Notification.show('Album creada', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo crear, faltan o hay datos inválidos', { duration: 5000, position: 'top-center', theme: 'error' });
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Dialog
        modeless
        headerTitle="Nuevo Album"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }: { detail: { value: boolean } }) => {
          dialogOpened.value = detail.value;
        }}
        footer={
          <>
            <Button onClick={() => (dialogOpened.value = false)}>Cancelar</Button>
            <Button onClick={createAlbum} theme="primary">Registrar</Button>
          </>
        }
      >
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField
            label="Nombre"
            value={nombre.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (nombre.value = evt.detail.value)}
          />
          <DatePicker
            label="Fecha"
            value={fecha.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (fecha.value = evt.detail.value)}
          />
          <ComboBox
            label="Banda"
            items={bandas.value}
            itemLabelPath="label"
            itemValuePath="value"
            value={banda.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (banda.value = evt.detail.value)}
          />
        </VerticalLayout>
      </Dialog>
      <Button onClick={() => (dialogOpened.value = true)}>Agregar</Button>
    </>
  );
}

export default function AlbumView() {
  const dataProvider = useDataProvider<any>({
    list: async () => {
      const result = await AlbumService.listAlbum();
      return (result ?? []).filter((item): item is Record<string, unknown> => item !== undefined);
    },
  });

  function indexIndex({ model }: { model: GridItemModel<any> }) {
    return <span>{model.index + 1}</span>;
  }

  return (
    <main className="w-full h-full flex flex-col box-border gap-s p-m">
      <ViewToolbar title="Lista de Albumes">
        <Group>
          <AlbumEntryForm onAlbumCreated={dataProvider.refresh} />
        </Group>
      </ViewToolbar>
      <Grid dataProvider={dataProvider.dataProvider}>
        <GridColumn renderer={indexIndex} header="Numero" />
        <GridColumn path="nombre" header="Nombre" />
        <GridColumn path="fecha" header="Fecha" />
        <GridColumn path="idBanda" header="Banda" />
      </Grid>
    </main>
  );
}