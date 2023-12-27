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

export class TypeGuard implements Guard<any> {
  constructor(private type: string) {}

  validate(input: any, field: string) {
    if (typeof input !== this.type && input !== undefined)
      throw new TypeError(
        `Invalid configuration: The "${field}" expected to be "${
          this.type
        }" but a "${typeof input}" was provided`,
      );
  }
}

interface SchemaOptions<TInput, TValue> {
  default?: TValue;
  typeConstructor: (input: TInput) => TValue;
  type: string;
  coerce?: boolean;
}

export class Schema<TInput = any, TValue = any> {
  protected input: TInput | undefined;
  protected guards: Guard<any>[];
  public value: TValue | undefined;
  public key!: string;
  public isRequired!: boolean;

  constructor(public options: SchemaOptions<TInput, TValue>) {
    this.options.coerce ??= true;
    this.guards = [new TypeGuard(this.options.type)];
  }

  public setValue(input?: TInput) {
    this.input = input;

    if (this.options.coerce && typeof input !== this.options.type)
      this.value =
        input != null
          ? this.options.typeConstructor(input)
          : this.options.default;
    // @ts-expect-error There's a runtime check to ensure
    else this.value = input ?? this.options.default;

    return this;
  }

  public require() {
    this.guards.unshift(new RequiredGuard());
    return this as this & { isRequired: true };
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
