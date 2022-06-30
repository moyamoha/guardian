import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthTokenGaurd } from 'src/config/auth-token.gaurd';
import { CategoryDocument } from 'src/schemas/category.schema';
import { CategoryService } from 'src/services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AuthTokenGaurd)
  @HttpCode(201)
  @Post('')
  async addCategory(@Body() body: Partial<CategoryDocument>, @Req() req) {
    try {
      return await this.categoryService.creatCategory(body, req.user);
    } catch (e) {
      throw new BadRequestException(e, e.message);
    }
  }

  @UseGuards(AuthTokenGaurd)
  @Get('')
  async getCategories(@Req() req) {
    try {
      return await this.categoryService.getAll(req.user._id);
    } catch (e) {
      throw new NotFoundException('Nothing was found');
    }
  }

  @UseGuards(AuthTokenGaurd)
  @Get(':id')
  async getCategory(@Req() req, @Param('id') id) {
    return await this.categoryService.getCategory(id, req.user._id);
  }

  @UseGuards(AuthTokenGaurd)
  @HttpCode(204)
  @Delete(':id')
  async deleteCategory(@Req() req, @Param('id') categId) {
    try {
      await this.categoryService.deleteCategory(categId, req.user);
    } catch (e) {}
  }

  @UseGuards(AuthTokenGaurd)
  @Put(':id')
  async editCategory(@Req() req, @Param('id') id, @Body('name') newName) {
    return await this.categoryService.editCategory(id, req.user._id, {
      name: newName,
    });
  }
}
