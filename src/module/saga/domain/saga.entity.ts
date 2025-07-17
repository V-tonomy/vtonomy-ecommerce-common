// saga.entity.ts

export class Saga {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly step: string,
    public readonly status: string,
    public readonly meta: Record<string, any> | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
