import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import axios from 'axios';
import { GetMessageDto } from './dto';
import { ApiResponse } from 'src/common/models/api-response';
import { ApiResponseStatus } from 'src/common/constants';

@Injectable()
export class DashboardService {

  private messageApi = process.env.WSP_SERVICES_BACKEND;

  create(createDashboardDto: CreateDashboardDto) {

    return 'This action adds a new dashboard';
  }

  async getStats() {
    // const allMessages = await this.getMessage();
    // const countMessagesByStep = this.countMessagesByStep(allMessages.data);
    // return new ApiResponse(countMessagesByStep, 'List by Step', ApiResponseStatus.SUCCESS);
    try {
      const allMessages = await this.getMessage();
      const countMessagesByStep = this.countMessagesByStep(allMessages.data);
      return new ApiResponse(countMessagesByStep, 'List by Step', ApiResponseStatus.SUCCESS);
    }
    catch (error) {
      return new ApiResponse(null, error.message, ApiResponseStatus.ERROR);
    }
  }


  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }

  async getMessage() {
    const allMessages = await axios.get(`${this.messageApi}/message`);
    return allMessages;
  }

  countMessagesByStep(messages: GetMessageDto[]) {
    let totalMessages = 0;
    const stepCounts = messages.reduce((acc, message) => {
        const step = message.step;
        if (acc[step]) {
            acc[step]++;
        } else {
            acc[step] = 1;
        }
        totalMessages++;
        return acc;
    }, {});

    return { stepCounts, totalMessages };
}
}
