import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';

import { PaginationMessageDto } from './dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}




  @Get('')
  findOne(@Query() props: PaginationMessageDto) {
    return this.cartService.getMessageByPagination(props);
  }


}
