import type { Guard } from '../Guard';
import { GuardError } from '../Guard';

export class RequiredGuard implements Guard<string> {
  validate(input: unknown, field: string) {
    if (input == null)
      throw new GuardError(
        `Invalid configuration: The "${field}" is required but the given value is "${input}"`,
      );
  }
}

interface SchemaOptions<TInput, TValue> {
  default?: TValue;
  typeConstructor: (input: TInput) => TValue;
  coerce?: boolean;
  initialGuards: Guard<any>[];
}

export class Schema<
  TInput = any,
  TValue = any,
  TRequired extends boolean = false,
> {
  protected input: TInput | undefined;
  protected guards: Guard<any>[] = [];
  public value: TValue | undefined;
  public key!: string;
  // @ts-expect-error Metadata for type-safety
  #isRequired: TRequired; // eslint-disable-line no-unused-private-class-members

  constructor(public options: SchemaOptions<TInput, TValue>) {
    this.options.coerce ??= true;
    this.guards = options.initialGuards;
  }

  public setValue(input?: TInput) {
    this.input = input;

    const shouldCoerce =
      typeof input !== typeof this.options.typeConstructor(input!);

    if (this.options.coerce && shouldCoerce)
      this.value =
        input != null
          ? this.options.typeConstructor(input)
          : this.options.default;
    // @ts-expect-error There's a runtime check to ensure
    else this.value = input ?? this.options.default;

    return this;
  }

  public required() {
    this.guards.unshift(new RequiredGuard());
    return this as Schema<TInput, TValue, true>;
  }

  public validate() {
    return this.guards.forEach(check => {
      check.validate(this.value, this.key);
    });
  }

  public parse() {
    return this.value;
  }
}
