/* eslint-disable prettier/prettier */
export class CreatePostTypes {
  title: string;
  description: string;
}

export class UpdatePostTypes {
  id: number;
  description: string;
  title: string;
}
export class ListAllEntities {
  id: number;
  description: string;
  title: string;
}

export class Post {
  id: number;
  title: string;
  description: string;
}
