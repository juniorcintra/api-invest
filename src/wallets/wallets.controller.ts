import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiQuery } from '@nestjs/swagger';
import { RequestParams } from 'src/types';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  @ApiQuery({
    name: 'userId',
    required: true,
    type: String,
    description: 'Id do Profissional, dono dos agendamentos.',
  })
  findAll(@Query() req: RequestParams) {
    const { userId } = req;
    return this.walletsService.findAllByUser(Number(userId));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(+id);
  }
}
