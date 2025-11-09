
export class Task {
  id: number;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    description:string,
    status: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}