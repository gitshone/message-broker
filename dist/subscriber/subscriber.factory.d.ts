/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
import { MicroserviceOptions } from '@nestjs/microservices';
import { SubscriberOptions } from '../message-broker.types';
export declare class SubscriberFactory {
    static subscribe(data: SubscriberOptions): MicroserviceOptions;
}
