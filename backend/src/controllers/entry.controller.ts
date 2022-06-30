import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthTokenGaurd } from 'src/config/auth-token.gaurd';
import { ErrorsInterceptor } from 'src/interceptors/error.interceptor';
import { EntryDocument } from 'src/schemas/entry.schema';
import { EntryService } from 'src/services/entry.service';

@UseInterceptors(ErrorsInterceptor)
@Controller('entries')
export class EntryController {
  constructor(private entryService: EntryService) {}

  @UseGuards(AuthTokenGaurd)
  @Get('')
  async getEntries(@Req() req, @Query('categoryId') categId) {
    if (categId) return await this.entryService.getEntries(req.user, categId);
    else return await this.entryService.getEntries(req.user);
  }

  @UseGuards(AuthTokenGaurd)
  @Get(':id')
  async getEntry(@Req() req, @Param('id') id) {
    return await this.entryService.getEntry(req.user._id, id);
  }

  @UseGuards(AuthTokenGaurd)
  @Put(':id')
  async editEntry(
    @Req() req,
    @Param('id') id,
    @Body() entryObj: Partial<EntryDocument>,
  ) {
    return await this.entryService.editEntry(req.user._id, id, entryObj);
  }

  @UseGuards(AuthTokenGaurd)
  @Post('')
  async addEntry(@Body() body, @Req() req, @Query('categoryId') categoryId) {
    return await this.entryService.createEntry(body, req.user, categoryId);
  }

  @UseGuards(AuthTokenGaurd)
  @HttpCode(204)
  @Delete(':id')
  async deleteEntry(@Req() req, @Param('id') id) {
    return await this.entryService.deleteEntry(req.user._id, id);
  }
}
