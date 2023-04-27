import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './Book.entity';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Book] })
  async findAll(
    @Query('rating') rating?: number,
    @Query('date') date?: Date,
  ): Promise<Book[]> {
    return this.booksService.findAll(rating, date);
  }

  @Post()
  @ApiResponse({ status: 201, type: Book })
  async create(@Body() book: Book): Promise<Book> {
    return this.booksService.create(book);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: Book })
  async update(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  async delete(@Param('id') id: string): Promise<void> {
    return this.booksService.delete(id);
  }
}
