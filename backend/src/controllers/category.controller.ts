import {
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
  UseInterceptors,
} from '@nestjs/common';
import { AuthTokenGaurd } from 'src/config/auth-token.gaurd';
import { ErrorsInterceptor } from 'src/interceptors/error.interceptor';
import { CategoryDocument } from 'src/schemas/category.schema';
import { CategoryService } from 'src/services/category.service';

@UseInterceptors(ErrorsInterceptor)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AuthTokenGaurd)
  @HttpCode(201)
  @Post('')
  async addCategory(@Body() body: Partial<CategoryDocument>, @Req() req) {
    return await this.categoryService.createCategory(body, req.user._id);
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
    await this.categoryService.deleteCategory(categId, req.user);
  }

  @UseGuards(AuthTokenGaurd)
  @Put(':id')
  async editCategory(@Req() req, @Param('id') id, @Body('name') newName) {
    return await this.categoryService.editCategory(id, req.user._id, {
      name: newName,
    });
  }
}
