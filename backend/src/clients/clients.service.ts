// src/clients/clients.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';

import { Client, ClientDocument } from './schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async create(dto: CreateClientDto): Promise<Client> {
    try {
      const created = new this.clientModel(dto);
      return await created.save();
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ConflictException(
          'Ya existe un cliente con este nationalId',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    try {
      const updated = await this.clientModel
        .findByIdAndUpdate(id, dto, { new: true })
        .exec();

      if (!updated) {
        throw new NotFoundException('Client not found');
      }
      return updated;
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ConflictException(
          'Ya existe un cliente con este nationalId',
        );
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const res = await this.clientModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException('Client not found');
    }
  }
}
