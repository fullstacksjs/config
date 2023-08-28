import { RequiredGuard, type Guard, TypeGuard } from './Guard';

interface SchemaOptions<TInput, TValue> {
  default?: TInput;
  typeConstructor: (input: TInput) => TValue;
  type: string;
  coerce?: boolean;
}

export class Schema<TInput = any, TValue = any> {
  protected input: TInput | undefined;
  protected value: TValue | undefined;
  protected guards: Guard[];
  public key!: string;

  constructor(public options: SchemaOptions<TInput, TValue>) {
    this.guards = [new TypeGuard(this.options.type)];
  }

  public setValue(input: TInput) {
    this.input = input ?? this.options.default;

    if (this.options.coerce && typeof input !== 'string')
      this.value = this.options.typeConstructor(this.input!);
  }

  public require() {
    this.guards.unshift(new RequiredGuard());
    return this;
  }

  public validate() {
    return this.guards.every(check => check.validate(this.value, this.key));
  }

  public parse() {
    return this.value;
  }
}

export interface SchemaConstructor<TInput> {
  default?: TInput;
  coerce?: boolean;
}

export class StringSchema<TInput = any> extends Schema<TInput, string> {
  constructor(options: SchemaConstructor<TInput> = {}) {
    super({ ...options, typeConstructor: String, type: 'string' });
  }

  public override parse() {
    if (this.options.coerce) {
      return String(super.parse());
    }

    return super.parse();
  }
}
