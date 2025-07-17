// saga.entity.ts

export class Saga {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly step: string,
    public readonly status: string,
    public readonly meta: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
