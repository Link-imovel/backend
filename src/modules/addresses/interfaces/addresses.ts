interface CreateAddress {
  street: string;
  street2: string;
  city: string;
  state: string;
  ibge: string;
  neighborhood: string;
  number: number;
  zip: string;
}

type UpdateAddress = Partial<CreateAddress>;

export type { CreateAddress, UpdateAddress };
