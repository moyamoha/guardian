import { Controller } from '@nestjs/common';
import { CategoryService } from 'src/services/category.service';

@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
}
