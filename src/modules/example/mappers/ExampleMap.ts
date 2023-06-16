import { instanceToInstance } from "class-transformer";

import { IExempleDTO } from "../dtos/IExampleDTO";
import { Example } from "../entities/Example";

class ExampleMap {
  static toExampleDTO({ id, name, email, created_at }: Example): IExempleDTO {
    const example = instanceToInstance({
      id,
      name,
      email,
      created_at,
    });

    return example;
  }
}

export { ExampleMap };
