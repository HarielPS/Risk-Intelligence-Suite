import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RiskService } from './risk.service';
import { CreateRiskAnalysisDto } from './dto/create-risk-analysis.dto';


@Controller('risk')
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  // POST /risk/analyze
  @Post('analyze')
  analyze(@Body() dto: CreateRiskAnalysisDto) {
    return this.riskService.analyze(dto);
  }

  // GET /risk/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskService.findOne(id);
  }

  // GET /risk/client/:clientId
  @Get('client/:clientId')
  findByClient(@Param('clientId') clientId: string) {
    return this.riskService.findByClient(clientId);
  }

  @Get('client/:clientId/latest')
  findLatestByClient(@Param('clientId') clientId: string) {
    return this.riskService.findLatestByClient(clientId);
  }
}
