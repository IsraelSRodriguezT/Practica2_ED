import { useEffect } from 'react';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, Grid, GridColumn, TextField, VerticalLayout, Dialog, DatePicker, ComboBox } from '@vaadin/react-components'; 
import { Notification } from '@vaadin/react-components/Notification';
import { Artista_BandaService } from 'Frontend/generated/endpoints';
import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';
import { useDataProvider } from '@vaadin/hilla-react-crud';
import type { GridItemModel } from '@vaadin/react-components';

export const config: ViewConfig = {
  title: 'Artista_Banda',
  menu: {
    icon: 'vaadin:users',
    order: 1,
    title: 'Artista_Banda',
  },
};

type Artista_BandaEntryFormProps = {
  onArtista_BandaCreated?: () => void;
};
function Artista_BandaEntryForm(props: Artista_BandaEntryFormProps) {
  const rol = useSignal('');
  const artista = useSignal('');
  const banda = useSignal(''); 
  const dialogOpened = useSignal(false);

  const artistas = useSignal<{ value: string, label: string }[]>([]);
  const bandas = useSignal<{ value: string, label: string }[]>([]);
  const roles = useSignal<string[]>([]);

  useEffect(() => {
    Artista_BandaService.listaArtista().then(data => {
      artistas.value = (data ?? []).map((a: any) => ({
        value: a.value,
        label: a.label
      }));
    });
    Artista_BandaService.listaBanda().then(data => {
      bandas.value = (data ?? []).map((v: any) => ({
        value: v.value,
        label: v.label
      }));
    });
    Artista_BandaService.listRol().then(data => {
      roles.value = (data ?? []).filter((e): e is string => typeof e === 'string');
    });
  }, []);

  const createArtista_Banda = async () => {
    try {
      if (rol.value.trim() && artista.value.trim() && banda.value.trim()) {
        const idArtista = parseInt(artista.value)+1;
        const idBanda = parseInt(banda.value)+1;
        await Artista_BandaService.create(rol.value, idArtista, idBanda);
        if (props.onArtista_BandaCreated) props.onArtista_BandaCreated();
        rol.value = '';
        artista.value = '';
        banda.value = '';
        dialogOpened.value = false;
        Notification.show('Artista_Banda creado', { duration: 5000, position: 'bottom-end', theme: 'success' });
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
        headerTitle="Nueva Artista_Banda"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }: { detail: { value: boolean } }) => {
          dialogOpened.value = detail.value;
        }}
        footer={
          <>
            <Button onClick={() => (dialogOpened.value = false)}>Cancelar</Button>
            <Button onClick={createArtista_Banda} theme="primary">
              Registrar
            </Button>
          </>
        }>
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <ComboBox
            label="Rol"
            items={roles.value}
            value={rol.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (rol.value = evt.detail.value)}
          />
          <ComboBox
            label="Artista"
            items={artistas.value}
            itemLabelPath="label"
            itemValuePath="value"
            value={artista.value}
            onValueChanged={(evt: CustomEvent<{ value: string }>) => (artista.value = evt.detail.value)}
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

export default function Artista_BandaView() {
  const dataProvider = useDataProvider<any>({
    list: async () => {
      const result = await Artista_BandaService.listArtista_Banda();
      return (result ?? []).filter((item): item is Record<string, unknown> => item !== undefined);
    },
  });

  function indexIndex({ model }: { model: GridItemModel<any> }) {
    return <span>{model.index + 1}</span>;
  }

  return (
    <main className="w-full h-full flex flex-col box-border gap-s p-m">
      <ViewToolbar title="Lista de Artista_Bandas">
        <Group>
          <Artista_BandaEntryForm onArtista_BandaCreated={dataProvider.refresh} />
        </Group>
      </ViewToolbar>
      <Grid dataProvider={dataProvider.dataProvider}>
        <GridColumn renderer={indexIndex} header="Numero" />
        <GridColumn path="rol" header="Rol" />
        <GridColumn path="idArtista" header="Artista" />
        <GridColumn path="idBanda" header="Banda" />
      </Grid>
    </main>
  );
}