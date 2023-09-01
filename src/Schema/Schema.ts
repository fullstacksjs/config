import { RequiredGuard, type Guard, TypeGuard } from '../Guard';

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

  public setValue(input?: TInput) {
    this.input = input;
    const value = this.input ?? this.options.default;

    if (this.options.coerce && typeof input !== this.options.type)
      this.value = this.options.typeConstructor(value!);
    // @ts-expect-error There's a runtime check to ensure
    else this.value = value;

    return this;
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
