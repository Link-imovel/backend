interface CreateImage {
  image: string;
}

interface UpdateImage extends CreateImage {
  id: string;
}

export type { CreateImage, UpdateImage };
