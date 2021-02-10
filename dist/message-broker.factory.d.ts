/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
import { DynamicModule } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { PublisherOptions, SubscriberOptions } from './message-broker.types';
/**
 * Message Broker Factory
 */
export declare class MessageBrokerFactory {
    /**
     * Get subscriber's microservices config object
     * @param data - It includes subscriber type and configuration
     * @returns Subscriber's config object
     *
     * Usage:
     * ````typescript
     * const app = await NestFactory.createMicroservice<MicroserviceOptions>(
     *   AppModule,
     *   MessageBrokerFactory.subscriber({
     *     'subscriber': MessageBroker.SQS, //‘SQS/Firebase/RabbitMQ/Redis’
     *     'config': {config},
     *     'options': {options},
     *   }),
     * );
     * ````
     */
    static subscriber(data: SubscriberOptions): MicroserviceOptions;
    /**
     * Register injectable publisher services
     * @param data - It includes publisher's name, type, and configuration
     * @returns Publisher's module
     *
     * Usage:
     * ```typescript
     * imports: [
     *   MessageBrokerFactory.publisher([{
     *     'name': 'DEMO_PUBLISH',
     *     'publisher': MessageBroker.SNS, //‘SQS/SNS/Firebase/RabbitMQ/Redis’
     *     'config': {config},
     *     'options': {options},
     *   }]),
     *  ...
     * ],
     * ````
     */
    static publisher(data: Array<PublisherOptions>): DynamicModule;
}
