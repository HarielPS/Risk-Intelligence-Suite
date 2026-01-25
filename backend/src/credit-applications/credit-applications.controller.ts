import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreditApplicationsService } from "./credit-applications.service";
import { CreateCreditApplicationDto } from "./dto/create-credit-application.dto";
import { CreditLetter } from "./types/explainability.types";

@Controller("credit-applications")
export class CreditApplicationsController {
  constructor(
    private readonly creditApplicationsService: CreditApplicationsService,
  ) {}

  // Crear una nueva solicitud de crédito para un usuario
  @Post(":userId")
  createForUser(
    @Param("userId") userId: string,
    @Body() dto: CreateCreditApplicationDto,
  ) {
    return this.creditApplicationsService.createForUser(userId, dto);
  }

  // Historial de solicitudes de un usuario
  @Get(":userId")
  listForUser(@Param("userId") userId: string) {
    return this.creditApplicationsService.findByUser(userId);
  }

  // Última solicitud de un usuario
  @Get(":userId/latest")
  latestForUser(@Param("userId") userId: string) {
    return this.creditApplicationsService.findLatestByUser(userId);
  }

  // Generar carta de explicabilidad para una solicitud
  @Post(":userId/:applicationId/letter")
  async generateLetter(
    @Param("userId") userId: string,
    @Param("applicationId") applicationId: string,
  ): Promise<CreditLetter> {
    return this.creditApplicationsService.generateLetterForApplication(
      applicationId,
      userId,
    );
  }
}
