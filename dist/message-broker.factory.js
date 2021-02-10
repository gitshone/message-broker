"use strict";
/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBrokerFactory = void 0;
const publisher_module_1 = require("./publisher/publisher.module");
const subscriber_1 = require("./subscriber");
/**
 * Message Broker Factory
 */
class MessageBrokerFactory {
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
    static subscriber(data) {
        return subscriber_1.SubscriberFactory.subscribe(data);
    }
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
    static publisher(data) {
        return publisher_module_1.PublisherModule.register(data);
    }
}
exports.MessageBrokerFactory = MessageBrokerFactory;
