import { Body, Controller, Delete, Get, Injectable, NotFoundException, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
@UseGuards(BeltGuard)
export class NinjasController {
    constructor(private readonly ninjaService: NinjasService) {
    }

    @Get()
    getNinjas(@Query('weapon') weapon: 'starts' | 'nunchucks') {
        return this.ninjaService.getNinjas(weapon);
    }

    @Get(':id')
    getOneNinja(@Param('id') id: string) {
        try {
            return this.ninjaService.getNinja(+id);
        } catch (error) {
            throw new NotFoundException("Not ");
        }
        
    }

    @Post()
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        return this.ninjaService.createNinja(createNinjaDto);
    }

    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return this.ninjaService.updateNinja(+id, updateNinjaDto);
    }

    @Delete(':id')
    removeNinja(@Param('id') id: string) {
        return this.ninjaService.removeNinja(+id);
    }

}
