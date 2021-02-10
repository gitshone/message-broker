/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
import { DynamicModule } from '@nestjs/common';
import { PublisherOptions } from '../message-broker.types';
export declare class PublisherModule {
    static register(options: Array<PublisherOptions>): DynamicModule;
}
