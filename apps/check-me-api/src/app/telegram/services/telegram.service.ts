import { ITelegramUpdate } from '@check-me/models';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { TELEGRAM_COMMAND } from '../decorators/telegram-command.decorator';
import { TELEGRAM_COMMAND_GROUP } from '../decorators/telegram-group-command.decorator';

@Injectable()
export class TelegramService implements OnModuleInit {
  private commandMap = new Map<string, (data: ITelegramUpdate) => Promise<void>>();

  constructor(private readonly discoveryService: DiscoveryService, private readonly reflector: Reflector) {}

  onModuleInit() {
    this.#confirmCommands();
    console.log({ commandMap: this.commandMap });
  }

  async handleWebhook(data: ITelegramUpdate): Promise<void> {
    console.log(data);

    return;
  }

  #confirmCommands() {
    const providers = this.discoveryService.getProviders();
    for (const wrapper of providers) {
      const { instance } = wrapper;
      if (!instance) continue;

      const group = this.reflector.get<string>(TELEGRAM_COMMAND_GROUP, instance.constructor);

      const prototype = Object.getPrototypeOf(instance);

      if (!prototype) continue;

      const methodNames = Object.getOwnPropertyNames(prototype).filter(
        (method) => typeof instance[method] === 'function' && method !== 'constructor',
      );

      for (const methodName of methodNames) {
        const command = this.reflector.get<string>(TELEGRAM_COMMAND, prototype[methodName]);
        if (command) {
          const fullCommand = group ? `${group}${command}` : command;
          this.commandMap.set(fullCommand, instance[methodName].bind(instance));
        }
      }
    }
  }
}
