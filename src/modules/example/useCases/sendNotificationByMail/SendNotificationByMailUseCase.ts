import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { ExampleErro } from "@modules/example/errors/ExampleErro";
import { IExamplesRepository } from "@modules/example/repositories/IExamplesRepository";
import { IMailProvider } from "@shared/providers/MailProvider/IMailProvider";

interface IExampleMailVariables {
  user_name: string;
}

@injectable()
export class SendNotificationByMailUseCase {
  constructor(
    @inject("ExamplesRepository")
    private readonly examplesRepository: IExamplesRepository,
    @inject("MailProvider")
    private readonly mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const example = await this.examplesRepository.findByEmail(email);

    if (example == null) {
      throw new ExampleErro.ExampleNotExists();
    }

    const view_path = resolve(
      __dirname,
      "../../views/email/example_notification.html"
    );

    const variables: IExampleMailVariables = {
      user_name: example.name,
    };

    try {
      await this.mailProvider.sendMail(
        example.email,
        "Notificação de exemplo",
        view_path,
        variables
      );
    } catch {
      // verificar como tratar o erro
    }
  }
}
