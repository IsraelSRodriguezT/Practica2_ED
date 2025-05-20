import { useEffect } from 'react';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, Grid, GridColumn, TextField, VerticalLayout, Dialog, DatePicker, ComboBox } from '@vaadin/react-components';
import { Notification } from '@vaadin/react-components/Notification';
import { ArtistaService } from 'Frontend/generated/endpoints';
import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';
import { useDataProvider } from '@vaadin/hilla-react-crud';
import type { GridItemModel } from '@vaadin/react-components';

export const config: ViewConfig = {
  title: 'Artista',
  menu: {
    icon: 'vaadin:user',
    order: 1,
    title: 'Artista',
  },
};

type ArtistaEntryFormProps = {
  onArtistaCreated?: () => void;
};
function ArtistaEntryForm(props: ArtistaEntryFormProps) {
  const nombre = useSignal('');
  const nacionalidad = useSignal('');
  const dialogOpened = useSignal(false);

  const nacionalidades = useSignal<{ value: string, label: string }[]>([]);

  useEffect(() => {
    ArtistaService.listCountry().then(data => {
      nacionalidades.value = (data ?? []).map((a: any) => ({
        value: a,
        label: a,
      }));
    });
  }, []);

  const createArtista = async () => {
    try {
      if (nombre.value.trim() && nacionalidad.value.trim()) {
        await ArtistaService.create(nombre.value, nacionalidad.value);
        if (props.onArtistaCreated) props.onArtistaCreated();
        nombre.value = '';
        nacionalidad.value = '';
        dialogOpened.value = false;
        Notification.show('Artista creado', { duration: 5000, position: 'bottom-end', theme: 'success' });
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
        headerTitle="Nuevo Artista"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }: { detail: { value: boolean } }) => {
          dialogOpened.value = detail.value;
        }}
        footer={
          <>
            <Button onClick={() => (dialogOpened.value = false)}>Cancelar</Button>
            <Button onClick={createArtista} theme="primary">
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
            label="Nacionalidad"
            items={nacionalidades.value}
            itemLabelPath="label"
            itemValuePath="value"
            value={nacionalidad.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (nacionalidad.value = evt.detail.value)}
          />
        </VerticalLayout>
      </Dialog>
      <Button onClick={() => (dialogOpened.value = true)}>Agregar</Button>
    </>
  );
}

export default function ArtistaView() {
  const dataProvider = useDataProvider<any>({
    list: async () => {
      const result = await ArtistaService.listArtista();
      return (result ?? []).filter((item): item is Record<string, unknown> => item !== undefined);
    },
  });

  function indexIndex({ model }: { model: GridItemModel<any> }) {
    return <span>{model.index + 1}</span>;
  }

  return (
    <main className="w-full h-full flex flex-col box-border gap-s p-m">
      <ViewToolbar title="Lista de Artistas">
        <Group>
          <ArtistaEntryForm onArtistaCreated={dataProvider.refresh} />
        </Group>
      </ViewToolbar>
      <Grid dataProvider={dataProvider.dataProvider}>
        <GridColumn renderer={indexIndex} header="Numero" />
        <GridColumn path="nombre" header="Nombre" />
        <GridColumn path="nacionalidad" header="Nacionalidad" />
      </Grid>
    </main>
  );
}