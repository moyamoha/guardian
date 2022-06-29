import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthTokenGaurd } from 'src/config/auth-token.gaurd';
import { EntryService } from 'src/services/entry.service';

@Controller('entries')
export class EntryController {
  constructor(private entryService: EntryService) {}

  @UseGuards(AuthTokenGaurd)
  @Get('')
  async getEntries(@Req() req, @Query('categoryId') categId) {
    try {
      if (categId) return await this.entryService.getEntries(req.user, categId);
      else return await this.entryService.getEntries(req.user);
    } catch (e) {
      throw new NotFoundException('Nothing found');
    }
  }

  @UseGuards(AuthTokenGaurd)
  @Get(':id')
  async getEntry(@Req() req, @Param('id') id) {
    try {
      const entry = await this.entryService.getEntry(req.user._id, id);
      return entry;
    } catch (e) {
      throw new NotFoundException(`Entry ${id} was not found`);
    }
  }

  @UseGuards(AuthTokenGaurd)
  @Post('')
  async addEntry(@Body() body, @Req() req, @Query('categoryId') categoryId) {
    try {
      const createdEntry = await this.entryService.createEntry(
        body,
        req.user,
        categoryId,
      );
      return createdEntry;
    } catch (e) {
      throw new BadRequestException(e, e.message);
    }
  }
}
