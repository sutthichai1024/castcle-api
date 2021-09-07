/*
 * Copyright (c) 2021, Castcle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 * version 3 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 3 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Castcle, 22 Phet Kasem 47/2 Alley, Bang Khae, Bangkok,
 * Thailand 10160, or visit www.castcle.com if you need additional information
 * or have any questions.
 */

import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query } from '@nestjs/common';
import { map } from 'rxjs';
import { AppService } from './app.service';
import { MessageProducerService } from './message-producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly messageProducerService: MessageProducerService,
    private readonly httpService: HttpService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('invoke')
  getInvokeMsg(@Query('msg') msg: string) {
    this.messageProducerService.sendMessage(msg);
    return msg;
  }

  @Get('bg')
  getBackgroundServiceGreetingMessage() {
    return this.httpService
      .get<{ message: string }>(process.env.BACKGROUNDS_SERVICE_HOST)
      .pipe(map(({ data }) => data));
  }
}
