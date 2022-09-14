export type ModalViewProps = {
  id: number;
};

export type ModalInputProps = {
  modalHeader: string;
  id: number;
  category: string;
  onUpdate: () => Promise<void>;
};
export type ModalProductsInputProps = {
  modalHeader: string;
  id: number;
  product: string;
  onUpdate: () => Promise<void>;
};

export type ModalDeleteProps = {
  nome: string;
  id: number;
  onUpdate: () => Promise<void>;
};

export type modalProductsCategoryProps = {
  id: number;
  name: string;
};
