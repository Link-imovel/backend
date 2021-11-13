interface CreateImage {
  image: Buffer;
}

interface UpdateImage extends CreateImage {
  id: string;
}

export type { CreateImage, UpdateImage };
