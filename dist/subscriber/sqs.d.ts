/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
import { MessageBrokerOptions, SQSConfig, Subscriber } from '../message-broker.types';
/**
 * Subscriber of AWS SQS
 * It supports Amazon SQS short and long polling
 *
 * Usage:
 * ````typescript
 * const app = await NestFactory.createMicroservice<MicroserviceOptions>(
 *   AppModule,
 *   MessageBrokerFactory.subscriber({
 *    'subscriber': MessageBroker.SQS //‘SQS/Firebase/RabbitMQ/Redis’,
 *    'config': {config},
 *    'options': {}
 *   }),
 * )
 * ````
 */
export declare class SQS extends Subscriber {
    private readonly config;
    private readonly options;
    private readonly sqs;
    private readonly QueueUrl;
    private readonly WaitTimeSeconds;
    private terminate;
    /**
     * Initialize AWS.SQS instance
     * @param config - Required AWS SQS configuration
     * @param options - Additional parameters to SQS service
     */
    constructor(config: SQSConfig, options: MessageBrokerOptions);
    /**
     * Start polling messages from AWS SQS queue
     */
    listen(): Promise<void>;
    /**
     * On close signal, turn off listener
     */
    close(): void;
    /**
     * Request AWS SQS queue for a message
     */
    private getMessage;
    /**
     * Call SQS queue for message
     */
    private receiveMessage;
    /**
     * Delete message once proccessed successfuly
     * @param ReceiptHandle - Message ReceiptHandle
     */
    private deleteMessage;
    /**
     * Requeue message if processing failed
     * @param ReceiptHandle - Message ReceiptHandle
     */
    private requeueMessage;
    /**
     * Normalize message body
     * @param result - Received response from AWS SQS queue
     */
    private normalizeMessage;
    /**
     * Acknowledgement function for context to notify AWS SQS queue once processing done
     */
    private get ack();
}
