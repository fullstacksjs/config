import { RequiredGuard, type Guard, TypeGuard } from './Guard';

interface SchemaOptions<T> {
  default?: T;
  coerce?: boolean;
}

export class Schema<T = any> {
  public guards: Guard[];
  private input: T | undefined;
  public key!: string;

  constructor(public type: string, public options: SchemaOptions<T>) {
    this.guards = [new TypeGuard(this.type)];
  }

  public setValue(input: T) {
    this.input = input ?? this.options.default;
  }

  public require() {
    this.guards.unshift(new RequiredGuard());
    return this;
  }

  public validate() {
    return this.guards.every(check => check.validate(this.input, this.key));
  }

  public parse() {
    return this.input;
  }
}

export class StringSchema extends Schema<string> {
  constructor(options: SchemaOptions<string> = {}) {
    super('string', options);
  }
}
