import { useEffect } from 'react';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, Grid, GridColumn, TextField, VerticalLayout, Dialog, DatePicker } from '@vaadin/react-components'; 
import { Notification } from '@vaadin/react-components/Notification';
import { BandaService } from 'Frontend/generated/endpoints';
import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';
import { useDataProvider } from '@vaadin/hilla-react-crud';
import type { GridItemModel } from '@vaadin/react-components';

export const config: ViewConfig = {
  title: 'Banda',
  menu: {
    icon: 'vaadin:group',
    order: 1,
    title: 'Banda',
  },
};

type BandaEntryFormProps = {
  onBandaCreated?: () => void;
};
function BandaEntryForm(props: BandaEntryFormProps) {
  const nombre = useSignal('');
  const fecha = useSignal('');
  const dialogOpened = useSignal(false);

  const createBanda = async () => {
    try {
      if (nombre.value.trim() && fecha.value.trim()) {
        await BandaService.create(nombre.value, fecha.value);
        if (props.onBandaCreated) props.onBandaCreated();
        nombre.value = '';
        fecha.value = '';
        dialogOpened.value = false;
        Notification.show('Banda creado', { duration: 5000, position: 'bottom-end', theme: 'success' });
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
        headerTitle="Nuevo Banda"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }: { detail: { value: boolean } }) => {
          dialogOpened.value = detail.value;
        }}
        footer={
          <>
            <Button onClick={() => (dialogOpened.value = false)}>Cancelar</Button>
            <Button onClick={createBanda} theme="primary">
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
          <DatePicker
            label="Fecha"
            value={fecha.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (fecha.value = evt.detail.value)}
          />
        </VerticalLayout>
      </Dialog>
      <Button onClick={() => (dialogOpened.value = true)}>Agregar</Button>
    </>
  );
}

export default function BandaView() {
  const dataProvider = useDataProvider<any>({
    list: async () => {
      const result = await BandaService.listBanda();
      return (result ?? []).filter((item): item is Record<string, unknown> => item !== undefined);
    },
  });

  function indexIndex({ model }: { model: GridItemModel<any> }) {
    return <span>{model.index + 1}</span>;
  }

  return (
    <main className="w-full h-full flex flex-col box-border gap-s p-m">
      <ViewToolbar title="Lista de Bandas">
        <Group>
          <BandaEntryForm onBandaCreated={dataProvider.refresh} />
        </Group>
      </ViewToolbar>
      <Grid dataProvider={dataProvider.dataProvider}>
        <GridColumn renderer={indexIndex} header="Numero" />
        <GridColumn path="nombre" header="Nombre" />
        <GridColumn path="fecha" header="Fecha" />
      </Grid>
    </main>
  );
}