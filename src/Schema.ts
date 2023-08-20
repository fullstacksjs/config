import { RequiredGuard, type Guard } from './Guard';

interface SchemaOptions<T> {
  default?: T;
  coerce?: boolean;
}

export class Schema<T = any> {
  public checks: Guard<T>[] = [];
  private input: T | undefined;
  public key!: string;
  public type!: string;

  constructor(public options: SchemaOptions<T>) {}

  public setValue(input: T) {
    this.input = input ?? this.options.default;
  }

  public require() {
    this.checks.push(new RequiredGuard<T>());
    return this;
  }

  public validate(input: T) {
    return this.checks.every(check => check.validate(input, this.key));
  }

  public parse() {
    if (this.options.coerce) {
      if (this.type === 'string') {
        return String(this.input);
      } else if (this.type === 'number') {
        return Number(this.input);
      } else if (this.type === 'boolean') {
        return Boolean(this.input);
      }
    }

    return this.input;
  }
}

export class StringSchema extends Schema<string> {
  public override type = 'string';

  constructor(options: SchemaOptions<string> = {}) {
    super(options);
  }
}
