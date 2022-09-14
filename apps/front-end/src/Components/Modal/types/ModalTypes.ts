export type ModalViewProps = {
  modalHeader: string;
  modalBody: string;
};

export type ModalInputProps = {
  modalHeader: string;
  id: number;
  category: string;
  onUpdate: () => Promise<void>;
};

export type ModalDeleteProps = {
  nome: string;
  id: number;
};
